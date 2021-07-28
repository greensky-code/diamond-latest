/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { StageEraCapitation } from '../api-models/stage-era-capitation.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class StageEraCapitationService {

    private stageEraCapitationUrl: string = `${environment.apiUrl}/stageeracapitations`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getStageEraCapitations(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<StageEraCapitation[]> {
        var url = `${this.stageEraCapitationUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as StageEraCapitation[]),
                catchError(this.sharedService.handleError))
    }

    getStageEraCapitation(batchId : string): Observable<StageEraCapitation> {
        return this.httpClient.get(`${this.stageEraCapitationUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StageEraCapitation),
                catchError(this.sharedService.handleError))
    }

    getStageEraCapitationsCount(): Observable<number> {
        var url = `${this.stageEraCapitationUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByBatchId(batchId : string): Observable<StageEraCapitation[]> {
        return this.httpClient.get(`${this.stageEraCapitationUrl}/find-by-batchid/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StageEraCapitation),
                catchError(this.sharedService.handleError))
    }




    createStageEraCapitation(stageEraCapitation : StageEraCapitation): Observable<any> {
        let body = JSON.stringify(stageEraCapitation);
        return this.httpClient.post(this.stageEraCapitationUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateStageEraCapitation(stageEraCapitation : StageEraCapitation, batchId : string): Observable<any> {
        let body = JSON.stringify(stageEraCapitation);
        return this.httpClient.put(`${this.stageEraCapitationUrl}/${batchId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateStageEraCapitation(stageEraCapitation : StageEraCapitation, batchId : string): Observable<any> {
        let body = JSON.stringify(stageEraCapitation);
        return this.httpClient.patch(`${this.stageEraCapitationUrl}/${batchId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteStageEraCapitation(batchId : string): Observable<any> {
        return this.httpClient.delete(`${this.stageEraCapitationUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}