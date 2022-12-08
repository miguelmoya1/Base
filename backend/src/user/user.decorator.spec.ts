import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';
import { GQLCurrentUser, JWTCurrentUser } from './user.decorator';

const getParamDecoratorFactory = ({ decorator }: { decorator: () => any }): any => {
  class Test {
    public test(@decorator() value) {
      return value;
    }
  }

  const args = Reflect.getMetadata(ROUTE_ARGS_METADATA, Test, 'test');
  return args[Object.keys(args)[0]].factory;
};

describe('UserDecorator', () => {
  describe('GQLCurrentUser', () => {
    it('should be defined', () => {
      expect(GQLCurrentUser).toBeDefined();
    });

    it('should return a function', () => {
      expect(typeof GQLCurrentUser()).toBe('function');
    });
  });

  describe('JWTCurrentUser', () => {
    it('should be defined', () => {
      expect(JWTCurrentUser).toBeDefined();
    });

    it('should return a function', () => {
      expect(typeof JWTCurrentUser()).toBe('function');
    });
  });
});
