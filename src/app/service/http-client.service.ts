import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from '../model/User';
import {Book} from '../model/Book';

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

  deleteUser(id: string | number) {
    return this.httpClient.delete<User>('http://localhost:8443/api/users/' + id);
  }

  getBooks() {
    return this.httpClient.get<Book[]>('http://localhost:8443/api/books');
  }

  addBook(newBook: Book) {
    return this.httpClient.post<Book>('http://localhost:8443/api/books/add', newBook);
  }
}
