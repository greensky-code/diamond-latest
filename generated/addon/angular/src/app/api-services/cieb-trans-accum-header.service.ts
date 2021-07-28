/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebTransAccumHeader } from '../api-models/cieb-trans-accum-header.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class CiebTransAccumHeaderService {

    private ciebTransAccumHeaderUrl: string = `${environment.apiUrl}/ciebtransaccumheaders`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCiebTransAccumHeaders(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CiebTransAccumHeader[]> {
        var url = `${this.ciebTransAccumHeaderUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebTransAccumHeader[]),
                catchError(this.sharedService.handleError))
    }

    getCiebTransAccumHeader(seqTransId : number): Observable<CiebTransAccumHeader> {
        return this.httpClient.get(`${this.ciebTransAccumHeaderUrl}/${seqTransId}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebTransAccumHeader),
                catchError(this.sharedService.handleError))
    }

    getCiebTransAccumHeadersCount(): Observable<number> {
        var url = `${this.ciebTransAccumHeaderUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCiebTransAccumHeader(ciebTransAccumHeader : CiebTransAccumHeader): Observable<any> {
        let body = JSON.stringify(ciebTransAccumHeader);
        return this.httpClient.post(this.ciebTransAccumHeaderUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCiebTransAccumHeader(ciebTransAccumHeader : CiebTransAccumHeader, seqTransId : number): Observable<any> {
        let body = JSON.stringify(ciebTransAccumHeader);
        return this.httpClient.put(`${this.ciebTransAccumHeaderUrl}/${seqTransId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCiebTransAccumHeader(ciebTransAccumHeader : CiebTransAccumHeader, seqTransId : number): Observable<any> {
        let body = JSON.stringify(ciebTransAccumHeader);
        return this.httpClient.patch(`${this.ciebTransAccumHeaderUrl}/${seqTransId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCiebTransAccumHeader(seqTransId : number): Observable<any> {
        return this.httpClient.delete(`${this.ciebTransAccumHeaderUrl}/${seqTransId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}