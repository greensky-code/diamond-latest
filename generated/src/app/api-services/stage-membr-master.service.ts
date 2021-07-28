/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { StageMembrMaster } from '../api-models/stage-membr-master.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class StageMembrMasterService {

    private stageMembrMasterUrl: string = `${environment.apiUrl}/stagemembrmasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getStageMembrMasters(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<StageMembrMaster[]> {
        var url = `${this.stageMembrMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as StageMembrMaster[]),
                catchError(this.sharedService.handleError))
    }

    getStageMembrMaster(batchId : string): Observable<StageMembrMaster> {
        return this.httpClient.get(`${this.stageMembrMasterUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StageMembrMaster),
                catchError(this.sharedService.handleError))
    }

    getStageMembrMastersCount(): Observable<number> {
        var url = `${this.stageMembrMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByBatchId(batchId : string): Observable<StageMembrMaster[]> {
        return this.httpClient.get(`${this.stageMembrMasterUrl}/find-by-batchid/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StageMembrMaster),
                catchError(this.sharedService.handleError))
    }




    createStageMembrMaster(stageMembrMaster : StageMembrMaster): Observable<any> {
        let body = JSON.stringify(stageMembrMaster);
        return this.httpClient.post(this.stageMembrMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateStageMembrMaster(stageMembrMaster : StageMembrMaster, batchId : string): Observable<any> {
        let body = JSON.stringify(stageMembrMaster);
        return this.httpClient.put(`${this.stageMembrMasterUrl}/${batchId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateStageMembrMaster(stageMembrMaster : StageMembrMaster, batchId : string): Observable<any> {
        let body = JSON.stringify(stageMembrMaster);
        return this.httpClient.patch(`${this.stageMembrMasterUrl}/${batchId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteStageMembrMaster(batchId : string): Observable<any> {
        return this.httpClient.delete(`${this.stageMembrMasterUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}