/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { StageClaimOc } from '../api-models/stage-claim-oc.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class StageClaimOcService {

    private stageClaimOcUrl: string = `${environment.apiUrl}/stageclaimocs`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getStageClaimOcs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<StageClaimOc[]> {
        var url = `${this.stageClaimOcUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as StageClaimOc[]),
                catchError(this.sharedService.handleError))
    }

    getStageClaimOc(batchId : string): Observable<StageClaimOc> {
        return this.httpClient.get(`${this.stageClaimOcUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StageClaimOc),
                catchError(this.sharedService.handleError))
    }

    getStageClaimOcsCount(): Observable<number> {
        var url = `${this.stageClaimOcUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createStageClaimOc(stageClaimOc : StageClaimOc): Observable<any> {
        let body = JSON.stringify(stageClaimOc);
        return this.httpClient.post(this.stageClaimOcUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateStageClaimOc(stageClaimOc : StageClaimOc, batchId : string): Observable<any> {
        let body = JSON.stringify(stageClaimOc);
        return this.httpClient.put(`${this.stageClaimOcUrl}/${batchId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateStageClaimOc(stageClaimOc : StageClaimOc, batchId : string): Observable<any> {
        let body = JSON.stringify(stageClaimOc);
        return this.httpClient.patch(`${this.stageClaimOcUrl}/${batchId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteStageClaimOc(batchId : string): Observable<any> {
        return this.httpClient.delete(`${this.stageClaimOcUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}