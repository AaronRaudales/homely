import { Injectable } from '@angular/core';
import {DatePipe} from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class Constantes {
  
  constructor(
    private datePipe: DatePipe 
  ) {
    this.setFechasActuales();
  }
  public titulo={
    advertencia:"¡Advertencia!",
    error: "¡Error!",
    exito: "¡Éxito!"
  }

  public idRolCliente=1;
  public idRolAnfitrion=2;
  public IdReservacionDisponible=1;
  public IdReservacionAlquilada=2;
  
  public roles=[
    {
      id: 1,
      descripcion: "Cliente",
      
    },
    {
      id: 2,
      descripcion: "Anfitrión"
    }
  ];

  getDescripcionSiNoBooleanByValor(valor){
    for(let x of this.SINOnum){
      if(x.valor==valor){
        return x.descripcion;
      }
    }
    return "No identificado";
  }

  getDescripcionRolById(id){
    for(let x of this.roles){
      if(x.id==id){
        return x.descripcion;
      }
    }
    return "No identificado";
  }

  getDescripcionReservacionById(id){
    for(let x of this.reservaciones){
      if(x.id==id){
        return x.descripcion;
      }
    }
    return "No identificado";
  }
  public mensajeError='Ocurrió un error con el servicio.';
  public mensajeAdvertenciaRecursosVacio="No ha seleccionado recursos";
  public mensajeActualizacionEstado="Se ha actualizado el estado con éxito";
  public mensajeAlerta={
    aprobarUsuario:"¿Desea aprobar el usuario en el sistema?",

  }
  public mensajeEdad='¡Advertencia! Debe ser mayor de edad para convertise en anfitrión';
  public validacion={
    form: "Debe completar correctamente el formulario",
    registros: "No ha seleccionado registros",
    campoDuplicado:"Ya existe un registro con este campo",
    registroDuplicado:"Ya existe un registro similar",
    valores: "Debe completar los valores de cada registro correctamente",
    iguales: "Las contraseñas deben ser iguales",
    imagen: "Solo se acepta adjuntar imagenes",
    imagenAdjuntar3: "Debe adjuntar las 3 imagenes",
    imagenPerfil: "Debe establecer una imagen de Perfil",
    edad: "¡Advertencia! Debe ser mayor de edad para registrarse como anfitrión",
    noApto: "¡Advertencia! Debe ser mayor de edad para convertise en anfitrión"

  }
 
  
  public proceso= {
    nuevas:'NUEVAS',
    migraciones:'MIGRACIONES',
    reposiciones:'REPOSICIONES',
    renovaciones:'RENOVACIONES'
  };

  public noticacionDefault='default';
  public noticacionSuccess='success';
  public noticacionError='error';
  public noticacionWarning='warning';
  public noticacionInfo='info';

  public tipoPost=1;
  public tipoPut=2;


  public statusResponse={
    error: 500, 
    ok:200, 
    tokenExpirado:401,
    advertencia: 400
  };
  public configModal = {
    backdrop: 'static',
    keyboard: false
  };
  
  public registros={
    activos: "/1",
    inactivos: "/0",
    todos:"/2"
  }

  public estados=[
    {
      estado: 1,
      descripcion: "Activo",
      
    },
    {
      estado: 0,
      descripcion: "Inactivo"
    }
  ];

  public idReservacionDisponible=1;
  public idReservacionAlquilado=0;
  public idReservacionReservado=2;
  public reservaciones=[
    {
      id: this.idReservacionDisponible,
      descripcion: "Disponible",
      
    },
    {
      id: this.idReservacionAlquilado,
      descripcion: "Alquilado"
    }
  ];

  public reservacionesPropiedad=[
    {
      id: this.idReservacionDisponible,
      descripcion: "Disponible",
      
    },
    {
      id: this.idReservacionAlquilado,
      descripcion: "Alquilado"
    },
    {
      id: this.idReservacionReservado,
      descripcion: "Reservado"
    }
  ];

  getDescripcionReservacionPropiedadById(id){
    for(let x of this.reservacionesPropiedad){
      if(x.id==id){
        return x.descripcion;
      }
    }
    return "No identificado";
  }
  public SINOnum=[
    {
      valor: 1,
      descripcion: "SI",
      
    },
    {
      valor: 0,
      descripcion: "NO"
    }
  ];
  public bsConfigDefault={
    dateInputFormat: 'YYYY-MM-DD', 
    containerClass: 'theme-default',
    adaptivePosition: true
  }

  public bsConfigDefaultJuliana={
    dateInputFormat: 'DD-MM-YYYY', 
    containerClass: 'theme-default',
    adaptivePosition: true
  }

  public tiposDato=[
    {tipo: "INT", clase: "numeros"},
    {tipo: "DOUBLE", clase: ""},
    {tipo: "VARCHAR", clase: "letras"}, 
    {tipo: "TEXTO", clase: ""}
  ];

  public tipoDato={
    decimal:"decimal",
    texto: "texto",
    numeros:"numeros", 
    numerosGuionLetras:"num-letras",
    letras: "letras", 
    lista: "lista"
  }


  public clases={
    letras:".letras",
    numeros: ".numeros",
    numerosPunto:'.numeros-punto',
    decimal:".decimal",
    texto: ".texto",
    numerosGuionLetras:".num-letras",
    letrasSinEspacio:".letras-sin-espacio",
    ascii:".ascii"
  }

  public formatFecha={
    iso:"yyyy-MM-dd",
    juliana: "DD-MM-YYYY",
    conHoraTZ: "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
  }
  public hoy;
  public hoyHoraTZ;
  public fechaActual;

  public setFechasActuales(){
    var today=new Date();
    this.hoy=today;
    this.hoyHoraTZ = this.datePipe.transform(this.hoy, this.formatFecha.conHoraTZ);
    this.fechaActual = this.datePipe.transform(this.hoy, this.formatFecha.iso);
  }
  CLOUDINARY_URL="https://api.cloudinary.com/v1_1/dp1o9tdca/upload";
  CLOUDINARY_UPLOAD_PRESET="ipcicpat";

}