import {Component, Input, EventEmitter, OnInit, Output} from '@angular/core';
import {Book} from '../../../model/Book';
import {HttpClientService} from '../../../service/http-client.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {

  @Input()
  book!: Book;
  // @ts-ignore
  private selectedFile;
  imgURL: any;

  @Output()
  bookAddedEvent = new EventEmitter();

  constructor(private httpClientService: HttpClientService,
              private activedRoute: ActivatedRoute,
              private router: Router,
              private httpClient: HttpClient) { }

  ngOnInit() {
  }

  // @ts-ignore
  public onFileChanged(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
    };

  }

  saveBook() {

    const uploadData = new FormData();
    uploadData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.selectedFile.imageName = this.selectedFile.name;

    this.httpClient.post('http://localhost:8443/api/books/upload', uploadData, { observe: 'response' })
      .subscribe((response) => {
          if (response.status === 200) {
            this.httpClientService.addBook(this.book).subscribe(
              (book) => {
                this.bookAddedEvent.emit();
                this.router.navigate(['admin', 'books']);
              }
            );
            console.log('Image uploaded successfully');
          } else {
            console.log('Image not uploaded');
          }
        }
      );
  }

}
