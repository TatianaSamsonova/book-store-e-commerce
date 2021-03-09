import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getUsers()
  {
    return this.httpClient.get<User[]>('http://localhost:8443/api/users');
  }

  addUser(newUser: User | undefined) {
    return this.httpClient.post<User>('http://localhost:8443/api/users/add', newUser);
  }
}
