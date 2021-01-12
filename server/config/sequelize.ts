import { Sequelize } from 'sequelize';
import { SequelizeConnectionOptions } from '../types/config/sequelize'

interface ConnectionOptions extends SequelizeConnectionOptions {
    logging: boolean;
}

const sequelizeConnectionOptions: ConnectionOptions = {
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT),
    dialect: 'postgres',
    logging: false,
}

const connection: Sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, sequelizeConnectionOptions);

export default connection;