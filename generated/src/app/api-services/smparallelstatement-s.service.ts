/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SmparallelstatementS } from '../api-models/smparallelstatement-s.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SmparallelstatementSService {

    private smparallelstatementSUrl: string = `${environment.apiUrl}/smparallelstatementss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSmparallelstatementSs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SmparallelstatementS[]> {
        var url = `${this.smparallelstatementSUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SmparallelstatementS[]),
                catchError(this.sharedService.handleError))
    }

    getSmparallelstatementS(namedobjectIdSequenceid : number): Observable<SmparallelstatementS> {
        return this.httpClient.get(`${this.smparallelstatementSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body as SmparallelstatementS),
                catchError(this.sharedService.handleError))
    }

    getSmparallelstatementSsCount(): Observable<number> {
        var url = `${this.smparallelstatementSUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSmparallelstatementS(smparallelstatementS : SmparallelstatementS): Observable<any> {
        let body = JSON.stringify(smparallelstatementS);
        return this.httpClient.post(this.smparallelstatementSUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSmparallelstatementS(smparallelstatementS : SmparallelstatementS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smparallelstatementS);
        return this.httpClient.put(`${this.smparallelstatementSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSmparallelstatementS(smparallelstatementS : SmparallelstatementS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smparallelstatementS);
        return this.httpClient.patch(`${this.smparallelstatementSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSmparallelstatementS(namedobjectIdSequenceid : number): Observable<any> {
        return this.httpClient.delete(`${this.smparallelstatementSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}