import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

import { AlertController, NavController,ToastController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

import { RegistrarService } from '../services/registrar.service';

@Component({
  selector: 'app-login-docente',
  templateUrl: './login-docente.page.html',
  styleUrls: ['./login-docente.page.scss'],
})
export class LoginDocentePage implements OnInit {

  formularioLogin : FormGroup;
  formularioRegistro : FormGroup;

  constructor(
              private toastController: ToastController,
              private alertController: AlertController,
              private app: AppComponent,
              private NavController: NavController,
              private registroUsuario: RegistrarService,
              private fb: FormBuilder)
              {
                this.formularioLogin = this.fb.group({
                  'correo' : new FormControl("", Validators.required),
                  'password': new FormControl("", Validators.required),
                });
              }
  ngOnInit() {
  }

  ionViewWillEnter() {
    AppComponent.isAlumno = false;
  }

  // LOGIN DOCENTES
  async ingresar(){
    var f = this.formularioLogin.value;
    var a = 0;

    this.registroUsuario.getDatos().then(datos=>{
      if (!datos || datos.length == 0 ){
        return null;
      }

      for (let obj of datos){
        if ((obj.correo == f.correo && obj.pass == f.password) && obj.isAlumno == false){
          a = 1;
          console.log('ingresado');
          localStorage.setItem('ingresado','true');
          this.app.agregarUser(obj.nombre, obj.correo);
          console.log(this.app.user.nombre);
          this.NavController.navigateRoot('home');
        }
      }
      console.log(a);
      if (a == 0){
        this.app.showToast('bottom', 'Correo o Contraseña INCORRECTOS', 2000);
      }
    });
  }

}