/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { UserDefAttribsToken } from '../api-models/user-def-attribs-token.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class UserDefAttribsTokenService {

    private userDefAttribsTokenUrl: string = `${environment.apiUrl}/userdefattribstokens`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getUserDefAttribsTokens(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<UserDefAttribsToken[]> {
        var url = `${this.userDefAttribsTokenUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as UserDefAttribsToken[]),
                catchError(this.sharedService.handleError))
    }

    getUserDefAttribsToken(winId : string): Observable<UserDefAttribsToken> {
        return this.httpClient.get(`${this.userDefAttribsTokenUrl}/${winId}`, {observe: 'response'})
            .pipe(map(response => response.body as UserDefAttribsToken),
                catchError(this.sharedService.handleError))
    }

    getUserDefAttribsTokensCount(): Observable<number> {
        var url = `${this.userDefAttribsTokenUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createUserDefAttribsToken(userDefAttribsToken : UserDefAttribsToken): Observable<any> {
        let body = JSON.stringify(userDefAttribsToken);
        return this.httpClient.post(this.userDefAttribsTokenUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateUserDefAttribsToken(userDefAttribsToken : UserDefAttribsToken, winId : string): Observable<any> {
        let body = JSON.stringify(userDefAttribsToken);
        return this.httpClient.put(`${this.userDefAttribsTokenUrl}/${winId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateUserDefAttribsToken(userDefAttribsToken : UserDefAttribsToken, winId : string): Observable<any> {
        let body = JSON.stringify(userDefAttribsToken);
        return this.httpClient.patch(`${this.userDefAttribsTokenUrl}/${winId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteUserDefAttribsToken(winId : string): Observable<any> {
        return this.httpClient.delete(`${this.userDefAttribsTokenUrl}/${winId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}