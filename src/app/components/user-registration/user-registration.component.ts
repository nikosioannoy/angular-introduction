import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { cloneWith } from 'lodash-es';
import { User } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [ReactiveFormsModule,
            MatFormFieldModule,
            MatInputModule,
            MatButtonModule,
          ],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css'
})
export class UserRegistrationComponent {
  userService = inject(UserService)

  registrationStatus: {success: boolean; message:string} = {
    success: false,
    message: 'Not attempted yet'
  }


  //Validators aforoun mono to sigkekrimeno input OXI allo input
  //Ara den mporw na elegkso an pass kai confirmpass einai isa, XREIAZOMAI METHODO!
  form = new FormGroup({
    givenName: new FormControl('', Validators.required),
    surName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(4)])
  }, this.passwordConfirmValidator)

  //Sthn methodo tha perasei san orisma OLH h forma.
  //Ftiaxnoume custom error an passwords don`t match 
  //Pernaei automata h forma
  passwordConfirmValidator(form: FormGroup) {
    if (form.get('password').value !== form.get('confirmPassword').value) {
      form.get('confirmPassword').setErrors({ passwordMismatch: true })
      return { passwordMismatch: true }
    }
    return {}
  }

  onSubmit(value: any) {
    console.log(value)

    //To kanoume cast san User gia na mporoume na exoume elegxo tipwn
    const user = this.form.value as User
    //onSubmit simainei oti h forma einai valid ARA twra mporoume na sbisoume to confirmPassword
    //gia na steiloume apla to password xoris to confirmPassword sto back end
    delete user['confirmPassword']
    //Subscribe gia HTTP Client calls. Gia xeirismo observables.
    //Gia na asxoloume me to ti mou epistrefei.
    //Edw px epistrefei oti (1on hrthan DATA apo thn klhsh (200 code),
    //H 2on error code 400)
    this.userService.registerUser(user).subscribe({
      next: (response) => {
        console.log('User registered', response.msg)
        this.registrationStatus = {success:true, message: response.msg}
      },
      error: (response) => {
        const message = response.error.msg //Error pou stelnei to backend
        console.log('Error registering user', message)
        this.registrationStatus = {success:false, message }
      }
    })
  }

  registerAnotherUser() {
    this.form.reset()
    this.registrationStatus = {
      success: false,
      message: 'Not attempted yet'
    }
  }

  //Elegxos an uparxei to email HDH enw to grafei o xrhsths (blur)
  check_duplicate_email() {
    const email = this.form.get('email').value //email apo formControlName (html)
    this.userService.check_duplicate_email(email).subscribe({
      next: (response) => {
        console.log(response.msg)
        this.form.get('email').setErrors(null)
      },
      error: (response) => {
        const message = response.error.msg
        console.log(message)
        this.form.get('email').setErrors({duplicateEmail: true})
      }
    })
  }

}
