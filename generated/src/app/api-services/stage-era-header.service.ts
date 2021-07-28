/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { StageEraHeader } from '../api-models/stage-era-header.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class StageEraHeaderService {

    private stageEraHeaderUrl: string = `${environment.apiUrl}/stageeraheaders`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getStageEraHeaders(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<StageEraHeader[]> {
        var url = `${this.stageEraHeaderUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as StageEraHeader[]),
                catchError(this.sharedService.handleError))
    }

    getStageEraHeader(batchId : string): Observable<StageEraHeader> {
        return this.httpClient.get(`${this.stageEraHeaderUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StageEraHeader),
                catchError(this.sharedService.handleError))
    }

    getStageEraHeadersCount(): Observable<number> {
        var url = `${this.stageEraHeaderUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByBatchId(batchId : string): Observable<StageEraHeader[]> {
        return this.httpClient.get(`${this.stageEraHeaderUrl}/find-by-batchid/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StageEraHeader),
                catchError(this.sharedService.handleError))
    }




    createStageEraHeader(stageEraHeader : StageEraHeader): Observable<any> {
        let body = JSON.stringify(stageEraHeader);
        return this.httpClient.post(this.stageEraHeaderUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateStageEraHeader(stageEraHeader : StageEraHeader, batchId : string): Observable<any> {
        let body = JSON.stringify(stageEraHeader);
        return this.httpClient.put(`${this.stageEraHeaderUrl}/${batchId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateStageEraHeader(stageEraHeader : StageEraHeader, batchId : string): Observable<any> {
        let body = JSON.stringify(stageEraHeader);
        return this.httpClient.patch(`${this.stageEraHeaderUrl}/${batchId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteStageEraHeader(batchId : string): Observable<any> {
        return this.httpClient.delete(`${this.stageEraHeaderUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}