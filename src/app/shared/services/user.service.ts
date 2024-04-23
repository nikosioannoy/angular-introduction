import { HttpClient } from '@angular/common/http';
import { Injectable, effect, inject, signal } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Credentials, User, loggedInUser } from '../interfaces/user';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

const API_URL = `${environment.apiURL}/user`



@Injectable({
  providedIn: 'root'
})
export class UserService {

  http: HttpClient = inject(HttpClient)
  router: Router = inject(Router)
  //signal - kati san observable//kati pou mporw na blepw ti periexei kai na
  //antidrw automata stis allages tou
  user = signal<loggedInUser | null>(null)

  constructor() {
    const access_token = localStorage.getItem('access_token')
    if (access_token) {
      const decodedTokenSubject = jwtDecode(access_token).sub as unknown as loggedInUser
      this.user.set({
        fullname: decodedTokenSubject.fullname,
        email: decodedTokenSubject.email
      })
    }
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

  logoutUser() {
    this.user.set(null) //Setaroume to signal tou user se null gia logout
    localStorage.removeItem('access_token') //Svinoume to access token
    this.router.navigate(['login']) //na mas paei sto login
  }
}
