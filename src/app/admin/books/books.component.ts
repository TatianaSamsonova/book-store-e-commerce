import { Component, OnInit } from '@angular/core';
import {Book} from '../../model/Book';
import {HttpClientService} from '../../service/http-client.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: Array<Book> | undefined;
  booksRecieved: Array<Book> | undefined;
  // @ts-ignore
  selectedBook: Book;
  action: any;

  constructor(private httpClientService: HttpClientService,
              private activedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    this.httpClientService.getBooks().subscribe(
      response => this.handleSuccessfulResponse(response)
    );
    this.activedRoute.queryParams.subscribe(
      (params) => {
        this.action = params.action;
        const selectedBookId = params.id;
        if (selectedBookId) {
          // @ts-ignore
          this.selectedBook = this.books.find(book =>  book.id === +selectedBookId);
        }
      }
    );
  }

  handleSuccessfulResponse(response: Array<Book> | undefined) {
    this.books = new Array<Book>();

    // @ts-ignore
    this.booksRecieved = response;

    // @ts-ignore
    for (const book of this.booksRecieved) {
      const bookwithRetrievedImageField = new Book();
      bookwithRetrievedImageField.id = book.id;
      bookwithRetrievedImageField.name = book.name;
      bookwithRetrievedImageField.retrievedImage = 'data:image/jpeg;base64,' + book.picByte;
      bookwithRetrievedImageField.author = book.author;
      bookwithRetrievedImageField.price = book.price;
      bookwithRetrievedImageField.picByte = book.picByte;
      this.books.push(bookwithRetrievedImageField);
    }
  }

  addBook() {
    this.selectedBook = new Book();
    this.router.navigate(['admin', 'books'], { queryParams: { action: 'add' } });
  }

  viewBook(id: number) {
    this.router.navigate(['admin', 'books'], { queryParams: { id, action: 'view' } });
  }
}
