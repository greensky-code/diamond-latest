/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SmreleaseS } from '../api-models/smrelease-s.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SmreleaseSService {

    private smreleaseSUrl: string = `${environment.apiUrl}/smreleasess`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSmreleaseSs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SmreleaseS[]> {
        var url = `${this.smreleaseSUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SmreleaseS[]),
                catchError(this.sharedService.handleError))
    }

    getSmreleaseS(namedobjectIdSequenceid : number): Observable<SmreleaseS> {
        return this.httpClient.get(`${this.smreleaseSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body as SmreleaseS),
                catchError(this.sharedService.handleError))
    }

    getSmreleaseSsCount(): Observable<number> {
        var url = `${this.smreleaseSUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSmreleaseS(smreleaseS : SmreleaseS): Observable<any> {
        let body = JSON.stringify(smreleaseS);
        return this.httpClient.post(this.smreleaseSUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSmreleaseS(smreleaseS : SmreleaseS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smreleaseS);
        return this.httpClient.put(`${this.smreleaseSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSmreleaseS(smreleaseS : SmreleaseS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smreleaseS);
        return this.httpClient.patch(`${this.smreleaseSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSmreleaseS(namedobjectIdSequenceid : number): Observable<any> {
        return this.httpClient.delete(`${this.smreleaseSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}