import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  entities: ['dist/entities/*.js'],
  migrations: ['dist/migrations/*.js'],
});
