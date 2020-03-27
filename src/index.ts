import { Actions, ConfForks, ErrorMs, Microservice, MsManager } from '@coppel/microservices';
import { db } from './db/conexion-mongoose';
import directorioModel, { DirectorioModel } from './models/directorio.model';
import { ResponseMicroservice } from './dto/response-microservice.dto';

// http://10.40.116.20:9003/oxxo/api/v1/w-prueba-curso-JAFM

@MsManager.Define({
  App: 'oxxo',
  Broker: process.env.KAFKA ? [process.env.KAFKA] : ['10.27.113.125:9092'],
  Debug: process.env.PRODUCTION ? false : true,
  Name: 'w-pruebaCurso',
  Version: 'v1'
})
class EjemploMicroservicio extends Microservice {
  public smoketest(): boolean | Promise<boolean> {
    return new Promise((rr: (r: boolean) => void, ff: (r: boolean) => void) => {
      rr(true);
    });
  }

  @MsManager.Errors()
  public errores(): ErrorMs {
    return {
      '-12': 'Error definido por el usuario',
    };
  }
  /**
   * funcion para crear un usuario en una base de datos de mongo
   * @param data son los datos del usuario que recibe la funcion como objeto json
   */
  @MsManager.Create()
  public async crearUsuario(
    @MsManager.ctx('data') data: DirectorioModel,
  ): Promise<ResponseMicroservice> {
    // tslint:disable-next-line: no-console
    console.log('Estos son los datos que recibo en la petición: ', data);
    const directorio = new directorioModel({
      Nombre: data.Nombre,
      Apellido: data.Apellido,
      Edad: Number
    });
    try{
      const nuevoUsuario = await directorio.save();
      return {todoBien: true, directorio: nuevoUsuario};
      // return { todoBien: true };
    } catch (error) {
      // tslint:disable-next-line: no-console
      console.log('hubo un error :v');
    } finally {
      db.close();
    }
  }
  /**
   * funcion para listar por nombre los usuarios de una base de datos
   */
  @MsManager.List()
  public async listarDirectorio()
  : Promise<DirectorioModel[]> {
      // Listar
      try {
        let directorio:DirectorioModel[] = await directorioModel.find().sort({Nombre: 1});
        return directorio;
      } catch (error) {
        console.log('Hubo un error');
      }
  }
}