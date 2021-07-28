/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SmactualparameterS } from '../api-models/smactualparameter-s.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SmactualparameterSService {

    private smactualparameterSUrl: string = `${environment.apiUrl}/smactualparameterss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSmactualparameterSs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SmactualparameterS[]> {
        var url = `${this.smactualparameterSUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SmactualparameterS[]),
                catchError(this.sharedService.handleError))
    }

    getSmactualparameterS(namedobjectIdSequenceid : number): Observable<SmactualparameterS> {
        return this.httpClient.get(`${this.smactualparameterSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body as SmactualparameterS),
                catchError(this.sharedService.handleError))
    }

    getSmactualparameterSsCount(): Observable<number> {
        var url = `${this.smactualparameterSUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSmactualparameterS(smactualparameterS : SmactualparameterS): Observable<any> {
        let body = JSON.stringify(smactualparameterS);
        return this.httpClient.post(this.smactualparameterSUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSmactualparameterS(smactualparameterS : SmactualparameterS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smactualparameterS);
        return this.httpClient.put(`${this.smactualparameterSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSmactualparameterS(smactualparameterS : SmactualparameterS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smactualparameterS);
        return this.httpClient.patch(`${this.smactualparameterSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSmactualparameterS(namedobjectIdSequenceid : number): Observable<any> {
        return this.httpClient.delete(`${this.smactualparameterSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}