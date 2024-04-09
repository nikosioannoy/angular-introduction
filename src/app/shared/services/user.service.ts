import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';

const API_URL = `${environment.apiURL}/user`



@Injectable({
  providedIn: 'root'
})
export class UserService {

  http: HttpClient = inject(HttpClient)
}
