/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SecUser } from '../api-models/sec-user.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SecUserService {

    private secUserUrl: string = `${environment.apiUrl}/secusers`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSecUsers(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SecUser[]> {
        var url = `${this.secUserUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SecUser[]),
                catchError(this.sharedService.handleError))
    }

    getSecUser(userId : string): Observable<SecUser> {
        return this.httpClient.get(`${this.secUserUrl}/${userId}`, {observe: 'response'})
            .pipe(map(response => response.body as SecUser),
                catchError(this.sharedService.handleError))
    }

    getSecUsersCount(): Observable<number> {
        var url = `${this.secUserUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSecUser(secUser : SecUser): Observable<any> {
        let body = JSON.stringify(secUser);
        return this.httpClient.post(this.secUserUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSecUser(secUser : SecUser, userId : string): Observable<any> {
        let body = JSON.stringify(secUser);
        return this.httpClient.put(`${this.secUserUrl}/${userId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSecUser(secUser : SecUser, userId : string): Observable<any> {
        let body = JSON.stringify(secUser);
        return this.httpClient.patch(`${this.secUserUrl}/${userId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSecUser(userId : string): Observable<any> {
        return this.httpClient.delete(`${this.secUserUrl}/${userId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}