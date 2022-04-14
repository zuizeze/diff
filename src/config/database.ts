import { join } from 'path';
export default {
  type: 'mysql',
  host: process.env.DATA_BASE_HOST,
  port: 3306,
  username: 'root',
  password: process.env.DATA_BASE_PASS,
  database: process.env.DATA_BASE,
  entities: [join(__dirname, '../', '**/**.entity{.ts,.js}')],
  synchronize: false,
};
