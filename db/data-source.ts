import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from 'dotenv';
import * as mixpanel from 'mixpanel';

dotenv.config()
const mixpanelClient = mixpanel.init(process.env.MIXPANEL_TOKEN);

export const dataSourceOptions: DataSourceOptions & { mixpanelClient: any } = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity{.js,.ts}'],
  migrations: ['dist/db/migrations/*{.js,.ts}'],
  mixpanelClient,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
