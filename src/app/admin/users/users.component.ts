import { Component, OnInit } from '@angular/core';
import {User} from '../../model/User';
import {HttpClientService} from '../../service/http-client.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: Array<User> | undefined;

  constructor(private httpClientService: HttpClientService) {}

  ngOnInit(): void {
    this.httpClientService.getUsers().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
  }

  handleSuccessfulResponse(response: User[]) {
    this.users = response;
  }

}
