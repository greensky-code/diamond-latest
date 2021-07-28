/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AuthAddtlInfoPwk } from '../api-models/auth-addtl-info-pwk.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuthAddtlInfoPwkService {

    private authAddtlInfoPwkUrl: string = `${environment.apiUrl}/authaddtlinfopwks`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAuthAddtlInfoPwks(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AuthAddtlInfoPwk[]> {
        var url = `${this.authAddtlInfoPwkUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AuthAddtlInfoPwk[]),
                catchError(this.sharedService.handleError))
    }

    getAuthAddtlInfoPwk(seqAuthAddtlInfoPwk : number): Observable<AuthAddtlInfoPwk> {
        return this.httpClient.get(`${this.authAddtlInfoPwkUrl}/${seqAuthAddtlInfoPwk}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthAddtlInfoPwk),
                catchError(this.sharedService.handleError))
    }

    getAuthAddtlInfoPwksCount(): Observable<number> {
        var url = `${this.authAddtlInfoPwkUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createAuthAddtlInfoPwk(authAddtlInfoPwk : AuthAddtlInfoPwk): Observable<any> {
        let body = JSON.stringify(authAddtlInfoPwk);
        return this.httpClient.post(this.authAddtlInfoPwkUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateAuthAddtlInfoPwk(authAddtlInfoPwk : AuthAddtlInfoPwk, seqAuthAddtlInfoPwk : number): Observable<any> {
        let body = JSON.stringify(authAddtlInfoPwk);
        return this.httpClient.put(`${this.authAddtlInfoPwkUrl}/${seqAuthAddtlInfoPwk}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateAuthAddtlInfoPwk(authAddtlInfoPwk : AuthAddtlInfoPwk, seqAuthAddtlInfoPwk : number): Observable<any> {
        let body = JSON.stringify(authAddtlInfoPwk);
        return this.httpClient.patch(`${this.authAddtlInfoPwkUrl}/${seqAuthAddtlInfoPwk}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteAuthAddtlInfoPwk(seqAuthAddtlInfoPwk : number): Observable<any> {
        return this.httpClient.delete(`${this.authAddtlInfoPwkUrl}/${seqAuthAddtlInfoPwk}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}