/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { StageMembrElig } from '../api-models/stage-membr-elig.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class StageMembrEligService {

    private stageMembrEligUrl: string = `${environment.apiUrl}/stagemembreligs`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getStageMembrEligs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<StageMembrElig[]> {
        var url = `${this.stageMembrEligUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as StageMembrElig[]),
                catchError(this.sharedService.handleError))
    }

    getStageMembrElig(batchId : string): Observable<StageMembrElig> {
        return this.httpClient.get(`${this.stageMembrEligUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StageMembrElig),
                catchError(this.sharedService.handleError))
    }

    getStageMembrEligsCount(): Observable<number> {
        var url = `${this.stageMembrEligUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createStageMembrElig(stageMembrElig : StageMembrElig): Observable<any> {
        let body = JSON.stringify(stageMembrElig);
        return this.httpClient.post(this.stageMembrEligUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateStageMembrElig(stageMembrElig : StageMembrElig, batchId : string): Observable<any> {
        let body = JSON.stringify(stageMembrElig);
        return this.httpClient.put(`${this.stageMembrEligUrl}/${batchId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateStageMembrElig(stageMembrElig : StageMembrElig, batchId : string): Observable<any> {
        let body = JSON.stringify(stageMembrElig);
        return this.httpClient.patch(`${this.stageMembrEligUrl}/${batchId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteStageMembrElig(batchId : string): Observable<any> {
        return this.httpClient.delete(`${this.stageMembrEligUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}