import { AbstractControl, ValidationErrors } from '@angular/forms';


export class PostValidators {

  static cannotContainSpaces(control: AbstractControl): ValidationErrors {

    //test validator
    if ((control.value as string).indexOf(' ') >= 0) {
      return {
        cannotContainSpaces: true
      }
    }
    return null;
  }

  //name validator
  static ccName(control: AbstractControl): ValidationErrors {
    if (!/^[a-zA-Z ]+$/.test(control.value)) {
      return {
        ccName: true
      }
    }
    return null;
  }

  // valid only VISA and MASTER card
  static ccNumber(control: AbstractControl): ValidationErrors {
    if (!(/^(?:4[0-9]{12}(?:[0-9]{3})?)$/).test(control.value) && !(/^(?:5[1-5][0-9]{14})$/).test(control.value)) {
      return {
        ccNumber: true
      }
    }
    return null;
  }

  // exp date validator 
  static ccExp(control: AbstractControl): ValidationErrors {
    if (!/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/.test(control.value)) {
      return {
        ccExp: true
      }
    }
    return null;
  }

  // security code regex validator
  static securityCode(control: AbstractControl): ValidationErrors {
    if (!/^[0-9]{3,4}$/.test(control.value)) {
      return {
        securityCode: true
      }
    }
    return null;
  }

  // amount validator 
  static amount(control: AbstractControl): ValidationErrors {
    if (!(/^\d+(\.\d{1,2})?$/).test(control.value)) {
      return {
        amount: true
      }
    }
    return null;
  }
}