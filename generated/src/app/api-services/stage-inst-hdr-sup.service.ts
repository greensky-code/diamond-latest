/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { StageInstHdrSup } from '../api-models/stage-inst-hdr-sup.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class StageInstHdrSupService {

    private stageInstHdrSupUrl: string = `${environment.apiUrl}/stageinsthdrsups`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getStageInstHdrSups(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<StageInstHdrSup[]> {
        var url = `${this.stageInstHdrSupUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as StageInstHdrSup[]),
                catchError(this.sharedService.handleError))
    }

    getStageInstHdrSup(batchId : string): Observable<StageInstHdrSup> {
        return this.httpClient.get(`${this.stageInstHdrSupUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StageInstHdrSup),
                catchError(this.sharedService.handleError))
    }

    getStageInstHdrSupsCount(): Observable<number> {
        var url = `${this.stageInstHdrSupUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createStageInstHdrSup(stageInstHdrSup : StageInstHdrSup): Observable<any> {
        let body = JSON.stringify(stageInstHdrSup);
        return this.httpClient.post(this.stageInstHdrSupUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateStageInstHdrSup(stageInstHdrSup : StageInstHdrSup, batchId : string): Observable<any> {
        let body = JSON.stringify(stageInstHdrSup);
        return this.httpClient.put(`${this.stageInstHdrSupUrl}/${batchId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateStageInstHdrSup(stageInstHdrSup : StageInstHdrSup, batchId : string): Observable<any> {
        let body = JSON.stringify(stageInstHdrSup);
        return this.httpClient.patch(`${this.stageInstHdrSupUrl}/${batchId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteStageInstHdrSup(batchId : string): Observable<any> {
        return this.httpClient.delete(`${this.stageInstHdrSupUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}