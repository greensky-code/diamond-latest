/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { StageInstDtl } from '../api-models/stage-inst-dtl.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class StageInstDtlService {

    private stageInstDtlUrl: string = `${environment.apiUrl}/stageinstdtls`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getStageInstDtls(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<StageInstDtl[]> {
        var url = `${this.stageInstDtlUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as StageInstDtl[]),
                catchError(this.sharedService.handleError))
    }

    getStageInstDtl(batchId : string): Observable<StageInstDtl> {
        return this.httpClient.get(`${this.stageInstDtlUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StageInstDtl),
                catchError(this.sharedService.handleError))
    }

    getStageInstDtlsCount(): Observable<number> {
        var url = `${this.stageInstDtlUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createStageInstDtl(stageInstDtl : StageInstDtl): Observable<any> {
        let body = JSON.stringify(stageInstDtl);
        return this.httpClient.post(this.stageInstDtlUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateStageInstDtl(stageInstDtl : StageInstDtl, batchId : string): Observable<any> {
        let body = JSON.stringify(stageInstDtl);
        return this.httpClient.put(`${this.stageInstDtlUrl}/${batchId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateStageInstDtl(stageInstDtl : StageInstDtl, batchId : string): Observable<any> {
        let body = JSON.stringify(stageInstDtl);
        return this.httpClient.patch(`${this.stageInstDtlUrl}/${batchId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteStageInstDtl(batchId : string): Observable<any> {
        return this.httpClient.delete(`${this.stageInstDtlUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}