/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SmomstringS } from '../api-models/smomstring-s.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SmomstringSService {

    private smomstringSUrl: string = `${environment.apiUrl}/smomstringss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSmomstringSs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SmomstringS[]> {
        var url = `${this.smomstringSUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SmomstringS[]),
                catchError(this.sharedService.handleError))
    }

    getSmomstringS(namedobjectIdSequenceid : number): Observable<SmomstringS> {
        return this.httpClient.get(`${this.smomstringSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body as SmomstringS),
                catchError(this.sharedService.handleError))
    }

    getSmomstringSsCount(): Observable<number> {
        var url = `${this.smomstringSUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSmomstringS(smomstringS : SmomstringS): Observable<any> {
        let body = JSON.stringify(smomstringS);
        return this.httpClient.post(this.smomstringSUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSmomstringS(smomstringS : SmomstringS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smomstringS);
        return this.httpClient.put(`${this.smomstringSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSmomstringS(smomstringS : SmomstringS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smomstringS);
        return this.httpClient.patch(`${this.smomstringSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSmomstringS(namedobjectIdSequenceid : number): Observable<any> {
        return this.httpClient.delete(`${this.smomstringSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}