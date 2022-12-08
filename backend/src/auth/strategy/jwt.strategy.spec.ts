import { JwtStrategy } from './jwt.strategy';

describe('JwtStrategy', () => {
  it('should be defined', () => {
    expect(JwtStrategy).toBeDefined();
  });

  describe('when class is instantiated', () => {
    let jwtStrategy: JwtStrategy;

    beforeEach(() => {
      process.env.JWT_SECRET = 'secret';
      jwtStrategy = new JwtStrategy();
    });

    it('should be a class', () => {
      expect(jwtStrategy).toBeDefined();
    });

    describe('validate', () => {
      it('should have a validate method', () => {
        expect(jwtStrategy.validate).toBeDefined();
      });

      it('should have a validate method that is a function', () => {
        expect(jwtStrategy.validate).toBeInstanceOf(Function);
      });

      describe('when validate is called', () => {
        let payload: { email: string; id: string };
        let result: { email: string; id: string };

        beforeEach(async () => {
          payload = {
            email: 'mail#mail.com',
            id: '123',
          };

          result = await jwtStrategy.validate(payload);
        });

        it('should return an object', () => {
          expect(result).toBeDefined();
        });

        it('should return an object with an email property', () => {
          expect(result.email).toBeDefined();
        });

        it('should return an object with an id property', () => {
          expect(result.id).toBeDefined();
        });

        it('should return an object with an email property that is a string', () => {
          expect(typeof result.email).toBe('string');
        });

        it('should return an object with an id property that is a string', () => {
          expect(typeof result.id).toBe('string');
        });

        it('should return an object with an email property that is equal to the payload email property', () => {
          expect(result.email).toBe(payload.email);
        });

        it('should return an object with an id property that is equal to the payload id property', () => {
          expect(result.id).toBe(payload.id);
        });
      });
    });
  });
});
