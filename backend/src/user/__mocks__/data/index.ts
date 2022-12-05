import { User } from '../../entities/user.entity';

export const userData = (): User => ({
  id: '1',
  email: 'mail@gmail.com',
  location: {
    type: 'POINT',
    coordinates: [0, 0],
  },
  name: 'name',
  imageUrl: 'imageUrl',
  surname: 'surname',
  nickname: 'nickname',
  googleToken: 'googleToken',
  distance: 0,
});
