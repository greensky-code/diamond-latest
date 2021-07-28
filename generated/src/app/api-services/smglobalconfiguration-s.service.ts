/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SmglobalconfigurationS } from '../api-models/smglobalconfiguration-s.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SmglobalconfigurationSService {

    private smglobalconfigurationSUrl: string = `${environment.apiUrl}/smglobalconfigurationss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSmglobalconfigurationSs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SmglobalconfigurationS[]> {
        var url = `${this.smglobalconfigurationSUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SmglobalconfigurationS[]),
                catchError(this.sharedService.handleError))
    }

    getSmglobalconfigurationS(namedobjectIdSequenceid : number): Observable<SmglobalconfigurationS> {
        return this.httpClient.get(`${this.smglobalconfigurationSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body as SmglobalconfigurationS),
                catchError(this.sharedService.handleError))
    }

    getSmglobalconfigurationSsCount(): Observable<number> {
        var url = `${this.smglobalconfigurationSUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSmglobalconfigurationS(smglobalconfigurationS : SmglobalconfigurationS): Observable<any> {
        let body = JSON.stringify(smglobalconfigurationS);
        return this.httpClient.post(this.smglobalconfigurationSUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSmglobalconfigurationS(smglobalconfigurationS : SmglobalconfigurationS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smglobalconfigurationS);
        return this.httpClient.put(`${this.smglobalconfigurationSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSmglobalconfigurationS(smglobalconfigurationS : SmglobalconfigurationS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smglobalconfigurationS);
        return this.httpClient.patch(`${this.smglobalconfigurationSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSmglobalconfigurationS(namedobjectIdSequenceid : number): Observable<any> {
        return this.httpClient.delete(`${this.smglobalconfigurationSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}