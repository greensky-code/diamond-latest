/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { StageAuthProvSupport } from '../api-models/stage-auth-prov-support.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class StageAuthProvSupportService {

    private stageAuthProvSupportUrl: string = `${environment.apiUrl}/stageauthprovsupports`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getStageAuthProvSupports(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<StageAuthProvSupport[]> {
        var url = `${this.stageAuthProvSupportUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as StageAuthProvSupport[]),
                catchError(this.sharedService.handleError))
    }

    getStageAuthProvSupport(batchId : string): Observable<StageAuthProvSupport> {
        return this.httpClient.get(`${this.stageAuthProvSupportUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StageAuthProvSupport),
                catchError(this.sharedService.handleError))
    }

    getStageAuthProvSupportsCount(): Observable<number> {
        var url = `${this.stageAuthProvSupportUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createStageAuthProvSupport(stageAuthProvSupport : StageAuthProvSupport): Observable<any> {
        let body = JSON.stringify(stageAuthProvSupport);
        return this.httpClient.post(this.stageAuthProvSupportUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateStageAuthProvSupport(stageAuthProvSupport : StageAuthProvSupport, batchId : string): Observable<any> {
        let body = JSON.stringify(stageAuthProvSupport);
        return this.httpClient.put(`${this.stageAuthProvSupportUrl}/${batchId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateStageAuthProvSupport(stageAuthProvSupport : StageAuthProvSupport, batchId : string): Observable<any> {
        let body = JSON.stringify(stageAuthProvSupport);
        return this.httpClient.patch(`${this.stageAuthProvSupportUrl}/${batchId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteStageAuthProvSupport(batchId : string): Observable<any> {
        return this.httpClient.delete(`${this.stageAuthProvSupportUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}