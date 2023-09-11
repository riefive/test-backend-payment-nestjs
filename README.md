## Description
[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Install Nest
```bash
$ git clone https://github.com/nestjs/typescript-starter.git [project_name]
$ cd [project_name]
$ npm install
```

## Extended Libraries
```bash
# Auth
npm install --save @nestjs/passport @nestjs/jwt passport passport-local passport-jwt
npm install --save-dev @types/passport-local @types/passport-jwt

# Store
npm install --save @nestjs/typeorm typeorm typeorm-extension reflect-metadata sqlite3
```

## Running the app

```bash
# development
$ npm run migration:seed
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

  Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
