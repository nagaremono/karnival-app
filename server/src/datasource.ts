import { DataSource } from 'typeorm';
import { Entities } from './entities';

export const dataSource = new DataSource({
  type: 'postgres',
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  schema: process.env.DB_SCHEMA || 'public',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  synchronize: false,
  entities: Entities,
  logging: process.env.NODE_ENV !== 'production',
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : undefined,
});

export default dataSource;
