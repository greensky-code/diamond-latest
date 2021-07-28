/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ApiJobTransactionLog } from '../api-models/api-job-transaction-log.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ApiJobTransactionLogService {

    private apiJobTransactionLogUrl: string = `${environment.apiUrl}/apijobtransactionlogs`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getApiJobTransactionLogs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ApiJobTransactionLog[]> {
        var url = `${this.apiJobTransactionLogUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ApiJobTransactionLog[]),
                catchError(this.sharedService.handleError))
    }

    getApiJobTransactionLog(seqJobId : number): Observable<ApiJobTransactionLog> {
        return this.httpClient.get(`${this.apiJobTransactionLogUrl}/${seqJobId}`, {observe: 'response'})
            .pipe(map(response => response.body as ApiJobTransactionLog),
                catchError(this.sharedService.handleError))
    }

    getApiJobTransactionLogsCount(): Observable<number> {
        var url = `${this.apiJobTransactionLogUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqJobId(seqJobId : number): Observable<ApiJobTransactionLog[]> {
        return this.httpClient.get(`${this.apiJobTransactionLogUrl}/find-by-seqjobid/${seqJobId}`, {observe: 'response'})
            .pipe(map(response => response.body as ApiJobTransactionLog),
                catchError(this.sharedService.handleError))
    }




    createApiJobTransactionLog(apiJobTransactionLog : ApiJobTransactionLog): Observable<any> {
        let body = JSON.stringify(apiJobTransactionLog);
        return this.httpClient.post(this.apiJobTransactionLogUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateApiJobTransactionLog(apiJobTransactionLog : ApiJobTransactionLog, seqJobId : number): Observable<any> {
        let body = JSON.stringify(apiJobTransactionLog);
        return this.httpClient.put(`${this.apiJobTransactionLogUrl}/${seqJobId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateApiJobTransactionLog(apiJobTransactionLog : ApiJobTransactionLog, seqJobId : number): Observable<any> {
        let body = JSON.stringify(apiJobTransactionLog);
        return this.httpClient.patch(`${this.apiJobTransactionLogUrl}/${seqJobId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteApiJobTransactionLog(seqJobId : number): Observable<any> {
        return this.httpClient.delete(`${this.apiJobTransactionLogUrl}/${seqJobId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}