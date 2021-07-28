/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SmproductS } from '../api-models/smproduct-s.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SmproductSService {

    private smproductSUrl: string = `${environment.apiUrl}/smproductss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSmproductSs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SmproductS[]> {
        var url = `${this.smproductSUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SmproductS[]),
                catchError(this.sharedService.handleError))
    }

    getSmproductS(namedobjectIdSequenceid : number): Observable<SmproductS> {
        return this.httpClient.get(`${this.smproductSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body as SmproductS),
                catchError(this.sharedService.handleError))
    }

    getSmproductSsCount(): Observable<number> {
        var url = `${this.smproductSUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSmproductS(smproductS : SmproductS): Observable<any> {
        let body = JSON.stringify(smproductS);
        return this.httpClient.post(this.smproductSUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSmproductS(smproductS : SmproductS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smproductS);
        return this.httpClient.put(`${this.smproductSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSmproductS(smproductS : SmproductS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smproductS);
        return this.httpClient.patch(`${this.smproductSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSmproductS(namedobjectIdSequenceid : number): Observable<any> {
        return this.httpClient.delete(`${this.smproductSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}