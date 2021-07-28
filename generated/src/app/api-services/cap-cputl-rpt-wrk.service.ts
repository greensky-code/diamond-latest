/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CapCputlRptWrk } from '../api-models/cap-cputl-rpt-wrk.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CapCputlRptWrkService {

    private capCputlRptWrkUrl: string = `${environment.apiUrl}/capcputlrptwrks`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCapCputlRptWrks(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CapCputlRptWrk[]> {
        var url = `${this.capCputlRptWrkUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CapCputlRptWrk[]),
                catchError(this.sharedService.handleError))
    }

    getCapCputlRptWrk(seqCapCputlRptWrk : number): Observable<CapCputlRptWrk> {
        return this.httpClient.get(`${this.capCputlRptWrkUrl}/${seqCapCputlRptWrk}`, {observe: 'response'})
            .pipe(map(response => response.body as CapCputlRptWrk),
                catchError(this.sharedService.handleError))
    }

    getCapCputlRptWrksCount(): Observable<number> {
        var url = `${this.capCputlRptWrkUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCapCputlRptWrk(capCputlRptWrk : CapCputlRptWrk): Observable<any> {
        let body = JSON.stringify(capCputlRptWrk);
        return this.httpClient.post(this.capCputlRptWrkUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCapCputlRptWrk(capCputlRptWrk : CapCputlRptWrk, seqCapCputlRptWrk : number): Observable<any> {
        let body = JSON.stringify(capCputlRptWrk);
        return this.httpClient.put(`${this.capCputlRptWrkUrl}/${seqCapCputlRptWrk}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCapCputlRptWrk(capCputlRptWrk : CapCputlRptWrk, seqCapCputlRptWrk : number): Observable<any> {
        let body = JSON.stringify(capCputlRptWrk);
        return this.httpClient.patch(`${this.capCputlRptWrkUrl}/${seqCapCputlRptWrk}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCapCputlRptWrk(seqCapCputlRptWrk : number): Observable<any> {
        return this.httpClient.delete(`${this.capCputlRptWrkUrl}/${seqCapCputlRptWrk}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}