/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SmmonthlyentryS } from '../api-models/smmonthlyentry-s.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SmmonthlyentrySService {

    private smmonthlyentrySUrl: string = `${environment.apiUrl}/smmonthlyentryss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSmmonthlyentrySs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SmmonthlyentryS[]> {
        var url = `${this.smmonthlyentrySUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SmmonthlyentryS[]),
                catchError(this.sharedService.handleError))
    }

    getSmmonthlyentryS(namedobjectIdSequenceid : number): Observable<SmmonthlyentryS> {
        return this.httpClient.get(`${this.smmonthlyentrySUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body as SmmonthlyentryS),
                catchError(this.sharedService.handleError))
    }

    getSmmonthlyentrySsCount(): Observable<number> {
        var url = `${this.smmonthlyentrySUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSmmonthlyentryS(smmonthlyentryS : SmmonthlyentryS): Observable<any> {
        let body = JSON.stringify(smmonthlyentryS);
        return this.httpClient.post(this.smmonthlyentrySUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSmmonthlyentryS(smmonthlyentryS : SmmonthlyentryS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smmonthlyentryS);
        return this.httpClient.put(`${this.smmonthlyentrySUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSmmonthlyentryS(smmonthlyentryS : SmmonthlyentryS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smmonthlyentryS);
        return this.httpClient.patch(`${this.smmonthlyentrySUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSmmonthlyentryS(namedobjectIdSequenceid : number): Observable<any> {
        return this.httpClient.delete(`${this.smmonthlyentrySUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}