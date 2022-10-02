import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {FormModel, InferModeFromModel} from 'ngx-mf';
import {ScoreFilter} from '../../common/archive';
import {Login} from '../../common/login';

@Component({
  selector: 'lid-login', templateUrl: './login.component.html', styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.nonNullable.group<LoginForm['controls']>({
    username: this.formBuilder.nonNullable.control(''),
    password: this.formBuilder.nonNullable.control(''),
    persist: this.formBuilder.nonNullable.control(true),
  });

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
  }

  login() {
    console.debug('login');
  }

}

type LoginForm = FormModel<Login, {}, InferModeFromModel>;
