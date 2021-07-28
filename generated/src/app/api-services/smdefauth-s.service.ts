/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SmdefauthS } from '../api-models/smdefauth-s.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SmdefauthSService {

    private smdefauthSUrl: string = `${environment.apiUrl}/smdefauthss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSmdefauthSs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SmdefauthS[]> {
        var url = `${this.smdefauthSUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SmdefauthS[]),
                catchError(this.sharedService.handleError))
    }

    getSmdefauthS(namedobjectIdSequenceid : number): Observable<SmdefauthS> {
        return this.httpClient.get(`${this.smdefauthSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body as SmdefauthS),
                catchError(this.sharedService.handleError))
    }

    getSmdefauthSsCount(): Observable<number> {
        var url = `${this.smdefauthSUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSmdefauthS(smdefauthS : SmdefauthS): Observable<any> {
        let body = JSON.stringify(smdefauthS);
        return this.httpClient.post(this.smdefauthSUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSmdefauthS(smdefauthS : SmdefauthS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smdefauthS);
        return this.httpClient.put(`${this.smdefauthSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSmdefauthS(smdefauthS : SmdefauthS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smdefauthS);
        return this.httpClient.patch(`${this.smdefauthSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSmdefauthS(namedobjectIdSequenceid : number): Observable<any> {
        return this.httpClient.delete(`${this.smdefauthSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}