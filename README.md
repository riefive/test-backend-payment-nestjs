## Description
[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Install Nest
```bash
$ git clone https://github.com/nestjs/typescript-starter.git [project_name]
$ cd [project_name]
$ npm install

# Generate Random Key
$ node -e "console.log(require('crypto').randomBytes(15).toString('hex'))"
# Copy the result and then save to "JWT_KEY" at .env
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
$ npm run seed:run
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

## Test Api
```
- Account Admin: { email: user_admin@sample.dev, password: admin1234 }
- Account User: { email: user_common@sample.dev, password: common1234 }
```

## License

  Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
