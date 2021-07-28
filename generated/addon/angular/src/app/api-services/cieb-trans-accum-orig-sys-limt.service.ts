/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebTransAccumOrigSysLimt } from '../api-models/cieb-trans-accum-orig-sys-limt.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class CiebTransAccumOrigSysLimtService {

    private ciebTransAccumOrigSysLimtUrl: string = `${environment.apiUrl}/ciebtransaccumorigsyslimts`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCiebTransAccumOrigSysLimts(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CiebTransAccumOrigSysLimt[]> {
        var url = `${this.ciebTransAccumOrigSysLimtUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebTransAccumOrigSysLimt[]),
                catchError(this.sharedService.handleError))
    }

    getCiebTransAccumOrigSysLimt(seqSysId : number): Observable<CiebTransAccumOrigSysLimt> {
        return this.httpClient.get(`${this.ciebTransAccumOrigSysLimtUrl}/${seqSysId}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebTransAccumOrigSysLimt),
                catchError(this.sharedService.handleError))
    }

    getCiebTransAccumOrigSysLimtsCount(): Observable<number> {
        var url = `${this.ciebTransAccumOrigSysLimtUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqTransId(seqTransId : number): Observable<CiebTransAccumOrigSysLimt[]> {
        return this.httpClient.get(`${this.ciebTransAccumOrigSysLimtUrl}/find-by-seqtransid/${seqTransId}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebTransAccumOrigSysLimt),
                catchError(this.sharedService.handleError))
    }




    createCiebTransAccumOrigSysLimt(ciebTransAccumOrigSysLimt : CiebTransAccumOrigSysLimt): Observable<any> {
        let body = JSON.stringify(ciebTransAccumOrigSysLimt);
        return this.httpClient.post(this.ciebTransAccumOrigSysLimtUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCiebTransAccumOrigSysLimt(ciebTransAccumOrigSysLimt : CiebTransAccumOrigSysLimt, seqSysId : number): Observable<any> {
        let body = JSON.stringify(ciebTransAccumOrigSysLimt);
        return this.httpClient.put(`${this.ciebTransAccumOrigSysLimtUrl}/${seqSysId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCiebTransAccumOrigSysLimt(ciebTransAccumOrigSysLimt : CiebTransAccumOrigSysLimt, seqSysId : number): Observable<any> {
        let body = JSON.stringify(ciebTransAccumOrigSysLimt);
        return this.httpClient.patch(`${this.ciebTransAccumOrigSysLimtUrl}/${seqSysId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCiebTransAccumOrigSysLimt(seqSysId : number): Observable<any> {
        return this.httpClient.delete(`${this.ciebTransAccumOrigSysLimtUrl}/${seqSysId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}