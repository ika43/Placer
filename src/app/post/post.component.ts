import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostValidators } from './post.validators';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent {

  // INITIALIZE FORM OBJECT FORM PAYMENT INVOICE
  form = new FormGroup({
    'cc-payment': new FormControl('',
      [
        PostValidators.amount
      ]),
    'cc-name': new FormControl('',
      [
        Validators.minLength(2),
        PostValidators.ccName,
      ]),
    'cc-number': new FormControl('',
      [
        PostValidators.ccNumber
      ]),
    'cc-exp': new FormControl('',
      [
        PostValidators.ccExp
      ]),
    'x_card_code': new FormControl('',
      [
        PostValidators.securityCode
      ]),
  })

  // WRITE GETTERS FOR EVERY FORM COMPONENT
  get name() {
    return this.form.get('cc-name');
  }

  get payment() {
    return this.form.get('cc-payment');
  }

  get number() {
    return this.form.get('cc-number');
  }

  get exp() {
    return this.form.get('cc-exp');
  }

  get secCode() {
    return this.form.get('x_card_code');
  }

  // WHEN FORM IS SUBMITTED
  submitInvoice() {

    // VALID EVERY FORM CONTROL AND SHOW ERROR IF EXIST
    if (PostValidators.amount(this.payment)) {
      this.payment.markAsTouched();
      this.payment.setErrors({ amount: true })
    }
    if (PostValidators.ccName(this.name)) {
      this.name.markAsTouched();
      this.name.setErrors({ 'ccName': true })

    } else if (this.name.value.length < 2) {
      this.name.markAsTouched();
      this.name.setErrors({ 'minlength': true })
    }
    if (PostValidators.ccNumber(this.number)) {
      this.number.markAsTouched();
      this.number.setErrors({ 'ccNumber': true })
    }
    if (PostValidators.ccExp(this.exp)) {
      this.exp.markAsTouched();
      this.exp.setErrors({ 'ccExp': true })
    }
    if (PostValidators.securityCode(this.secCode)) {
      this.secCode.markAsTouched();
      this.secCode.setErrors({ 'securityCode': true })
    }else{
      // TODO: SEND DATA TO AWS LAMBDA 
    }
  }

}
