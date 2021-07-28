/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SecEventApplication } from '../api-models/sec-event-application.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SecEventApplicationService {

    private secEventApplicationUrl: string = `${environment.apiUrl}/seceventapplications`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSecEventApplications(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SecEventApplication[]> {
        var url = `${this.secEventApplicationUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SecEventApplication[]),
                catchError(this.sharedService.handleError))
    }

    getSecEventApplication(application : number): Observable<SecEventApplication> {
        return this.httpClient.get(`${this.secEventApplicationUrl}/${application}`, {observe: 'response'})
            .pipe(map(response => response.body as SecEventApplication),
                catchError(this.sharedService.handleError))
    }

    getSecEventApplicationsCount(): Observable<number> {
        var url = `${this.secEventApplicationUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSecEventApplication(secEventApplication : SecEventApplication): Observable<any> {
        let body = JSON.stringify(secEventApplication);
        return this.httpClient.post(this.secEventApplicationUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSecEventApplication(secEventApplication : SecEventApplication, application : number): Observable<any> {
        let body = JSON.stringify(secEventApplication);
        return this.httpClient.put(`${this.secEventApplicationUrl}/${application}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSecEventApplication(secEventApplication : SecEventApplication, application : number): Observable<any> {
        let body = JSON.stringify(secEventApplication);
        return this.httpClient.patch(`${this.secEventApplicationUrl}/${application}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSecEventApplication(application : number): Observable<any> {
        return this.httpClient.delete(`${this.secEventApplicationUrl}/${application}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}