import { User } from './user.entity';

describe('User', () => {
  it('should be defined', () => {
    expect(new User()).toBeDefined();
  });

  it('should have an id', () => {
    const user = new User();
    user.id = '1';
    expect(user.id).toEqual('1');
  });

  it('should have an email', () => {
    const user = new User();
    user.email = 'mail@mail.com';
    expect(user.email).toEqual('mail@mail.com');
  });

  it('should have a name', () => {
    const user = new User();
    user.name = 'John';
    expect(user.name).toEqual('John');
  });

  it('should have a surname', () => {
    const user = new User();
    user.surname = 'Doe';
    expect(user.surname).toEqual('Doe');
  });

  it('should have a location', () => {
    const user = new User();
    user.location = {
      type: 'Point',
      coordinates: [0, 0],
    };
    expect(user.location).toEqual({
      type: 'Point',
      coordinates: [0, 0],
    });
  });

  it('should have an imageUrl', () => {
    const user = new User();
    user.imageUrl = 'https://www.google.com';
    expect(user.imageUrl).toEqual('https://www.google.com');
  });

  it('should have a nickname', () => {
    const user = new User();
    user.nickname = 'John Doe';
    expect(user.nickname).toEqual('John Doe');
  });

  it('should have a googleToken', () => {
    const user = new User();
    user.googleToken = '1234567890';
    expect(user.googleToken).toEqual('1234567890');
  });

  it('should have a distance', () => {
    const user = new User();
    user.distance = 0;
    expect(user.distance).toEqual(0);
  });
});
