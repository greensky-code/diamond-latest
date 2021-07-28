/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { StageAuthAdvisor } from '../api-models/stage-auth-advisor.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class StageAuthAdvisorService {

    private stageAuthAdvisorUrl: string = `${environment.apiUrl}/stageauthadvisors`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getStageAuthAdvisors(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<StageAuthAdvisor[]> {
        var url = `${this.stageAuthAdvisorUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as StageAuthAdvisor[]),
                catchError(this.sharedService.handleError))
    }

    getStageAuthAdvisor(batchId : string): Observable<StageAuthAdvisor> {
        return this.httpClient.get(`${this.stageAuthAdvisorUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StageAuthAdvisor),
                catchError(this.sharedService.handleError))
    }

    getStageAuthAdvisorsCount(): Observable<number> {
        var url = `${this.stageAuthAdvisorUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createStageAuthAdvisor(stageAuthAdvisor : StageAuthAdvisor): Observable<any> {
        let body = JSON.stringify(stageAuthAdvisor);
        return this.httpClient.post(this.stageAuthAdvisorUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateStageAuthAdvisor(stageAuthAdvisor : StageAuthAdvisor, batchId : string): Observable<any> {
        let body = JSON.stringify(stageAuthAdvisor);
        return this.httpClient.put(`${this.stageAuthAdvisorUrl}/${batchId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateStageAuthAdvisor(stageAuthAdvisor : StageAuthAdvisor, batchId : string): Observable<any> {
        let body = JSON.stringify(stageAuthAdvisor);
        return this.httpClient.patch(`${this.stageAuthAdvisorUrl}/${batchId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteStageAuthAdvisor(batchId : string): Observable<any> {
        return this.httpClient.delete(`${this.stageAuthAdvisorUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}