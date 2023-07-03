import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {FormModel, InferModeFromModel} from 'ngx-mf';
import {Login} from '../../common/login';
import {SelfService} from '../../services/self.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {HttpErrorSnackBarService} from '../../mat-helpers/http-error-snack-bar.service';

@Component({
  selector: 'lid-login', templateUrl: './login.component.html', styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.nonNullable.group<LoginForm['controls']>({
    username: this.formBuilder.nonNullable.control(''),
    password: this.formBuilder.nonNullable.control(''),
    persist: this.formBuilder.nonNullable.control(true),
  });

  credentialsInvalid = false;

  get resetLink() {
    return environment.passwordResetLink;
  }

  constructor(private formBuilder: FormBuilder, private selfService: SelfService, private router: Router, private snackBar: MatSnackBar, private snackBarErrorHandler: HttpErrorSnackBarService) {
  }

  ngOnInit(): void {
    if (this.selfService.token) {
      console.debug('user is already authenticated, redirecting...');
      this.router.navigateByUrl('/self').then();
    }
  }

  login() {
    console.debug('login');
    this.credentialsInvalid = false;
    this.selfService.login(this.loginForm.getRawValue()).subscribe({
      next: value => {
        console.debug('login succeeded', value);
        this.router.navigateByUrl('/self').then(() => this.snackBar.open('Sie sind nun angemeldet, Herzlich Willkommen!'));
      }, error: (err: HttpErrorResponse) => {
        this.snackBarErrorHandler.showError(err, {401: 'Diese Benutzername und Passwort Kombination scheint nicht zu stimmen.'});
        console.debug('login failed', err);
        if (err.status === 401) {
          console.debug('invalid credentials');
          this.credentialsInvalid = true;
        } else {
          this.snackBar.open('Unerwartetet Fehler bei der Anmeldung. Versuchen Sie es bitte später erneut. Kontaktieren Sie den Admninistrator sollte das Problem bestehen.');
        }
      }
    });
  }

}

type LoginForm = FormModel<Login, object, InferModeFromModel>;
