/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { StageAuthAppeal } from '../api-models/stage-auth-appeal.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class StageAuthAppealService {

    private stageAuthAppealUrl: string = `${environment.apiUrl}/stageauthappeals`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getStageAuthAppeals(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<StageAuthAppeal[]> {
        var url = `${this.stageAuthAppealUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as StageAuthAppeal[]),
                catchError(this.sharedService.handleError))
    }

    getStageAuthAppeal(batchId : string): Observable<StageAuthAppeal> {
        return this.httpClient.get(`${this.stageAuthAppealUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StageAuthAppeal),
                catchError(this.sharedService.handleError))
    }

    getStageAuthAppealsCount(): Observable<number> {
        var url = `${this.stageAuthAppealUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createStageAuthAppeal(stageAuthAppeal : StageAuthAppeal): Observable<any> {
        let body = JSON.stringify(stageAuthAppeal);
        return this.httpClient.post(this.stageAuthAppealUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateStageAuthAppeal(stageAuthAppeal : StageAuthAppeal, batchId : string): Observable<any> {
        let body = JSON.stringify(stageAuthAppeal);
        return this.httpClient.put(`${this.stageAuthAppealUrl}/${batchId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateStageAuthAppeal(stageAuthAppeal : StageAuthAppeal, batchId : string): Observable<any> {
        let body = JSON.stringify(stageAuthAppeal);
        return this.httpClient.patch(`${this.stageAuthAppealUrl}/${batchId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteStageAuthAppeal(batchId : string): Observable<any> {
        return this.httpClient.delete(`${this.stageAuthAppealUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}