type ID = { id?: string };

export class ModelMock<T extends ID> {
  constructor(private value: T[]) {}

  public async bulkCreate(values: T[]) {
    return values.map(this.format);
  }

  public async create(values?: T, options?: any) {
    return this.apply(values, options);
  }

  public async count() {
    return this.value.length;
  }

  public async destroy(options?: any) {
    if (options?.where?.id) {
      const { id } = options.where;
      const index = this.value.findIndex((v) => v.id === id);
      if (index > -1) {
        return 1;
      }
    }
    return 0;
  }

  public async findByPk(id: string, options?: any) {
    const result = this.value.find((item) => item.id === id);
    return this.apply(result, options);
  }

  public async findAll() {
    return this.value.map((v) => this.format(v));
  }

  public async findOne(options?: any) {
    return this.apply(this.value[0], options);
  }

  private format(value: T) {
    return { ...value, dataValues: value, toJSON: () => value };
  }

  private apply(value: T, options?: any) {
    let toSend = {} as T;

    if (!options) {
      toSend = { ...value };
    } else {
      const { attributes } = options;

      if (!attributes) {
        toSend = { ...value };
      } else {
        if (attributes.length) {
          attributes.forEach((attr) => {
            toSend[attr] = value[attr];
          });
        } else {
          const { exclude, include } = attributes;

          if (include) {
            include.forEach((i) => {
              toSend[i] = value[i];
            });
          }

          if (exclude?.length) {
            toSend = { ...value };
            exclude.forEach((e) => {
              delete toSend[e];
            });
          }
        }
      }
    }

    return this.format(toSend);
  }

  public toJSON() {
    return this.value;
  }
}
