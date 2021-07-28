/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AuthCode } from '../api-models/auth-code.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuthCodeService {

    private authCodeUrl: string = `${environment.apiUrl}/authcodes`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAuthCodes(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AuthCode[]> {
        var url = `${this.authCodeUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AuthCode[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getAuthCode(authCode : string): Observable<AuthCode> {
        return this.httpClient.get(`${this.authCodeUrl}/${authCode}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthCode))
    }


    lookupAuthCode(authCode: string): Observable<AuthCode[]> {
        return this.httpClient.post(`${this.authCodeUrl}/lookup/${authCode}`, {}, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    getAuthCodesCount(): Observable<number> {
        var url = `${this.authCodeUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }





    createAuthCode(authCode : AuthCode): Observable<any> {
        let body = JSON.stringify(authCode);
        return this.httpClient.post(this.authCodeUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateAuthCode(authCode : AuthCode, authCode1 : string): Observable<any> {
        let body = JSON.stringify(authCode);
        return this.httpClient.put(`${this.authCodeUrl}/${authCode1}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateAuthCode(authCode : AuthCode, authCode1 : string): Observable<any> {
        let body = JSON.stringify(authCode);
        return this.httpClient.patch(`${this.authCodeUrl}/${authCode1}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteAuthCode(authCode : string): Observable<any> {
        return this.httpClient.delete(`${this.authCodeUrl}/${authCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
