/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { StageClaimNdc } from '../api-models/stage-claim-ndc.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class StageClaimNdcService {

    private stageClaimNdcUrl: string = `${environment.apiUrl}/stageclaimndcs`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getStageClaimNdcs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<StageClaimNdc[]> {
        var url = `${this.stageClaimNdcUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as StageClaimNdc[]),
                catchError(this.sharedService.handleError))
    }

    getStageClaimNdc(batchId : string): Observable<StageClaimNdc> {
        return this.httpClient.get(`${this.stageClaimNdcUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StageClaimNdc),
                catchError(this.sharedService.handleError))
    }

    getStageClaimNdcsCount(): Observable<number> {
        var url = `${this.stageClaimNdcUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createStageClaimNdc(stageClaimNdc : StageClaimNdc): Observable<any> {
        let body = JSON.stringify(stageClaimNdc);
        return this.httpClient.post(this.stageClaimNdcUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateStageClaimNdc(stageClaimNdc : StageClaimNdc, batchId : string): Observable<any> {
        let body = JSON.stringify(stageClaimNdc);
        return this.httpClient.put(`${this.stageClaimNdcUrl}/${batchId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateStageClaimNdc(stageClaimNdc : StageClaimNdc, batchId : string): Observable<any> {
        let body = JSON.stringify(stageClaimNdc);
        return this.httpClient.patch(`${this.stageClaimNdcUrl}/${batchId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteStageClaimNdc(batchId : string): Observable<any> {
        return this.httpClient.delete(`${this.stageClaimNdcUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}