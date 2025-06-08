import { DataSource } from 'typeorm';
import { Entities } from './entities';

export const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  entities: Entities,
  logging: true,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default dataSource;
