/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { UserUsers } from '../api-models/user-users.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class UserUsersService {

    private userUsersUrl: string = `${environment.apiUrl}/useruserss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getUserUserss(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<UserUsers[]> {
        var url = `${this.userUsersUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as UserUsers[]),
                catchError(this.sharedService.handleError))
    }

    getUserUsers(username : string): Observable<UserUsers> {
        return this.httpClient.get(`${this.userUsersUrl}/${username}`, {observe: 'response'})
            .pipe(map(response => response.body as UserUsers),
                catchError(this.sharedService.handleError))
    }

    getUserUserssCount(): Observable<number> {
        var url = `${this.userUsersUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createUserUsers(userUsers : UserUsers): Observable<any> {
        let body = JSON.stringify(userUsers);
        return this.httpClient.post(this.userUsersUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateUserUsers(userUsers : UserUsers, username : string): Observable<any> {
        let body = JSON.stringify(userUsers);
        return this.httpClient.put(`${this.userUsersUrl}/${username}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateUserUsers(userUsers : UserUsers, username : string): Observable<any> {
        let body = JSON.stringify(userUsers);
        return this.httpClient.patch(`${this.userUsersUrl}/${username}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteUserUsers(username : string): Observable<any> {
        return this.httpClient.delete(`${this.userUsersUrl}/${username}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}