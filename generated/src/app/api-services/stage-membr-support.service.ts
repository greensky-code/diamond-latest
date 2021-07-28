/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { StageMembrSupport } from '../api-models/stage-membr-support.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class StageMembrSupportService {

    private stageMembrSupportUrl: string = `${environment.apiUrl}/stagemembrsupports`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getStageMembrSupports(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<StageMembrSupport[]> {
        var url = `${this.stageMembrSupportUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as StageMembrSupport[]),
                catchError(this.sharedService.handleError))
    }

    getStageMembrSupport(batchId : string): Observable<StageMembrSupport> {
        return this.httpClient.get(`${this.stageMembrSupportUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StageMembrSupport),
                catchError(this.sharedService.handleError))
    }

    getStageMembrSupportsCount(): Observable<number> {
        var url = `${this.stageMembrSupportUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createStageMembrSupport(stageMembrSupport : StageMembrSupport): Observable<any> {
        let body = JSON.stringify(stageMembrSupport);
        return this.httpClient.post(this.stageMembrSupportUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateStageMembrSupport(stageMembrSupport : StageMembrSupport, batchId : string): Observable<any> {
        let body = JSON.stringify(stageMembrSupport);
        return this.httpClient.put(`${this.stageMembrSupportUrl}/${batchId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateStageMembrSupport(stageMembrSupport : StageMembrSupport, batchId : string): Observable<any> {
        let body = JSON.stringify(stageMembrSupport);
        return this.httpClient.patch(`${this.stageMembrSupportUrl}/${batchId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteStageMembrSupport(batchId : string): Observable<any> {
        return this.httpClient.delete(`${this.stageMembrSupportUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}