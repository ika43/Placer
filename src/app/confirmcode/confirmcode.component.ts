import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfirmcodeService } from './confirmcode.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmcode',
  templateUrl: './confirmcode.component.html',
  styleUrls: ['./confirmcode.component.css']
})
export class ConfirmcodeComponent implements OnInit {

  constructor(
    private confirmCodeService: ConfirmcodeService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  error;
  regexCode = /^\d{6}$/;
  isLoading: Boolean = false;

  form = new FormGroup({
    'code': new FormControl('', [Validators.pattern(this.regexCode)]),
  })

  get code() {
    return this.form.get('code');
  }

  async confirm() {

    if (this.regexCode.test(this.code.value)) {

      console.log(`code: ${this.code.value} 🎉`)
      const token = localStorage.getItem('token')
      this.isLoading = true;
      /* This operation invokes a Lambda function */
      this.confirmCodeService.confirm(this.code.value, token)
        .subscribe((res: any) => {
          //console.log(`response ${JSON.stringify(res)}`)
          localStorage.setItem("token", res.token);
          this.router.navigate(["/trade"]);
        }, err => {
          if (err) {
            console.error(`error occurred ${JSON.stringify(err.error.error)}`)
            this.error = err.error.error;
            this.isLoading = false;
          }
        })
    } else {
      this.code.markAsTouched();
      this.code.setErrors({
        'pattern': true
      })
    }
  }
}
