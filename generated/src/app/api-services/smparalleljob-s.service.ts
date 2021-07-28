/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SmparalleljobS } from '../api-models/smparalleljob-s.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SmparalleljobSService {

    private smparalleljobSUrl: string = `${environment.apiUrl}/smparalleljobss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSmparalleljobSs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SmparalleljobS[]> {
        var url = `${this.smparalleljobSUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SmparalleljobS[]),
                catchError(this.sharedService.handleError))
    }

    getSmparalleljobS(namedobjectIdSequenceid : number): Observable<SmparalleljobS> {
        return this.httpClient.get(`${this.smparalleljobSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body as SmparalleljobS),
                catchError(this.sharedService.handleError))
    }

    getSmparalleljobSsCount(): Observable<number> {
        var url = `${this.smparalleljobSUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSmparalleljobS(smparalleljobS : SmparalleljobS): Observable<any> {
        let body = JSON.stringify(smparalleljobS);
        return this.httpClient.post(this.smparalleljobSUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSmparalleljobS(smparalleljobS : SmparalleljobS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smparalleljobS);
        return this.httpClient.put(`${this.smparalleljobSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSmparalleljobS(smparalleljobS : SmparalleljobS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smparalleljobS);
        return this.httpClient.patch(`${this.smparalleljobSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSmparalleljobS(namedobjectIdSequenceid : number): Observable<any> {
        return this.httpClient.delete(`${this.smparalleljobSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}