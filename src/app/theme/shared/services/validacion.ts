import { Injectable } from '@angular/core';
declare var $;
@Injectable({
    providedIn: 'root'
})
export class Validacion {
    
    public validarClase(clase) {
      $('body').on('keypress', clase, function (e) {
        var key = e.keyCode || e.which;
        var tecla = String.fromCharCode(key).toLowerCase();
        var letras = "";
        var especiales: any = "";
        switch (clase) {
          case ".letras":
            letras = " abcdefghijklmnñopqrstuvwxyzéáíóú";
            especiales= "8-37-39-46";
            break;
          case ".numeros":
            letras = "1234567890";
            break;
          case ".numeros-punto":
            letras = "1234567890.";
            especiales = "8-37-39-46";
            break;
          case ".numeros-mas":
            letras = "1234567890+ ";
            especiales = "8-37-39-46";
            break;
          case ".num-letras":
            letras = "abcdefghijklmnñopqrstuvwxyzéáíóú1234567890-";
            especiales= "8-37-39-46";
            break;
          case ".texto":
            letras = "abcdefghijklmnñopqrstuvwxyzéáíóú1234567890., ";
            especiales= "8-37-39-46";
            break;
          case ".letras-sin-espacio":
            letras = "abcdefghijklmnñopqrstuvwxyzéáíóú";
            especiales= "8-37-39-46";
            break;
          case ".ascii":
            letras = " abcdefghijklmnopqrstuvwxyz#$%&'()*+,-./0123456789:;<=>?@{|}~[\\]^_!`";
            especiales= "8-37-39-46";
            break;
          default:
            break;
        }
  
        var tecla_especial = false;
        for (var i in especiales) {
          if (key == especiales[i]) {
            tecla_especial = true;
            break;
          }
        }
  
        if (letras.indexOf(tecla) == -1 && !tecla_especial) {
          return false;
        }
        var text = $(this).val();
        text = text.replace(/\s+/gi, ' ');
        $(this).val(text);
  
      });
    }
      public sinEspacio() {
        $('body').on('keypress', '.sinEspacio', function (e) {
    
          let key = e.keyCode ? e.keyCode : e.which;
          if (key == 32) {
            return false;
          }
          var text = $(this).val();
          text = text.replace(/\s+/gi, '');
          $(this).val(text);
    
        });
      } 

      public currencyInput(lengthTotal, lengthMonto,lengthDecimal) {
        $('body').on('blur', '.currencyInput', function (e) {
          var value = e.target.value;
          if(!value.includes('.') && value.length>lengthMonto){
            value=value.substring(0, lengthMonto);
          }
          if(value.length>lengthTotal){
            value= value.substring(0, lengthTotal);
          }
          if(value.includes('.') && value.indexOf('.')>lengthMonto){
            value= value.replace(".", "");
            var indexPunto= value.length-lengthDecimal;
            value=value.substring(0, indexPunto)+"."+value.substring(indexPunto, value.length);
          }
          e.target.value=value;
          var text = $(this).val();
          text = text.replace(/\s+/gi, '');
          $(this).val(text);
    
        });
      } 
      

}