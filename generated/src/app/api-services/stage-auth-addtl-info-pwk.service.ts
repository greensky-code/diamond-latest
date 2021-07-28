/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { StageAuthAddtlInfoPwk } from '../api-models/stage-auth-addtl-info-pwk.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class StageAuthAddtlInfoPwkService {

    private stageAuthAddtlInfoPwkUrl: string = `${environment.apiUrl}/stageauthaddtlinfopwks`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getStageAuthAddtlInfoPwks(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<StageAuthAddtlInfoPwk[]> {
        var url = `${this.stageAuthAddtlInfoPwkUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as StageAuthAddtlInfoPwk[]),
                catchError(this.sharedService.handleError))
    }

    getStageAuthAddtlInfoPwk(batchId : string): Observable<StageAuthAddtlInfoPwk> {
        return this.httpClient.get(`${this.stageAuthAddtlInfoPwkUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StageAuthAddtlInfoPwk),
                catchError(this.sharedService.handleError))
    }

    getStageAuthAddtlInfoPwksCount(): Observable<number> {
        var url = `${this.stageAuthAddtlInfoPwkUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createStageAuthAddtlInfoPwk(stageAuthAddtlInfoPwk : StageAuthAddtlInfoPwk): Observable<any> {
        let body = JSON.stringify(stageAuthAddtlInfoPwk);
        return this.httpClient.post(this.stageAuthAddtlInfoPwkUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateStageAuthAddtlInfoPwk(stageAuthAddtlInfoPwk : StageAuthAddtlInfoPwk, batchId : string): Observable<any> {
        let body = JSON.stringify(stageAuthAddtlInfoPwk);
        return this.httpClient.put(`${this.stageAuthAddtlInfoPwkUrl}/${batchId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateStageAuthAddtlInfoPwk(stageAuthAddtlInfoPwk : StageAuthAddtlInfoPwk, batchId : string): Observable<any> {
        let body = JSON.stringify(stageAuthAddtlInfoPwk);
        return this.httpClient.patch(`${this.stageAuthAddtlInfoPwkUrl}/${batchId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteStageAuthAddtlInfoPwk(batchId : string): Observable<any> {
        return this.httpClient.delete(`${this.stageAuthAddtlInfoPwkUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}