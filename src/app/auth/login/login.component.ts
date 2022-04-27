import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../_service";
import {first, Subject, takeUntil} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  public logo: any;

  public loginForm: any;
  public submitted = false;
  public loading =false;
  public error = '';
  public returnUrl: any;
  private _unsubscribeAll: Subject<any>;
  public passwordTextType: any;



  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _authenticationService: AuthenticationService,
    )
  {
    if (this._authenticationService.currentUserValue) {
      this._router.navigate(['/']);
    }

    this._unsubscribeAll = new Subject();

  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'username' : new FormControl(null,[Validators.required, Validators.email]),
      'password' : new FormControl(null,[Validators.required, Validators.minLength(8)]),
    })

    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';

      this.logo = `${environment.app.appLogoImage}`;


  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Toggle password
   */
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }


  onSubmit() {
    console.log(this.f.username.value, this.f.password.value);
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;

   this._authenticationService
     .login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this._router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error.statusText;
          this.loading = false;
        }
      );

  }

  }
