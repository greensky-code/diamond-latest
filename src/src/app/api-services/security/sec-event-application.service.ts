/* Copyright (c) 2020 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {catchError, map} from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {SharedService} from "../../shared/services/shared.service";
import {SecEventApplication} from "../../api-models/security/sec-event-application.model";

@Injectable({
    providedIn: "root"
})
export class SecEventApplicationService {

    private secEventApplicationUrl: string = `${environment.apiUrl}/seceventapplications`;
    private contentHeaders = new HttpHeaders();

    constructor(private httpClient: HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSecEventApplications(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<SecEventApplication[]> {
        var url = `${this.secEventApplicationUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SecEventApplication[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getSecEventApplication(application: number): Observable<SecEventApplication> {
        return this.httpClient.get(`${this.secEventApplicationUrl}/${application}`, {observe: 'response'})
            .pipe(map(response => response.body as SecEventApplication),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getSecEventApplicationsCount(): Observable<number> {
        var url = `${this.secEventApplicationUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }


    createSecEventApplication(secEventApplication: SecEventApplication): Observable<any> {
        let body = JSON.stringify(secEventApplication);
        return this.httpClient.post(this.secEventApplicationUrl, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateSecEventApplication(secEventApplication: SecEventApplication, application: number): Observable<any> {
        let body = JSON.stringify(secEventApplication);
        return this.httpClient.put(`${this.secEventApplicationUrl}/${application}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateSecEventApplication(secEventApplication: SecEventApplication, application: number): Observable<any> {
        let body = JSON.stringify(secEventApplication);
        return this.httpClient.patch(`${this.secEventApplicationUrl}/${application}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteSecEventApplication(application: number): Observable<any> {
        return this.httpClient.delete(`${this.secEventApplicationUrl}/${application}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
