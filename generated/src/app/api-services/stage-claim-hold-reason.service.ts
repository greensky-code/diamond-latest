/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { StageClaimHoldReason } from '../api-models/stage-claim-hold-reason.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class StageClaimHoldReasonService {

    private stageClaimHoldReasonUrl: string = `${environment.apiUrl}/stageclaimholdreasons`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getStageClaimHoldReasons(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<StageClaimHoldReason[]> {
        var url = `${this.stageClaimHoldReasonUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as StageClaimHoldReason[]),
                catchError(this.sharedService.handleError))
    }

    getStageClaimHoldReason(batchId : string): Observable<StageClaimHoldReason> {
        return this.httpClient.get(`${this.stageClaimHoldReasonUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StageClaimHoldReason),
                catchError(this.sharedService.handleError))
    }

    getStageClaimHoldReasonsCount(): Observable<number> {
        var url = `${this.stageClaimHoldReasonUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createStageClaimHoldReason(stageClaimHoldReason : StageClaimHoldReason): Observable<any> {
        let body = JSON.stringify(stageClaimHoldReason);
        return this.httpClient.post(this.stageClaimHoldReasonUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateStageClaimHoldReason(stageClaimHoldReason : StageClaimHoldReason, batchId : string): Observable<any> {
        let body = JSON.stringify(stageClaimHoldReason);
        return this.httpClient.put(`${this.stageClaimHoldReasonUrl}/${batchId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateStageClaimHoldReason(stageClaimHoldReason : StageClaimHoldReason, batchId : string): Observable<any> {
        let body = JSON.stringify(stageClaimHoldReason);
        return this.httpClient.patch(`${this.stageClaimHoldReasonUrl}/${batchId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteStageClaimHoldReason(batchId : string): Observable<any> {
        return this.httpClient.delete(`${this.stageClaimHoldReasonUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}