/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SmrunS } from '../api-models/smrun-s.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SmrunSService {

    private smrunSUrl: string = `${environment.apiUrl}/smrunss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSmrunSs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SmrunS[]> {
        var url = `${this.smrunSUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SmrunS[]),
                catchError(this.sharedService.handleError))
    }

    getSmrunS(namedobjectIdSequenceid : number): Observable<SmrunS> {
        return this.httpClient.get(`${this.smrunSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body as SmrunS),
                catchError(this.sharedService.handleError))
    }

    getSmrunSsCount(): Observable<number> {
        var url = `${this.smrunSUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSmrunS(smrunS : SmrunS): Observable<any> {
        let body = JSON.stringify(smrunS);
        return this.httpClient.post(this.smrunSUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSmrunS(smrunS : SmrunS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smrunS);
        return this.httpClient.put(`${this.smrunSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSmrunS(smrunS : SmrunS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smrunS);
        return this.httpClient.patch(`${this.smrunSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSmrunS(namedobjectIdSequenceid : number): Observable<any> {
        return this.httpClient.delete(`${this.smrunSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}