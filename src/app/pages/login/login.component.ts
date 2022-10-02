import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {FormModel, InferModeFromModel} from 'ngx-mf';
import {Login} from '../../common/login';
import {SelfService} from '../../services/self.service';

@Component({
  selector: 'lid-login', templateUrl: './login.component.html', styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.nonNullable.group<LoginForm['controls']>({
    username: this.formBuilder.nonNullable.control(''),
    password: this.formBuilder.nonNullable.control(''),
    persist: this.formBuilder.nonNullable.control(true),
  });

  constructor(private formBuilder: FormBuilder, private selfService: SelfService) {
  }

  ngOnInit(): void {
  }

  login() {
    console.debug('login');
    this.selfService.login(this.loginForm.getRawValue()).subscribe();
  }

}

type LoginForm = FormModel<Login, {}, InferModeFromModel>;
