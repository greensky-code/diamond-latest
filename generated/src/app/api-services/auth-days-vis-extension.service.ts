/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AuthDaysVisExtension } from '../api-models/auth-days-vis-extension.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuthDaysVisExtensionService {

    private authDaysVisExtensionUrl: string = `${environment.apiUrl}/authdaysvisextensions`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAuthDaysVisExtensions(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AuthDaysVisExtension[]> {
        var url = `${this.authDaysVisExtensionUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AuthDaysVisExtension[]),
                catchError(this.sharedService.handleError))
    }

    getAuthDaysVisExtension(authNumber : number): Observable<AuthDaysVisExtension> {
        return this.httpClient.get(`${this.authDaysVisExtensionUrl}/${authNumber}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthDaysVisExtension),
                catchError(this.sharedService.handleError))
    }

    getAuthDaysVisExtensionsCount(): Observable<number> {
        var url = `${this.authDaysVisExtensionUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByExtensionReason(extensionReason : string): Observable<AuthDaysVisExtension[]> {
        return this.httpClient.get(`${this.authDaysVisExtensionUrl}/find-by-extensionreason/${extensionReason}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthDaysVisExtension),
                catchError(this.sharedService.handleError))
    }




    createAuthDaysVisExtension(authDaysVisExtension : AuthDaysVisExtension): Observable<any> {
        let body = JSON.stringify(authDaysVisExtension);
        return this.httpClient.post(this.authDaysVisExtensionUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateAuthDaysVisExtension(authDaysVisExtension : AuthDaysVisExtension, authNumber : number): Observable<any> {
        let body = JSON.stringify(authDaysVisExtension);
        return this.httpClient.put(`${this.authDaysVisExtensionUrl}/${authNumber}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateAuthDaysVisExtension(authDaysVisExtension : AuthDaysVisExtension, authNumber : number): Observable<any> {
        let body = JSON.stringify(authDaysVisExtension);
        return this.httpClient.patch(`${this.authDaysVisExtensionUrl}/${authNumber}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteAuthDaysVisExtension(authNumber : number): Observable<any> {
        return this.httpClient.delete(`${this.authDaysVisExtensionUrl}/${authNumber}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}