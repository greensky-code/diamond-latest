/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CapCputlRptTmpWrk } from '../api-models/cap-cputl-rpt-tmp-wrk.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CapCputlRptTmpWrkService {

    private capCputlRptTmpWrkUrl: string = `${environment.apiUrl}/capcputlrpttmpwrks`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCapCputlRptTmpWrks(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CapCputlRptTmpWrk[]> {
        var url = `${this.capCputlRptTmpWrkUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CapCputlRptTmpWrk[]),
                catchError(this.sharedService.handleError))
    }

    getCapCputlRptTmpWrk(seqCapCputlRptTmpWrk : number): Observable<CapCputlRptTmpWrk> {
        return this.httpClient.get(`${this.capCputlRptTmpWrkUrl}/${seqCapCputlRptTmpWrk}`, {observe: 'response'})
            .pipe(map(response => response.body as CapCputlRptTmpWrk),
                catchError(this.sharedService.handleError))
    }

    getCapCputlRptTmpWrksCount(): Observable<number> {
        var url = `${this.capCputlRptTmpWrkUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCapCputlRptTmpWrk(capCputlRptTmpWrk : CapCputlRptTmpWrk): Observable<any> {
        let body = JSON.stringify(capCputlRptTmpWrk);
        return this.httpClient.post(this.capCputlRptTmpWrkUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCapCputlRptTmpWrk(capCputlRptTmpWrk : CapCputlRptTmpWrk, seqCapCputlRptTmpWrk : number): Observable<any> {
        let body = JSON.stringify(capCputlRptTmpWrk);
        return this.httpClient.put(`${this.capCputlRptTmpWrkUrl}/${seqCapCputlRptTmpWrk}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCapCputlRptTmpWrk(capCputlRptTmpWrk : CapCputlRptTmpWrk, seqCapCputlRptTmpWrk : number): Observable<any> {
        let body = JSON.stringify(capCputlRptTmpWrk);
        return this.httpClient.patch(`${this.capCputlRptTmpWrkUrl}/${seqCapCputlRptTmpWrk}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCapCputlRptTmpWrk(seqCapCputlRptTmpWrk : number): Observable<any> {
        return this.httpClient.delete(`${this.capCputlRptTmpWrkUrl}/${seqCapCputlRptTmpWrk}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}