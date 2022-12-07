import { CreateUser } from './create.input';

describe('CreateUser', () => {
  it('should be defined', () => {
    expect(new CreateUser()).toBeDefined();
  });

  it('should have a name', () => {
    const user = new CreateUser();
    user.name = 'John';
    expect(user.name).toEqual('John');
  });

  it('should have a surname', () => {
    const user = new CreateUser();
    user.surname = 'Doe';
    expect(user.surname).toEqual('Doe');
  });

  it('should have an imageUrl', () => {
    const user = new CreateUser();
    user.imageUrl = 'https://www.google.com';
    expect(user.imageUrl).toEqual('https://www.google.com');
  });

  it('should have an email', () => {
    const user = new CreateUser();
    user.email = 'mail@mail.com';
    expect(user.email).toEqual('mail@mail.com');
  });

  it('should have a googleToken', () => {
    const user = new CreateUser();
    user.googleToken = '1234567890';
    expect(user.googleToken).toEqual('1234567890');
  });
});
