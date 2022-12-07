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

    // describe('call factory', () => {
    //   let factory: any;
    //   const mockUser = {
    //     id: 1,
    //   };

    // beforeEach(() => {
    //   factory = getParamDecoratorFactory({ decorator: JWTCurrentUser });
    //   jest.spyOn(factory, 'call').mockImplementation(() => mockUser);
    //   jest.resetAllMocks();
    // });

    // it('should call factory', () => {
    //   factory(null, { user: mockUser });

    //   expect(factory.call).toHaveBeenCalled();
    // });

    // it('should return user', () => {
    //   const result = factory(null, { user: mockUser });

    //   expect(result).toBe(mockUser);
    // });
    // });
  });
});
