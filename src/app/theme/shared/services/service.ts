import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';
import {environment} from 'src/environments/environment';
import { NotifierService } from 'angular-notifier';
import {urls} from './urls';


@Injectable({
    providedIn: 'root'
})
export class Service {
  public apiUrl = "";
  public languageSpanish;
  public dtOptionsConfig: DataTables.Settings = {};
  
  public infoUsuario={
    primerNombre:"",
    primerApellido:""
  }

  constructor(
    private http: HttpClient,
    private notifierService: NotifierService
    ) {
      this.apiUrl=environment.serverIP;
    }
  
  
  public PostAuth( url, data): Observable<any> {
      
    let headers = new HttpHeaders({
      'Content-Type':  'application/json; charset=utf-8'
    });

    return this.http.post<any>(this.apiUrl + url, data, {  headers });
  
  }

  

  public findUser(id:number){
    return this.http.get('profile/'+ id)
  }

  public PutAuth( url, data): Observable<any> {
      
    let headers = new HttpHeaders({
      'Content-Type':  'application/json; charset=utf-8'
    });

    return this.http.put<any>(this.apiUrl + url, data, {  headers });
  
  }

  

  public Send( url,data, type): Observable<any>{
      
    let headers = this.getHeaders();

    if (type == 1) {
        return this.http.post<any>(this.apiUrl + url, data, { headers });
    } else {
        return this.http.put<any>(this.apiUrl + url, data, { headers });
    }
    
  }

  public Delete( url): Observable<any>{
      
    return this.http.delete<any>(this.apiUrl + url);
    
    
  }
  public SendAuth( url,data, type): Observable<any>{
    

    if (type == 1) {
        return this.http.post<any>(this.apiUrl + url, data );
    } else {
        return this.http.put<any>(this.apiUrl + url, data);
    }
    
  }

  public PostCloudinary( urlApi,data, ): Observable<any>{
    let headers: {
      'Content-Type': 'multipart/form-data'
    }
    return this.http.post<any>(urlApi,data, {  headers } );
    
  }

  public Get(url): Observable<any>{
    let headers = this.getHeaders();
    return this.http.get<any>(this.apiUrl + url,{  headers });
  }

  

  public GetParams(url, params): Observable<any>{
    let headers = this.getHeaders();
    return this.http.get<any>(this.apiUrl + url,{  headers:headers, params:params });
  }
  public PostParams(url,data, params): Observable<any>{
    let headers = this.getHeaders();
    return this.http.post<any>(this.apiUrl + url,data,{  headers:headers, params:params });
  }
  
  public DeleteParams(url, params): Observable<any>{
    let headers = this.getHeaders();
    return this.http.delete<any>(this.apiUrl + url, { params:params, headers: headers });
   
  }
  public getHeaders(){
    return new HttpHeaders({
      'Content-Type':  'application/json; charset=utf-8',
      'Authorization': 'Bearer '+sessionStorage.getItem('token')
    }); 
  }


  errorNotifier(Error){
    if(Error.status==500 || (Error.error.message==undefined || Error.error.message==null || Error.error.message=='')){
      this.notifierService.notify('error', 'Ocurrió un error con el servicio.');
    }else{
      this.notifierService.notify('warning', Error.error.message);
    }
  }

  notificar(tipo, mensaje){
    this.notifierService.notify(tipo,mensaje);
  }

  public configDataTableOptions(){ 
    this.languageSpanish= this.setLanguageSpanish();
    this.dtOptionsConfig={
      pagingType: 'full_numbers',
      pageLength: 5,
      language: this.languageSpanish,
      stateSave: true,
      lengthMenu: this.getlengthMenu(),
      columnDefs: [{type:'num', targets:0}],
      order: [[0, 'asc']]
    }
    return this.dtOptionsConfig;
  }

  public setLanguageSpanish(){
    return {
        "sProcessing":     "Procesando...",
        "sLengthMenu":     "Mostrar _MENU_ registros",
        "sZeroRecords":    "No se encontraron resultados",
        "sEmptyTable":     "Ningún dato disponible en esta tabla",
        "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
        "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
        "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
        "sSearch":         "Buscar:",
        "sInfoThousands":  ",",
        "sLoadingRecords": "Cargando...",
        "oPaginate": {
            "sFirst":    "Primero",
            "sLast":     "Último",
            "sNext":     "Siguiente",
            "sPrevious": "Anterior"
        },
        "oAria": {
            "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
            "sSortDescending": ": Activar para ordenar la columna de manera descendente"
        },
        "buttons": {
            "copy": "Copiar",
            "colvis": "Visibilidad",
            "pageLength": '%d'
        }
    };
  }

  public getlengthMenu(){
    return [
      [ 5, 10, 25, 50, 100,-1 ],
      [ '5','10', '25', '50', '100','Todos' ]
    ]
  }

}
