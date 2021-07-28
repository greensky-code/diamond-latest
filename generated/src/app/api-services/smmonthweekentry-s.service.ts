/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SmmonthweekentryS } from '../api-models/smmonthweekentry-s.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SmmonthweekentrySService {

    private smmonthweekentrySUrl: string = `${environment.apiUrl}/smmonthweekentryss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSmmonthweekentrySs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SmmonthweekentryS[]> {
        var url = `${this.smmonthweekentrySUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SmmonthweekentryS[]),
                catchError(this.sharedService.handleError))
    }

    getSmmonthweekentryS(namedobjectIdSequenceid : number): Observable<SmmonthweekentryS> {
        return this.httpClient.get(`${this.smmonthweekentrySUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body as SmmonthweekentryS),
                catchError(this.sharedService.handleError))
    }

    getSmmonthweekentrySsCount(): Observable<number> {
        var url = `${this.smmonthweekentrySUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSmmonthweekentryS(smmonthweekentryS : SmmonthweekentryS): Observable<any> {
        let body = JSON.stringify(smmonthweekentryS);
        return this.httpClient.post(this.smmonthweekentrySUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSmmonthweekentryS(smmonthweekentryS : SmmonthweekentryS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smmonthweekentryS);
        return this.httpClient.put(`${this.smmonthweekentrySUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSmmonthweekentryS(smmonthweekentryS : SmmonthweekentryS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smmonthweekentryS);
        return this.httpClient.patch(`${this.smmonthweekentrySUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSmmonthweekentryS(namedobjectIdSequenceid : number): Observable<any> {
        return this.httpClient.delete(`${this.smmonthweekentrySUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}