/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { StageAuthProc } from '../api-models/stage-auth-proc.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class StageAuthProcService {

    private stageAuthProcUrl: string = `${environment.apiUrl}/stageauthprocs`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getStageAuthProcs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<StageAuthProc[]> {
        var url = `${this.stageAuthProcUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as StageAuthProc[]),
                catchError(this.sharedService.handleError))
    }

    getStageAuthProc(batchId : string): Observable<StageAuthProc> {
        return this.httpClient.get(`${this.stageAuthProcUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StageAuthProc),
                catchError(this.sharedService.handleError))
    }

    getStageAuthProcsCount(): Observable<number> {
        var url = `${this.stageAuthProcUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createStageAuthProc(stageAuthProc : StageAuthProc): Observable<any> {
        let body = JSON.stringify(stageAuthProc);
        return this.httpClient.post(this.stageAuthProcUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateStageAuthProc(stageAuthProc : StageAuthProc, batchId : string): Observable<any> {
        let body = JSON.stringify(stageAuthProc);
        return this.httpClient.put(`${this.stageAuthProcUrl}/${batchId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateStageAuthProc(stageAuthProc : StageAuthProc, batchId : string): Observable<any> {
        let body = JSON.stringify(stageAuthProc);
        return this.httpClient.patch(`${this.stageAuthProcUrl}/${batchId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteStageAuthProc(batchId : string): Observable<any> {
        return this.httpClient.delete(`${this.stageAuthProcUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}