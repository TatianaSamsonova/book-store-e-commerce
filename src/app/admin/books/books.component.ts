import { Component, OnInit } from '@angular/core';
import {Book} from '../../model/Book';
import {HttpClientService} from '../../service/http-client.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: Array<Book> | undefined;

  constructor(private httpClientService: HttpClientService) { }

  ngOnInit() {

    this.httpClientService.getBooks().subscribe(
      response => this.handleSuccessfulResponse(response)
    );
  }

  handleSuccessfulResponse(response: Book[] | undefined) {
    this.books = response;
  }
}
