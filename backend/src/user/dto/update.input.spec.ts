import { UpdateUser } from './update.input';

describe('UpdateUser', () => {
  it('should be defined', () => {
    expect(new UpdateUser()).toBeDefined();
  });

  it('should have a name', () => {
    const user = new UpdateUser();
    user.name = 'John';
    expect(user.name).toEqual('John');
  });

  it('should have a surname', () => {
    const user = new UpdateUser();
    user.surname = 'Doe';
    expect(user.surname).toEqual('Doe');
  });

  it('should have a location', () => {
    const user = new UpdateUser();
    user.location = {
      coordinates: [0, 0],
    };
    expect(user.location).toEqual({
      coordinates: [0, 0],
    });
  });

  it('should have a nickname', () => {
    const user = new UpdateUser();
    user.nickname = 'John Doe';
    expect(user.nickname).toEqual('John Doe');
  });
});
