/* jshint -W014 */

const dbConfig = {
  logging: process.env.DBLOG ? process.env.DBLOG == 'true' : false,
  type: 'postgres',
  host: process.env.DBHOST ? process.env.DBHOST : 'localhost',
  port: process.env.DBPORT ? process.env.DBPORT : 5432,
  database: process.env.DBDATABASE ? process.env.DBDATABASE : 'test',
  username: process.env.DBUSER ? process.env.DBUSER : 'postgres',
  password: process.env.DBPASSWORD ? process.env.DBPASSWORD : 'postgres',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/database/migrations/**/*.js'],
  cli: {
    migrationsDir: 'src/database/migrations'
  }
};

module.exports = [
  {
    ...dbConfig,
    logging: true,
    migrationsTableName: 'migrations',
    migrations: ['dist/database/migrations/**/*.js'],
    cli: {
      migrationsDir: 'src/database/migrations'
    }
  },
  {
    name: 'seed',
    ...dbConfig,
    migrationsTableName: 'seeds',
    migrations: ['dist/database/seeds/**/*.js'],
    cli: {
      migrationsDir: 'src/database/seeds'
    }
  }
];
