import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { AddDatabaseUser } from '../api-models/add-database-user';
import { SharedService } from '../shared/services/shared.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AddDatabaseUserService {

  private addDatabaseUserUrl: string = `${environment.apiUrl}/adddatabaseuser`;
  private contentHeaders = new HttpHeaders();
  constructor(private httpClient: HttpClient, private sharedService: SharedService) {
    this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
    this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
  }

  // addDatabaseUser(username: string, password: string,usePassProfileStatus:boolean): Observable<AddDatabaseUser> {
  //   let headers = new HttpHeaders({ 'userName': `${username}`, 'password': `${password}`,'usePassProfileStatus': `${usePassProfileStatus}`});
  //   let options = {
  //     headers: headers
  //   }

  //   return this.httpClient.post(`${this.addDatabaseUserUrl}/create`, {}, options)
  //     .pipe(map(response => response as AddDatabaseUser),
  //       catchError((error: any) => {
  //         return this.sharedService.handleError(error)
  //       }))

  // }

  addDatabaseUser(addDatabaseUser: AddDatabaseUser): Observable<any> {
    let body = JSON.stringify(addDatabaseUser);
    return this.httpClient.post(this.addDatabaseUserUrl, body, { headers: this.contentHeaders })
      .pipe(map(response => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }
}
