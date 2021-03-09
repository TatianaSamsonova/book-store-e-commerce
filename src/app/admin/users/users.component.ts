import { Component, OnInit } from '@angular/core';
import {User} from '../../model/User';
import {HttpClientService} from '../../service/http-client.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: Array<User> | undefined;
  action: any;
  // @ts-ignore
  selectedUser: User;

  constructor(private httpClientService: HttpClientService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.httpClientService.getUsers().subscribe(
      response => this.handleSuccessfulResponse(response),
    );

    this.activatedRoute.queryParams.subscribe(
      (params) => {
        this.action = params.action;
      }
    );

    this.refreshData();
  }

  refreshData() {
    this.httpClientService.getUsers().subscribe(
      response => this.handleSuccessfulResponse(response),
    );

    this.activatedRoute.queryParams.subscribe(
      (params) => {
        this.action = params.action;
        const selectedUserId = params.id;
        if (selectedUserId) {
          // @ts-ignore
          this.selectedUser = this.users.find(user => user.id === +selectedUserId);
        }
      }
    );
  }

  handleSuccessfulResponse(response: User[]) {
    this.users = response;
  }

  viewUser(id: number) {
    this.router.navigate(['admin', 'users'], {queryParams : {id, action: 'view'}});
  }

  addUser() {
    this.selectedUser = new User();
    this.router.navigate(['admin', 'users'], { queryParams: { action: 'add' } });
  }

}
