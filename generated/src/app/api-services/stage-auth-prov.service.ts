/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { StageAuthProv } from '../api-models/stage-auth-prov.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class StageAuthProvService {

    private stageAuthProvUrl: string = `${environment.apiUrl}/stageauthprovs`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getStageAuthProvs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<StageAuthProv[]> {
        var url = `${this.stageAuthProvUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as StageAuthProv[]),
                catchError(this.sharedService.handleError))
    }

    getStageAuthProv(batchId : string): Observable<StageAuthProv> {
        return this.httpClient.get(`${this.stageAuthProvUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StageAuthProv),
                catchError(this.sharedService.handleError))
    }

    getStageAuthProvsCount(): Observable<number> {
        var url = `${this.stageAuthProvUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createStageAuthProv(stageAuthProv : StageAuthProv): Observable<any> {
        let body = JSON.stringify(stageAuthProv);
        return this.httpClient.post(this.stageAuthProvUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateStageAuthProv(stageAuthProv : StageAuthProv, batchId : string): Observable<any> {
        let body = JSON.stringify(stageAuthProv);
        return this.httpClient.put(`${this.stageAuthProvUrl}/${batchId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateStageAuthProv(stageAuthProv : StageAuthProv, batchId : string): Observable<any> {
        let body = JSON.stringify(stageAuthProv);
        return this.httpClient.patch(`${this.stageAuthProvUrl}/${batchId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteStageAuthProv(batchId : string): Observable<any> {
        return this.httpClient.delete(`${this.stageAuthProvUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}