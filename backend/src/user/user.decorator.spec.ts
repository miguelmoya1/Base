import { GQLCurrentUser } from './user.decorator';

describe('User Decorator', () => {
  it('should be defined', () => {
    expect(GQLCurrentUser).toBeDefined();
  });

  it('should return a function', () => {
    expect(typeof GQLCurrentUser()).toBe('function');
  });
});
