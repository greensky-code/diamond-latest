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

@Injectable({
    providedIn: "root"
})
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
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getSystemCodeToken(systemCode : string): Observable<SystemCodeToken> {
        return this.httpClient.get(`${this.systemCodeTokenUrl}/${systemCode}`, {observe: 'response'})
            .pipe(map(response => response.body as SystemCodeToken),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getSystemCodeTokensCount(): Observable<number> {
        var url = `${this.systemCodeTokenUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }





    createSystemCodeToken(systemCodeToken : SystemCodeToken): Observable<any> {
        let body = JSON.stringify(systemCodeToken);
        return this.httpClient.post(this.systemCodeTokenUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateSystemCodeToken(systemCodeToken : SystemCodeToken, systemCode : string): Observable<any> {
        let body = JSON.stringify(systemCodeToken);
        return this.httpClient.put(`${this.systemCodeTokenUrl}/${systemCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateSystemCodeToken(systemCodeToken : SystemCodeToken, systemCode : string): Observable<any> {
        let body = JSON.stringify(systemCodeToken);
        return this.httpClient.patch(`${this.systemCodeTokenUrl}/${systemCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteSystemCodeToken(systemCode : string): Observable<any> {
        return this.httpClient.delete(`${this.systemCodeTokenUrl}/${systemCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getSystemCToken(systemCode : string): Observable<SystemCodeToken> {
        return this.httpClient.get(`${this.systemCodeTokenUrl}/systemcodetoken/0/SECUSERTYPE/${systemCode}`, {observe: 'response'})
            .pipe(map(response => response.body as SystemCodeToken),
                catchError(this.sharedService.handleError))
    }

    getByCodeType(systemCodeType: string): Observable<SystemCodeToken[]> {
        var url = `${this.systemCodeTokenUrl}/${systemCodeType}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SystemCodeToken[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}

