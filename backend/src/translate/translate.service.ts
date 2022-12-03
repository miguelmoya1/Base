import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { mkdir, readdir, readFile, stat, writeFile } from 'fs/promises';
import { join } from 'path';
import { Current, LanguagesAvailable } from './current';

type Languages = {
  [Key in keyof typeof LanguagesAvailable]?: typeof Current;
};

type CurrentType = { [K in keyof typeof Current]?: string };

@Injectable()
export class TranslateService implements OnModuleInit {
  public current = {} as CurrentType;
  private logger = new Logger(TranslateService.name);
  private languages = {} as Languages;
  private languagesDir = join(__dirname, '../../languages/');

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    this.logger.debug('Init');

    await this.createFiles();

    // SET CURRENT WITH THE SAME KEY AS VALUES TO USE IN SERVICES
    this.current = Object.keys(Current)
      .filter((key) => typeof Current[key] !== 'string')
      .map((key) => ({ [key]: key } as any))
      .reduce((acc, cur) => ({ ...acc, ...cur }), {});
  }

  getTranslate(req: Request, language?: string) {
    if (language) {
      return this.languages[language] || this.languages.en;
    }
    let lang = [...new Set(req.headers['accept-language']?.split(','))]?.[0]?.substring(0, 2);

    if (!this.languages[lang]) {
      lang = 'en';
    }

    return this.languages[lang];
  }

  private async createFiles() {
    if (!(await this.exists(this.languagesDir))) {
      await mkdir(this.languagesDir);
    }

    const dir = (await readdir(this.languagesDir)).filter((file) => file.includes('.json'));
    const languages = Object.keys(LanguagesAvailable).filter((key) => typeof LanguagesAvailable[key] !== 'string');

    for (const language of languages) {
      this.logger.verbose(`Prepare ${language}.json`);
      this.prepareTranslateFileJSON(language, dir);
    }

    if (this.configService.get('NODE_ENV') === 'development') {
      this.logger.verbose('createFile: generateGQLTranslateFile');
      await this.setGQLTranslateFile();
    }
  }

  private getDefaultValues() {
    const values = Object.keys(Current).filter((key) => typeof Current[key] !== 'string');
    return values.reduce((acc, key) => {
      acc[key] = '';
      return acc;
    }, {}) as typeof Current;
  }

  private async prepareTranslateFileJSON(language: string, dir: string[]) {
    const defaultValues = this.getDefaultValues();
    const defaultKeys = Object.keys(defaultValues);
    const filePath = join(this.languagesDir, `${language}.json`);

    // Create file if not exists
    if (!dir.includes(`${language}.json`)) {
      await writeFile(filePath, JSON.stringify(defaultValues, null, 2));
    }

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    let file = require(filePath);
    const fileKeys = Object.keys(file);

    if (this.configService.get('NODE_ENV') === 'development') {
      let needToWrite = false;
      // Add missing keys
      for (const key of defaultKeys) {
        if (!file[key]) {
          file[key] = defaultValues[key];
          needToWrite = true;
        }
      }

      // Remove extra keys
      for (const key of fileKeys) {
        if (!defaultKeys.includes(key)) {
          delete file[key];
          needToWrite = true;
        }
      }

      if (JSON.stringify(Object.keys(file)) !== JSON.stringify(Object.keys(file).sort())) {
        const ordered = Object.keys(file)
          .sort()
          .reduce((obj, key) => {
            obj[key] = file[key];
            return obj;
          }, {});

        file = ordered;

        needToWrite = true;
      }

      if (needToWrite) {
        this.logger.debug(`${language}.json updated`);
        await writeFile(filePath, JSON.stringify(file, null, 2));
      }
    }

    this.languages[language] = file;
  }

  private async setGQLTranslateFile() {
    const dir = './src/translate/entities/translate.entity.ts';

    const defaultValues = this.getDefaultValues();
    const defaultKeys = Object.keys(defaultValues).sort();
    const lines = defaultKeys.map((key) => '  @Field({ nullable: true })\n  ####: string;\n\n'.replace(/####/g, key));
    const file =
      `import { Field, ObjectType } from '@nestjs/graphql';\n\n@ObjectType({})\nexport class Translate {\n####}\n`.replace(
        /####/g,
        lines.join('').substring(0, lines.join('').length - 1), // Remove last endline
      );

    const gqlFile = await readFile(dir, 'utf8');

    if (gqlFile !== file) {
      await writeFile(dir, file);
    }
  }

  private async exists(path: string) {
    try {
      return await stat(path);
    } catch (err) {
      return false;
    }
  }
}
