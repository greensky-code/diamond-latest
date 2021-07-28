/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SmformalparameterS } from '../api-models/smformalparameter-s.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SmformalparameterSService {

    private smformalparameterSUrl: string = `${environment.apiUrl}/smformalparameterss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSmformalparameterSs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SmformalparameterS[]> {
        var url = `${this.smformalparameterSUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SmformalparameterS[]),
                catchError(this.sharedService.handleError))
    }

    getSmformalparameterS(namedobjectIdSequenceid : number): Observable<SmformalparameterS> {
        return this.httpClient.get(`${this.smformalparameterSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body as SmformalparameterS),
                catchError(this.sharedService.handleError))
    }

    getSmformalparameterSsCount(): Observable<number> {
        var url = `${this.smformalparameterSUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSmformalparameterS(smformalparameterS : SmformalparameterS): Observable<any> {
        let body = JSON.stringify(smformalparameterS);
        return this.httpClient.post(this.smformalparameterSUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSmformalparameterS(smformalparameterS : SmformalparameterS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smformalparameterS);
        return this.httpClient.put(`${this.smformalparameterSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSmformalparameterS(smformalparameterS : SmformalparameterS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smformalparameterS);
        return this.httpClient.patch(`${this.smformalparameterSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSmformalparameterS(namedobjectIdSequenceid : number): Observable<any> {
        return this.httpClient.delete(`${this.smformalparameterSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}