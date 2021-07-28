/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { StageAuthMasterSupport } from '../api-models/stage-auth-master-support.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class StageAuthMasterSupportService {

    private stageAuthMasterSupportUrl: string = `${environment.apiUrl}/stageauthmastersupports`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getStageAuthMasterSupports(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<StageAuthMasterSupport[]> {
        var url = `${this.stageAuthMasterSupportUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as StageAuthMasterSupport[]),
                catchError(this.sharedService.handleError))
    }

    getStageAuthMasterSupport(batchId : string): Observable<StageAuthMasterSupport> {
        return this.httpClient.get(`${this.stageAuthMasterSupportUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StageAuthMasterSupport),
                catchError(this.sharedService.handleError))
    }

    getStageAuthMasterSupportsCount(): Observable<number> {
        var url = `${this.stageAuthMasterSupportUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createStageAuthMasterSupport(stageAuthMasterSupport : StageAuthMasterSupport): Observable<any> {
        let body = JSON.stringify(stageAuthMasterSupport);
        return this.httpClient.post(this.stageAuthMasterSupportUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateStageAuthMasterSupport(stageAuthMasterSupport : StageAuthMasterSupport, batchId : string): Observable<any> {
        let body = JSON.stringify(stageAuthMasterSupport);
        return this.httpClient.put(`${this.stageAuthMasterSupportUrl}/${batchId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateStageAuthMasterSupport(stageAuthMasterSupport : StageAuthMasterSupport, batchId : string): Observable<any> {
        let body = JSON.stringify(stageAuthMasterSupport);
        return this.httpClient.patch(`${this.stageAuthMasterSupportUrl}/${batchId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteStageAuthMasterSupport(batchId : string): Observable<any> {
        return this.httpClient.delete(`${this.stageAuthMasterSupportUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}