/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { StagePremPayCash } from '../api-models/stage-prem-pay-cash.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class StagePremPayCashService {

    private stagePremPayCashUrl: string = `${environment.apiUrl}/stageprempaycashes`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getStagePremPayCashes(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<StagePremPayCash[]> {
        var url = `${this.stagePremPayCashUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as StagePremPayCash[]),
                catchError(this.sharedService.handleError))
    }

    getStagePremPayCash(batchId : string): Observable<StagePremPayCash> {
        return this.httpClient.get(`${this.stagePremPayCashUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StagePremPayCash),
                catchError(this.sharedService.handleError))
    }

    getStagePremPayCashesCount(): Observable<number> {
        var url = `${this.stagePremPayCashUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByBatchId(batchId : string): Observable<StagePremPayCash[]> {
        return this.httpClient.get(`${this.stagePremPayCashUrl}/find-by-batchid/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StagePremPayCash),
                catchError(this.sharedService.handleError))
    }




    createStagePremPayCash(stagePremPayCash : StagePremPayCash): Observable<any> {
        let body = JSON.stringify(stagePremPayCash);
        return this.httpClient.post(this.stagePremPayCashUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateStagePremPayCash(stagePremPayCash : StagePremPayCash, batchId : string): Observable<any> {
        let body = JSON.stringify(stagePremPayCash);
        return this.httpClient.put(`${this.stagePremPayCashUrl}/${batchId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateStagePremPayCash(stagePremPayCash : StagePremPayCash, batchId : string): Observable<any> {
        let body = JSON.stringify(stagePremPayCash);
        return this.httpClient.patch(`${this.stagePremPayCashUrl}/${batchId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteStagePremPayCash(batchId : string): Observable<any> {
        return this.httpClient.delete(`${this.stagePremPayCashUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}