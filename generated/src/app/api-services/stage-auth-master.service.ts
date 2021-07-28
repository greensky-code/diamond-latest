/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { StageAuthMaster } from '../api-models/stage-auth-master.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class StageAuthMasterService {

    private stageAuthMasterUrl: string = `${environment.apiUrl}/stageauthmasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getStageAuthMasters(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<StageAuthMaster[]> {
        var url = `${this.stageAuthMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as StageAuthMaster[]),
                catchError(this.sharedService.handleError))
    }

    getStageAuthMaster(batchId : string): Observable<StageAuthMaster> {
        return this.httpClient.get(`${this.stageAuthMasterUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StageAuthMaster),
                catchError(this.sharedService.handleError))
    }

    getStageAuthMastersCount(): Observable<number> {
        var url = `${this.stageAuthMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByBatchId(batchId : string): Observable<StageAuthMaster[]> {
        return this.httpClient.get(`${this.stageAuthMasterUrl}/find-by-batchid/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StageAuthMaster),
                catchError(this.sharedService.handleError))
    }
    findByBatchId(batchId : string): Observable<StageAuthMaster[]> {
        return this.httpClient.get(`${this.stageAuthMasterUrl}/find-by-batchid/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StageAuthMaster),
                catchError(this.sharedService.handleError))
    }




    createStageAuthMaster(stageAuthMaster : StageAuthMaster): Observable<any> {
        let body = JSON.stringify(stageAuthMaster);
        return this.httpClient.post(this.stageAuthMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateStageAuthMaster(stageAuthMaster : StageAuthMaster, batchId : string): Observable<any> {
        let body = JSON.stringify(stageAuthMaster);
        return this.httpClient.put(`${this.stageAuthMasterUrl}/${batchId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateStageAuthMaster(stageAuthMaster : StageAuthMaster, batchId : string): Observable<any> {
        let body = JSON.stringify(stageAuthMaster);
        return this.httpClient.patch(`${this.stageAuthMasterUrl}/${batchId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteStageAuthMaster(batchId : string): Observable<any> {
        return this.httpClient.delete(`${this.stageAuthMasterUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}