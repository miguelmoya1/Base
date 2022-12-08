import { AuthModule } from './auth.module';

describe('AuthModule', () => {
  it('should be defined', () => {
    expect(AuthModule).toBeDefined();
  });

  it('should be a module', () => {
    expect(AuthModule).toBeInstanceOf(Function);
  });

  it('should be a class', () => {
    expect(new AuthModule()).toBeDefined();
  });
});
