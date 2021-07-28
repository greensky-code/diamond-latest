/* Copyright (c) 2020 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {SharedService} from '../../shared/services/shared.service';
import {AuthDaysVisExtension} from '../../api-models/authorization/auth-days-vis-extension.model';

@Injectable({
    providedIn: 'root'
})
export class AuthDaysVisExtensionService {

    private authDaysVisExtensionUrl: string = `${environment.apiUrl}/authdaysvisextensions`;
    private contentHeaders = new HttpHeaders();

    constructor(private httpClient: HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAuthDaysVisExtensions(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<AuthDaysVisExtension[]> {
        const url = `${this.authDaysVisExtensionUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AuthDaysVisExtension[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getAuthDaysVisExtension(authNumber: number): Observable<AuthDaysVisExtension> {
        return this.httpClient.get(`${this.authDaysVisExtensionUrl}/${authNumber}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthDaysVisExtension),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getAuthDaysVisExtensionsCount(): Observable<number> {
        const url = `${this.authDaysVisExtensionUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByExtensionReason(extensionReason: string): Observable<AuthDaysVisExtension[]> {
        return this.httpClient.get(`${this.authDaysVisExtensionUrl}/find-by-extensionreason/${extensionReason}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthDaysVisExtension),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }


    createAuthDaysVisExtension(authDaysVisExtension: AuthDaysVisExtension): Observable<any> {
        let body = JSON.stringify(authDaysVisExtension);
        return this.httpClient.post(this.authDaysVisExtensionUrl, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateAuthDaysVisExtension(authDaysVisExtension: AuthDaysVisExtension): Observable<any> {
        let body = JSON.stringify(authDaysVisExtension);
        return this.httpClient.put(`${this.authDaysVisExtensionUrl}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateAuthDaysVisExtension(authDaysVisExtension: AuthDaysVisExtension, authNumber: number): Observable<any> {
        let body = JSON.stringify(authDaysVisExtension);
        return this.httpClient.patch(`${this.authDaysVisExtensionUrl}/${authNumber}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteAuthDaysVisExtension(authNumber: number): Observable<any> {
        return this.httpClient.delete(`${this.authDaysVisExtensionUrl}/${authNumber}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    // find-by-authNumber
    findAllByAuthNumber(authNumber: number): Observable<AuthDaysVisExtension[]> {
        return this.httpClient.get(`${this.authDaysVisExtensionUrl}/find-by-authNumber/${authNumber}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthDaysVisExtension),
                catchError(this.sharedService.handleError))
    }
}
