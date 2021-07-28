/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SystemCodeToken } from '../api-models/system-code-token.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SystemCodeTokenService {

    private systemCodeTokenUrl: string = `${environment.apiUrl}/systemcodetokens`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSystemCodeTokens(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SystemCodeToken[]> {
        var url = `${this.systemCodeTokenUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SystemCodeToken[]),
                catchError(this.sharedService.handleError))
    }

    getSystemCodeToken(systemCode : string): Observable<SystemCodeToken> {
        return this.httpClient.get(`${this.systemCodeTokenUrl}/${systemCode}`, {observe: 'response'})
            .pipe(map(response => response.body as SystemCodeToken),
                catchError(this.sharedService.handleError))
    }

    getSystemCodeTokensCount(): Observable<number> {
        var url = `${this.systemCodeTokenUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSystemCodeToken(systemCodeToken : SystemCodeToken): Observable<any> {
        let body = JSON.stringify(systemCodeToken);
        return this.httpClient.post(this.systemCodeTokenUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSystemCodeToken(systemCodeToken : SystemCodeToken, systemCode : string): Observable<any> {
        let body = JSON.stringify(systemCodeToken);
        return this.httpClient.put(`${this.systemCodeTokenUrl}/${systemCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSystemCodeToken(systemCodeToken : SystemCodeToken, systemCode : string): Observable<any> {
        let body = JSON.stringify(systemCodeToken);
        return this.httpClient.patch(`${this.systemCodeTokenUrl}/${systemCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSystemCodeToken(systemCode : string): Observable<any> {
        return this.httpClient.delete(`${this.systemCodeTokenUrl}/${systemCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}