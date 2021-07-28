/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SecUser } from '../api-models/sec-user.model';
import { SecUser2 } from '../api-models/sec-user-2.model';
import { environment } from '../../environments/environment';
import { SharedService } from '../shared/services/shared.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable({
    providedIn: "root"
})
export class SecUserService2 {

    private secUserUrl: string = `${environment.apiUrl}/secusers`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient: HttpClient, private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSecUsers(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<SecUser[]> {
        var url = `${this.secUserUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as SecUser[]),
                catchError(this.sharedService.handleError))
    }

    getSecUser(userId: string): Observable<SecUser> {
        return this.httpClient.get(`${this.secUserUrl}/${userId}`, { observe: 'response' })
            .pipe(map(response => response.body as SecUser),
                catchError(this.sharedService.handleError))
    }
    getSecUser2(userId: string): Observable<SecUser2> {
        return this.httpClient.get(`${this.secUserUrl}/${userId}`, { observe: 'response' })
            .pipe(map(response => response.body as SecUser2),
                catchError(this.sharedService.handleError))
    }

    getSecUsersCount(): Observable<number> {
        var url = `${this.secUserUrl}/count`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    createSecUser(secUser: SecUser): Observable<any> {
        let body = JSON.stringify(secUser);
        return this.httpClient.post(this.secUserUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }
    createSecUser2(secUser: SecUser2): Observable<any> {
        let body = JSON.stringify(secUser);
        return this.httpClient.post(this.secUserUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    updateSecUser(secUser: SecUser, userId: string): Observable<any> {
        let body = JSON.stringify(secUser);
        return this.httpClient.put(`${this.secUserUrl}/${userId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }
    updateSecUser2(secUser: SecUser2, userId: string): Observable<any> {
        let body = JSON.stringify(secUser);
        return this.httpClient.put(`${this.secUserUrl}/${userId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    partiallyUpdateSecUser(secUser: SecUser, userId: string): Observable<any> {
        let body = JSON.stringify(secUser);
        return this.httpClient.patch(`${this.secUserUrl}/${userId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSecUser(userId: string): Observable<any> {
        return this.httpClient.delete(`${this.secUserUrl}/${userId}`, { observe: 'response' })
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }

    deleteSecUser2(userId: string): Observable<any> {
        return this.httpClient.delete(`${this.secUserUrl}/${userId}`, { observe: 'response' })
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}
