/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { StageDnclmDtl } from '../api-models/stage-dnclm-dtl.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class StageDnclmDtlService {

    private stageDnclmDtlUrl: string = `${environment.apiUrl}/stagednclmdtls`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getStageDnclmDtls(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<StageDnclmDtl[]> {
        var url = `${this.stageDnclmDtlUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as StageDnclmDtl[]),
                catchError(this.sharedService.handleError))
    }

    getStageDnclmDtl(batchId : string): Observable<StageDnclmDtl> {
        return this.httpClient.get(`${this.stageDnclmDtlUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StageDnclmDtl),
                catchError(this.sharedService.handleError))
    }

    getStageDnclmDtlsCount(): Observable<number> {
        var url = `${this.stageDnclmDtlUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createStageDnclmDtl(stageDnclmDtl : StageDnclmDtl): Observable<any> {
        let body = JSON.stringify(stageDnclmDtl);
        return this.httpClient.post(this.stageDnclmDtlUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateStageDnclmDtl(stageDnclmDtl : StageDnclmDtl, batchId : string): Observable<any> {
        let body = JSON.stringify(stageDnclmDtl);
        return this.httpClient.put(`${this.stageDnclmDtlUrl}/${batchId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateStageDnclmDtl(stageDnclmDtl : StageDnclmDtl, batchId : string): Observable<any> {
        let body = JSON.stringify(stageDnclmDtl);
        return this.httpClient.patch(`${this.stageDnclmDtlUrl}/${batchId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteStageDnclmDtl(batchId : string): Observable<any> {
        return this.httpClient.delete(`${this.stageDnclmDtlUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}