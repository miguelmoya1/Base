# Base

## Requirements

- [Node.js](https://nodejs.org/en/) (v16.18.1 or higher)
- [Yarn](https://yarnpkg.com/) (v1.22.19 or higher)
- [Docker](https://www.docker.com/) (v20.10.21 or higher)

_usually, codespaces will install these for you_

## Installation

Before you can use the base, you may change some settings, to d so, open the file ˋdocker-compose.ymlˋ and change the following lines:

```yaml
version: '3.7' # Change this to the version you have installed

- ./data/db:/var/lib/postgresql/base/data # Change this to the path you want to store the database (optional) (the name base is important)

- POSTGRES_DB=base # Change this to the name of the database you want to use (optional)
```

After that, you need to copy the file (inside backend folder) ".env.example" to ".env" and change the following lines:

```yaml
DB_DATABASE=base # Change this to the name of the database you want to use (optional)
```

Now you can start the base with the following command:

```bash
yarn start
```

_This will install all dependencies and start the base_
