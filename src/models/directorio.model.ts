import { Document, Schema, model } from 'mongoose';
// Mongoose.pluralize(null);

export interface DirectorioModel extends Document {
  
  Nombre: string;
  Apellido: string;
  Edad: number;
}

const directorioSchema = new Schema({
  Nombre: String,
  Apellido: String,
  Edad: Number
}, { collection: 'directorio' }
);

export default model<DirectorioModel>('directorio', directorioSchema);

