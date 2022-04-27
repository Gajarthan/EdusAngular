import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  public registerForm: any;

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'phone' : new FormControl(null,[Validators.required, Validators.minLength(9), Validators.maxLength(10)]),
    })
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit(){
    console.log(this.f.phone.value);
  }

}
