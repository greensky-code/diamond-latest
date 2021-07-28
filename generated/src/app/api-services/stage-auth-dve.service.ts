/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { StageAuthDve } from '../api-models/stage-auth-dve.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class StageAuthDveService {

    private stageAuthDveUrl: string = `${environment.apiUrl}/stageauthdves`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getStageAuthDves(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<StageAuthDve[]> {
        var url = `${this.stageAuthDveUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as StageAuthDve[]),
                catchError(this.sharedService.handleError))
    }

    getStageAuthDve(batchId : string): Observable<StageAuthDve> {
        return this.httpClient.get(`${this.stageAuthDveUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StageAuthDve),
                catchError(this.sharedService.handleError))
    }

    getStageAuthDvesCount(): Observable<number> {
        var url = `${this.stageAuthDveUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createStageAuthDve(stageAuthDve : StageAuthDve): Observable<any> {
        let body = JSON.stringify(stageAuthDve);
        return this.httpClient.post(this.stageAuthDveUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateStageAuthDve(stageAuthDve : StageAuthDve, batchId : string): Observable<any> {
        let body = JSON.stringify(stageAuthDve);
        return this.httpClient.put(`${this.stageAuthDveUrl}/${batchId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateStageAuthDve(stageAuthDve : StageAuthDve, batchId : string): Observable<any> {
        let body = JSON.stringify(stageAuthDve);
        return this.httpClient.patch(`${this.stageAuthDveUrl}/${batchId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteStageAuthDve(batchId : string): Observable<any> {
        return this.httpClient.delete(`${this.stageAuthDveUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}