import { connect, connection } from 'mongoose';
import { URL_CONEXION_BASE_DATOS_MONGO } from './constants';

connect(URL_CONEXION_BASE_DATOS_MONGO, { useNewUrlParser: true, useUnifiedTopology: true });

let db = connection;
db.on('error', console.error.bind(console, 'connection error:'));

export {
  db,
};