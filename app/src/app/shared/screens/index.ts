const PATHS = {
  welcome: 'welcome',
  dashboard: 'dashboard',
  geolocation: 'geolocation',
  auth: 'auth',
  user: 'user',
  version: 'version',
};

const subRoutes = {
  add: 'add',
  edit: 'edit',
  detail: ':id',
  profile: 'profile',
  login: 'login',
  set_up: 'set-up',
};

const ROUTES = {
  welcome: {
    path: PATHS.welcome,
    route: `/${PATHS.welcome}`,
  },
  dashboard: {
    path: PATHS.dashboard,
    route: `/${PATHS.dashboard}`,
  },
  geolocation: {
    path: PATHS.geolocation,
    route: `/${PATHS.geolocation}`,
  },
  version: {
    path: PATHS.version,
    route: `/${PATHS.version}`,
  },
  auth: {
    path: PATHS.auth,
    route: `/${PATHS.auth}`,
    login: {
      path: subRoutes.login,
      route: `/${PATHS.auth}/${subRoutes.login}`,
    },
  },
  user: {
    path: PATHS.user,
    route: `/${PATHS.user}`,
    set_up: {
      path: subRoutes.set_up,
      route: `/${PATHS.user}/${subRoutes.set_up}`,
    },
    detail: {
      path: subRoutes.detail,
      route: (id: string) => `/${PATHS.user}/${id}`,
    },
  },
};

export { ROUTES };
