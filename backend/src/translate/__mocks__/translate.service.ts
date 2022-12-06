import { Current } from '../current';

export const TranslateService = jest.fn().mockReturnValue({
  current: Object.keys(Current)
    .filter((key) => typeof Current[key] !== 'string')
    .map((key) => ({ [key]: key } as any))
    .reduce((acc, cur) => ({ ...acc, ...cur }), {}),

  getTranslate: jest.fn().mockReturnValue({}),
});
