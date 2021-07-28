/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { StageClaimDtlRemarks } from '../api-models/stage-claim-dtl-remarks.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class StageClaimDtlRemarksService {

    private stageClaimDtlRemarksUrl: string = `${environment.apiUrl}/stageclaimdtlremarkss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getStageClaimDtlRemarkss(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<StageClaimDtlRemarks[]> {
        var url = `${this.stageClaimDtlRemarksUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as StageClaimDtlRemarks[]),
                catchError(this.sharedService.handleError))
    }

    getStageClaimDtlRemarks(batchId : string): Observable<StageClaimDtlRemarks> {
        return this.httpClient.get(`${this.stageClaimDtlRemarksUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StageClaimDtlRemarks),
                catchError(this.sharedService.handleError))
    }

    getStageClaimDtlRemarkssCount(): Observable<number> {
        var url = `${this.stageClaimDtlRemarksUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createStageClaimDtlRemarks(stageClaimDtlRemarks : StageClaimDtlRemarks): Observable<any> {
        let body = JSON.stringify(stageClaimDtlRemarks);
        return this.httpClient.post(this.stageClaimDtlRemarksUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateStageClaimDtlRemarks(stageClaimDtlRemarks : StageClaimDtlRemarks, batchId : string): Observable<any> {
        let body = JSON.stringify(stageClaimDtlRemarks);
        return this.httpClient.put(`${this.stageClaimDtlRemarksUrl}/${batchId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateStageClaimDtlRemarks(stageClaimDtlRemarks : StageClaimDtlRemarks, batchId : string): Observable<any> {
        let body = JSON.stringify(stageClaimDtlRemarks);
        return this.httpClient.patch(`${this.stageClaimDtlRemarksUrl}/${batchId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteStageClaimDtlRemarks(batchId : string): Observable<any> {
        return this.httpClient.delete(`${this.stageClaimDtlRemarksUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}