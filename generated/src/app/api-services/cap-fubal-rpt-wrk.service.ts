/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CapFubalRptWrk } from '../api-models/cap-fubal-rpt-wrk.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CapFubalRptWrkService {

    private capFubalRptWrkUrl: string = `${environment.apiUrl}/capfubalrptwrks`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCapFubalRptWrks(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CapFubalRptWrk[]> {
        var url = `${this.capFubalRptWrkUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CapFubalRptWrk[]),
                catchError(this.sharedService.handleError))
    }

    getCapFubalRptWrk(seqCapFubalRptWrk : number): Observable<CapFubalRptWrk> {
        return this.httpClient.get(`${this.capFubalRptWrkUrl}/${seqCapFubalRptWrk}`, {observe: 'response'})
            .pipe(map(response => response.body as CapFubalRptWrk),
                catchError(this.sharedService.handleError))
    }

    getCapFubalRptWrksCount(): Observable<number> {
        var url = `${this.capFubalRptWrkUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCapFubalRptWrk(capFubalRptWrk : CapFubalRptWrk): Observable<any> {
        let body = JSON.stringify(capFubalRptWrk);
        return this.httpClient.post(this.capFubalRptWrkUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCapFubalRptWrk(capFubalRptWrk : CapFubalRptWrk, seqCapFubalRptWrk : number): Observable<any> {
        let body = JSON.stringify(capFubalRptWrk);
        return this.httpClient.put(`${this.capFubalRptWrkUrl}/${seqCapFubalRptWrk}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCapFubalRptWrk(capFubalRptWrk : CapFubalRptWrk, seqCapFubalRptWrk : number): Observable<any> {
        let body = JSON.stringify(capFubalRptWrk);
        return this.httpClient.patch(`${this.capFubalRptWrkUrl}/${seqCapFubalRptWrk}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCapFubalRptWrk(seqCapFubalRptWrk : number): Observable<any> {
        return this.httpClient.delete(`${this.capFubalRptWrkUrl}/${seqCapFubalRptWrk}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}