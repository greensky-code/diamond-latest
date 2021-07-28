/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SmhostauthS } from '../api-models/smhostauth-s.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SmhostauthSService {

    private smhostauthSUrl: string = `${environment.apiUrl}/smhostauthss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSmhostauthSs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SmhostauthS[]> {
        var url = `${this.smhostauthSUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SmhostauthS[]),
                catchError(this.sharedService.handleError))
    }

    getSmhostauthS(namedobjectIdSequenceid : number): Observable<SmhostauthS> {
        return this.httpClient.get(`${this.smhostauthSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body as SmhostauthS),
                catchError(this.sharedService.handleError))
    }

    getSmhostauthSsCount(): Observable<number> {
        var url = `${this.smhostauthSUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSmhostauthS(smhostauthS : SmhostauthS): Observable<any> {
        let body = JSON.stringify(smhostauthS);
        return this.httpClient.post(this.smhostauthSUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSmhostauthS(smhostauthS : SmhostauthS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smhostauthS);
        return this.httpClient.put(`${this.smhostauthSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSmhostauthS(smhostauthS : SmhostauthS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smhostauthS);
        return this.httpClient.patch(`${this.smhostauthSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSmhostauthS(namedobjectIdSequenceid : number): Observable<any> {
        return this.httpClient.delete(`${this.smhostauthSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}