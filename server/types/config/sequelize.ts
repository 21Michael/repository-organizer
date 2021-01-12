import { Dialect } from 'sequelize';

export interface SequelizeConnectionOptions {
    host: string,
    port: number,
    dialect: Dialect
}

export interface ConnectionOptions extends SequelizeConnectionOptions {
    logging: boolean;
}