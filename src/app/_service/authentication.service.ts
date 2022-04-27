import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {User,Role} from "../_models";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public currentUser: Observable<User>;

  private currentUserSubject: BehaviorSubject<User>;
  constructor(
    private _http: HttpClient,
    private _toastrService: ToastrService
  ) {
    this.currentUserSubject=new BehaviorSubject<User>(JSON.parse(<string>localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  //etter: currentUserValue
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  get isAdmin() {
    return this.currentUser && this.currentUserSubject.value.role === Role.Admin;
  }

  get isTeacher() {
    return this.currentUser && this.currentUserSubject.value.role === Role.Teacher;
  }

  get isStudent() {
    return this.currentUser && this.currentUserSubject.value.role === Role.Student;
  }

  login(username: any, password: any) {
    return this._http
      .post<any>(`${environment.apiUrl}/auth/login`, { username, password })
      .pipe(
        map((user) => {
          // login successful if there's a jwt token in the response
          console.log(user);

          if (user && user.access_token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));

            console.log(user.access_token);
            // Display welcome toast!
            // setTimeout(() => {
            //   this._toastrService.success(
            //     'You have successfully logged in as an ' +
            //     user.role +
            //     ' user to Vuexy. Now you can start to explore. Enjoy! 🎉',
            //     '👋 Welcome, ' + user.firstName + '!',
            //     { toastClass: 'toast ngx-toastr', closeButton: true }
            //   );
            // }, 2500);

            // notify
            this.currentUserSubject.next(user);
          }

          return user;
        })
      );
  }
}
