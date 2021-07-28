/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SmproductattributeS } from '../api-models/smproductattribute-s.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SmproductattributeSService {

    private smproductattributeSUrl: string = `${environment.apiUrl}/smproductattributess`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSmproductattributeSs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SmproductattributeS[]> {
        var url = `${this.smproductattributeSUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SmproductattributeS[]),
                catchError(this.sharedService.handleError))
    }

    getSmproductattributeS(namedobjectIdSequenceid : number): Observable<SmproductattributeS> {
        return this.httpClient.get(`${this.smproductattributeSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body as SmproductattributeS),
                catchError(this.sharedService.handleError))
    }

    getSmproductattributeSsCount(): Observable<number> {
        var url = `${this.smproductattributeSUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSmproductattributeS(smproductattributeS : SmproductattributeS): Observable<any> {
        let body = JSON.stringify(smproductattributeS);
        return this.httpClient.post(this.smproductattributeSUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSmproductattributeS(smproductattributeS : SmproductattributeS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smproductattributeS);
        return this.httpClient.put(`${this.smproductattributeSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSmproductattributeS(smproductattributeS : SmproductattributeS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smproductattributeS);
        return this.httpClient.patch(`${this.smproductattributeSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSmproductattributeS(namedobjectIdSequenceid : number): Observable<any> {
        return this.httpClient.delete(`${this.smproductattributeSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}