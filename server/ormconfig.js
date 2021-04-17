const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: isProd ? false : true,
  entities: ['dist/entities/*.js'],
  migrations: ['dist/migrations/*.js'],
  logging: isProd ? false : true,
  cli: {
    migrationsDir: 'dist/migrations',
  },
};
