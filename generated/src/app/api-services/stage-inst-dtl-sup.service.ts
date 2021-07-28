/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { StageInstDtlSup } from '../api-models/stage-inst-dtl-sup.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class StageInstDtlSupService {

    private stageInstDtlSupUrl: string = `${environment.apiUrl}/stageinstdtlsups`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getStageInstDtlSups(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<StageInstDtlSup[]> {
        var url = `${this.stageInstDtlSupUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as StageInstDtlSup[]),
                catchError(this.sharedService.handleError))
    }

    getStageInstDtlSup(batchId : string): Observable<StageInstDtlSup> {
        return this.httpClient.get(`${this.stageInstDtlSupUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StageInstDtlSup),
                catchError(this.sharedService.handleError))
    }

    getStageInstDtlSupsCount(): Observable<number> {
        var url = `${this.stageInstDtlSupUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createStageInstDtlSup(stageInstDtlSup : StageInstDtlSup): Observable<any> {
        let body = JSON.stringify(stageInstDtlSup);
        return this.httpClient.post(this.stageInstDtlSupUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateStageInstDtlSup(stageInstDtlSup : StageInstDtlSup, batchId : string): Observable<any> {
        let body = JSON.stringify(stageInstDtlSup);
        return this.httpClient.put(`${this.stageInstDtlSupUrl}/${batchId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateStageInstDtlSup(stageInstDtlSup : StageInstDtlSup, batchId : string): Observable<any> {
        let body = JSON.stringify(stageInstDtlSup);
        return this.httpClient.patch(`${this.stageInstDtlSupUrl}/${batchId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteStageInstDtlSup(batchId : string): Observable<any> {
        return this.httpClient.delete(`${this.stageInstDtlSupUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}