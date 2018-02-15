import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import { CreditCardValidator } from '../../../src/credit-card.validator';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.css']
})
export class CreditComponent implements OnInit {
// myForm: FormGroup;
//   userInfo: {name: string, company:string, email: string, password: any,phone: string} = {name: '', company:'',email: '', phone: '',password:''};
  constructor(private formBuilder: FormBuilder) { }

demoForm: FormGroup;
  submitted: boolean = false;
  
  ngOnInit() {
    this.demoForm = this.formBuilder.group({
      // creditCard: ['', [<any>CreditCardValidator.validateCCNumber]],
      expDate: ['', [<any>CreditCardValidator.validateExpDate]],
      cvc: ['', [<any>Validators.required, <any>Validators.minLength(3), <any>Validators.maxLength(4)]], // TODO compare actual results against card type
      creditCard:['',[Validators.required,Validators.minLength(16),this.creditcardValidator.bind(this)]]
    });

    // this.demoForm = this.formBuilder.group({
    //   'name': ['', [Validators.required, Validators.minLength(3), this.nameValidator.bind(this)]],
    //   'company':['',[Validators.required, Validators.minLength(3), this.companyValidator.bind(this)]],
    //   // 'phone': ['', this.phoneValidator.bind(this)],
    //   'email': ['', [Validators.required, this.emailValidator.bind(this)]],
    //   'password':['',[Validators.required,Validators.minLength(4), Validators.maxLength(20),this.passwordValidator.bind(this)]]
    // });
  }
onSubmit() {
    console.log('submitting form');
  }
creditcardValidator(control: FormControl): {[s: string]: boolean} {
    if (!control.value.match(" /^4/")) {
      return {invalidName: true};
    }
  }
  isValid(field: string) {
    let formField = this.demoForm.get(field);
    return formField.valid || formField.pristine;
  }

  nameValidator(control: FormControl): {[s: string]: boolean} {
    if (!control.value.match("^[a-zA-Z ,.'-]+$")) {
      return {invalidName: true};
    }
  }
companyValidator(control: FormControl): {[s: string]: boolean} {
    if (!control.value.match("^[a-zA-Z ,.'-]+$")) {
      return {invalidCompany: true};
    }
  }
  passwordValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value !== '') {
      if (!control.value.match('^[^A-Za-z0-9]')) {
        return {invalidPassword: true};
      }
    }
  }
 emailValidator(control: FormControl): {[s: string]: boolean} {
   if (control.value !== '') {
      if (!control.value.match('^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.(([0-9]{1,3})|([a-zA-Z]{2,3})|(aero|coop|info|museum|name))$')) {
        return {invalidEmail: true};
      }
    }
 }
}
