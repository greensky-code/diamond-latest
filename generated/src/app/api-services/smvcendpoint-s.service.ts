/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SmvcendpointS } from '../api-models/smvcendpoint-s.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SmvcendpointSService {

    private smvcendpointSUrl: string = `${environment.apiUrl}/smvcendpointss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSmvcendpointSs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SmvcendpointS[]> {
        var url = `${this.smvcendpointSUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SmvcendpointS[]),
                catchError(this.sharedService.handleError))
    }

    getSmvcendpointS(namedobjectIdSequenceid : number): Observable<SmvcendpointS> {
        return this.httpClient.get(`${this.smvcendpointSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body as SmvcendpointS),
                catchError(this.sharedService.handleError))
    }

    getSmvcendpointSsCount(): Observable<number> {
        var url = `${this.smvcendpointSUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSmvcendpointS(smvcendpointS : SmvcendpointS): Observable<any> {
        let body = JSON.stringify(smvcendpointS);
        return this.httpClient.post(this.smvcendpointSUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSmvcendpointS(smvcendpointS : SmvcendpointS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smvcendpointS);
        return this.httpClient.put(`${this.smvcendpointSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSmvcendpointS(smvcendpointS : SmvcendpointS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smvcendpointS);
        return this.httpClient.patch(`${this.smvcendpointSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSmvcendpointS(namedobjectIdSequenceid : number): Observable<any> {
        return this.httpClient.delete(`${this.smvcendpointSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}