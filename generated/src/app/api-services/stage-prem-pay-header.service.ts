/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { StagePremPayHeader } from '../api-models/stage-prem-pay-header.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class StagePremPayHeaderService {

    private stagePremPayHeaderUrl: string = `${environment.apiUrl}/stageprempayheaders`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getStagePremPayHeaders(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<StagePremPayHeader[]> {
        var url = `${this.stagePremPayHeaderUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as StagePremPayHeader[]),
                catchError(this.sharedService.handleError))
    }

    getStagePremPayHeader(batchId : string): Observable<StagePremPayHeader> {
        return this.httpClient.get(`${this.stagePremPayHeaderUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StagePremPayHeader),
                catchError(this.sharedService.handleError))
    }

    getStagePremPayHeadersCount(): Observable<number> {
        var url = `${this.stagePremPayHeaderUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByBatchId(batchId : string): Observable<StagePremPayHeader[]> {
        return this.httpClient.get(`${this.stagePremPayHeaderUrl}/find-by-batchid/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StagePremPayHeader),
                catchError(this.sharedService.handleError))
    }




    createStagePremPayHeader(stagePremPayHeader : StagePremPayHeader): Observable<any> {
        let body = JSON.stringify(stagePremPayHeader);
        return this.httpClient.post(this.stagePremPayHeaderUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateStagePremPayHeader(stagePremPayHeader : StagePremPayHeader, batchId : string): Observable<any> {
        let body = JSON.stringify(stagePremPayHeader);
        return this.httpClient.put(`${this.stagePremPayHeaderUrl}/${batchId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateStagePremPayHeader(stagePremPayHeader : StagePremPayHeader, batchId : string): Observable<any> {
        let body = JSON.stringify(stagePremPayHeader);
        return this.httpClient.patch(`${this.stagePremPayHeaderUrl}/${batchId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteStagePremPayHeader(batchId : string): Observable<any> {
        return this.httpClient.delete(`${this.stagePremPayHeaderUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}