import { HttpClient } from '@angular/common/http';
import { Injectable, effect, inject, signal } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Credentials, User, loggedInUser } from '../interfaces/user';

const API_URL = `${environment.apiURL}/user`



@Injectable({
  providedIn: 'root'
})
export class UserService {

  http: HttpClient = inject(HttpClient)

  //signal - kati san observable//kati pou mporw na blepw ti periexei kai na
  //antidrw automata stis allages tou
  user = signal<loggedInUser | null>(null)

  constructor() {
    effect(()=>{
      if (this.user()) {
        console.log('User logged in', this.user().fullname)
      } else {
        console.log('No user logged in')
      }
    })
  }

  registerUser(user: User) {
    return this.http.post<{msg: string }>(`${API_URL}/register`, user)
  }

  check_duplicate_email(email: string) {
    return this.http.get<{msg: string}>(`${API_URL}/check_duplicate_email/${email}`)
  }

  loginUser(credentials: Credentials) {
    return this.http.post<{ access_token: string }>
    (`${API_URL}/login`, credentials)
  }
}
