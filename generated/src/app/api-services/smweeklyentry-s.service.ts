/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SmweeklyentryS } from '../api-models/smweeklyentry-s.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SmweeklyentrySService {

    private smweeklyentrySUrl: string = `${environment.apiUrl}/smweeklyentryss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSmweeklyentrySs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SmweeklyentryS[]> {
        var url = `${this.smweeklyentrySUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SmweeklyentryS[]),
                catchError(this.sharedService.handleError))
    }

    getSmweeklyentryS(namedobjectIdSequenceid : number): Observable<SmweeklyentryS> {
        return this.httpClient.get(`${this.smweeklyentrySUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body as SmweeklyentryS),
                catchError(this.sharedService.handleError))
    }

    getSmweeklyentrySsCount(): Observable<number> {
        var url = `${this.smweeklyentrySUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSmweeklyentryS(smweeklyentryS : SmweeklyentryS): Observable<any> {
        let body = JSON.stringify(smweeklyentryS);
        return this.httpClient.post(this.smweeklyentrySUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSmweeklyentryS(smweeklyentryS : SmweeklyentryS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smweeklyentryS);
        return this.httpClient.put(`${this.smweeklyentrySUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSmweeklyentryS(smweeklyentryS : SmweeklyentryS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smweeklyentryS);
        return this.httpClient.patch(`${this.smweeklyentrySUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSmweeklyentryS(namedobjectIdSequenceid : number): Observable<any> {
        return this.httpClient.delete(`${this.smweeklyentrySUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}