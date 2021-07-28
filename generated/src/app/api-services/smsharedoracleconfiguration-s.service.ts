/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SmsharedoracleconfigurationS } from '../api-models/smsharedoracleconfiguration-s.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SmsharedoracleconfigurationSService {

    private smsharedoracleconfigurationSUrl: string = `${environment.apiUrl}/smsharedoracleconfigurationss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSmsharedoracleconfigurationSs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SmsharedoracleconfigurationS[]> {
        var url = `${this.smsharedoracleconfigurationSUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SmsharedoracleconfigurationS[]),
                catchError(this.sharedService.handleError))
    }

    getSmsharedoracleconfigurationS(namedobjectIdSequenceid : number): Observable<SmsharedoracleconfigurationS> {
        return this.httpClient.get(`${this.smsharedoracleconfigurationSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body as SmsharedoracleconfigurationS),
                catchError(this.sharedService.handleError))
    }

    getSmsharedoracleconfigurationSsCount(): Observable<number> {
        var url = `${this.smsharedoracleconfigurationSUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSmsharedoracleconfigurationS(smsharedoracleconfigurationS : SmsharedoracleconfigurationS): Observable<any> {
        let body = JSON.stringify(smsharedoracleconfigurationS);
        return this.httpClient.post(this.smsharedoracleconfigurationSUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSmsharedoracleconfigurationS(smsharedoracleconfigurationS : SmsharedoracleconfigurationS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smsharedoracleconfigurationS);
        return this.httpClient.put(`${this.smsharedoracleconfigurationSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSmsharedoracleconfigurationS(smsharedoracleconfigurationS : SmsharedoracleconfigurationS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smsharedoracleconfigurationS);
        return this.httpClient.patch(`${this.smsharedoracleconfigurationSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSmsharedoracleconfigurationS(namedobjectIdSequenceid : number): Observable<any> {
        return this.httpClient.delete(`${this.smsharedoracleconfigurationSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}