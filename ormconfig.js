/* jshint -W014 */

module.exports = {
  logging: true,
  type: 'postgres',
  host: process.env.DBHOST ? process.env.DBHOST : 'localhost',
  port: process.env.DBPORT ? process.env.DBPORT : 5432,
  database: process.env.DBDATABASE ? process.env.DBDATABASE : 'teste-project',
  username: process.env.DBUSER ? process.env.DBUSER : 'postgres',
  password: process.env.DBPASSWORD ? process.env.DBPASSWORD : 'postgres',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/database/migrations/**/*.js'],
  cli: {
    migrationsDir: 'src/database/migrations'
  }
};
