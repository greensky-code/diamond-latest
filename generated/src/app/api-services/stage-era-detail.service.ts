/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { StageEraDetail } from '../api-models/stage-era-detail.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class StageEraDetailService {

    private stageEraDetailUrl: string = `${environment.apiUrl}/stageeradetails`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getStageEraDetails(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<StageEraDetail[]> {
        var url = `${this.stageEraDetailUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as StageEraDetail[]),
                catchError(this.sharedService.handleError))
    }

    getStageEraDetail(batchId : string): Observable<StageEraDetail> {
        return this.httpClient.get(`${this.stageEraDetailUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StageEraDetail),
                catchError(this.sharedService.handleError))
    }

    getStageEraDetailsCount(): Observable<number> {
        var url = `${this.stageEraDetailUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createStageEraDetail(stageEraDetail : StageEraDetail): Observable<any> {
        let body = JSON.stringify(stageEraDetail);
        return this.httpClient.post(this.stageEraDetailUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateStageEraDetail(stageEraDetail : StageEraDetail, batchId : string): Observable<any> {
        let body = JSON.stringify(stageEraDetail);
        return this.httpClient.put(`${this.stageEraDetailUrl}/${batchId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateStageEraDetail(stageEraDetail : StageEraDetail, batchId : string): Observable<any> {
        let body = JSON.stringify(stageEraDetail);
        return this.httpClient.patch(`${this.stageEraDetailUrl}/${batchId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteStageEraDetail(batchId : string): Observable<any> {
        return this.httpClient.delete(`${this.stageEraDetailUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}