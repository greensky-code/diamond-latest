/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SmsharedoracleclientS } from '../api-models/smsharedoracleclient-s.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SmsharedoracleclientSService {

    private smsharedoracleclientSUrl: string = `${environment.apiUrl}/smsharedoracleclientss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSmsharedoracleclientSs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SmsharedoracleclientS[]> {
        var url = `${this.smsharedoracleclientSUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SmsharedoracleclientS[]),
                catchError(this.sharedService.handleError))
    }

    getSmsharedoracleclientS(namedobjectIdSequenceid : number): Observable<SmsharedoracleclientS> {
        return this.httpClient.get(`${this.smsharedoracleclientSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body as SmsharedoracleclientS),
                catchError(this.sharedService.handleError))
    }

    getSmsharedoracleclientSsCount(): Observable<number> {
        var url = `${this.smsharedoracleclientSUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSmsharedoracleclientS(smsharedoracleclientS : SmsharedoracleclientS): Observable<any> {
        let body = JSON.stringify(smsharedoracleclientS);
        return this.httpClient.post(this.smsharedoracleclientSUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSmsharedoracleclientS(smsharedoracleclientS : SmsharedoracleclientS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smsharedoracleclientS);
        return this.httpClient.put(`${this.smsharedoracleclientSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSmsharedoracleclientS(smsharedoracleclientS : SmsharedoracleclientS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smsharedoracleclientS);
        return this.httpClient.patch(`${this.smsharedoracleclientSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSmsharedoracleclientS(namedobjectIdSequenceid : number): Observable<any> {
        return this.httpClient.delete(`${this.smsharedoracleclientSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}