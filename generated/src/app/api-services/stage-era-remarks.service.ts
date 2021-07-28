/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { StageEraRemarks } from '../api-models/stage-era-remarks.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class StageEraRemarksService {

    private stageEraRemarksUrl: string = `${environment.apiUrl}/stageeraremarkss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getStageEraRemarkss(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<StageEraRemarks[]> {
        var url = `${this.stageEraRemarksUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as StageEraRemarks[]),
                catchError(this.sharedService.handleError))
    }

    getStageEraRemarks(batchId : string): Observable<StageEraRemarks> {
        return this.httpClient.get(`${this.stageEraRemarksUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StageEraRemarks),
                catchError(this.sharedService.handleError))
    }

    getStageEraRemarkssCount(): Observable<number> {
        var url = `${this.stageEraRemarksUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createStageEraRemarks(stageEraRemarks : StageEraRemarks): Observable<any> {
        let body = JSON.stringify(stageEraRemarks);
        return this.httpClient.post(this.stageEraRemarksUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateStageEraRemarks(stageEraRemarks : StageEraRemarks, batchId : string): Observable<any> {
        let body = JSON.stringify(stageEraRemarks);
        return this.httpClient.put(`${this.stageEraRemarksUrl}/${batchId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateStageEraRemarks(stageEraRemarks : StageEraRemarks, batchId : string): Observable<any> {
        let body = JSON.stringify(stageEraRemarks);
        return this.httpClient.patch(`${this.stageEraRemarksUrl}/${batchId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteStageEraRemarks(batchId : string): Observable<any> {
        return this.httpClient.delete(`${this.stageEraRemarksUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}