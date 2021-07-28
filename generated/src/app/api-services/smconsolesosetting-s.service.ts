/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SmconsolesosettingS } from '../api-models/smconsolesosetting-s.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SmconsolesosettingSService {

    private smconsolesosettingSUrl: string = `${environment.apiUrl}/smconsolesosettingss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSmconsolesosettingSs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SmconsolesosettingS[]> {
        var url = `${this.smconsolesosettingSUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SmconsolesosettingS[]),
                catchError(this.sharedService.handleError))
    }

    getSmconsolesosettingS(namedobjectIdSequenceid : number): Observable<SmconsolesosettingS> {
        return this.httpClient.get(`${this.smconsolesosettingSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body as SmconsolesosettingS),
                catchError(this.sharedService.handleError))
    }

    getSmconsolesosettingSsCount(): Observable<number> {
        var url = `${this.smconsolesosettingSUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSmconsolesosettingS(smconsolesosettingS : SmconsolesosettingS): Observable<any> {
        let body = JSON.stringify(smconsolesosettingS);
        return this.httpClient.post(this.smconsolesosettingSUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSmconsolesosettingS(smconsolesosettingS : SmconsolesosettingS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smconsolesosettingS);
        return this.httpClient.put(`${this.smconsolesosettingSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSmconsolesosettingS(smconsolesosettingS : SmconsolesosettingS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smconsolesosettingS);
        return this.httpClient.patch(`${this.smconsolesosettingSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSmconsolesosettingS(namedobjectIdSequenceid : number): Observable<any> {
        return this.httpClient.delete(`${this.smconsolesosettingSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}