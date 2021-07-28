/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { BatchStatus } from '../api-models/batch-status.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class BatchStatusService {

    private batchStatusUrl: string = `${environment.apiUrl}/batchstatus`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getBatchStatus(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<BatchStatus[]> {
        var url = `${this.batchStatusUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as BatchStatus[]),
                catchError(this.sharedService.handleError))
    }

    getBatchStatus(status : string): Observable<BatchStatus> {
        return this.httpClient.get(`${this.batchStatusUrl}/${status}`, {observe: 'response'})
            .pipe(map(response => response.body as BatchStatus),
                catchError(this.sharedService.handleError))
    }

    getBatchStatusCount(): Observable<number> {
        var url = `${this.batchStatusUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createBatchStatus(batchStatus : BatchStatus): Observable<any> {
        let body = JSON.stringify(batchStatus);
        return this.httpClient.post(this.batchStatusUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateBatchStatus(batchStatus : BatchStatus, status : string): Observable<any> {
        let body = JSON.stringify(batchStatus);
        return this.httpClient.put(`${this.batchStatusUrl}/${status}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateBatchStatus(batchStatus : BatchStatus, status : string): Observable<any> {
        let body = JSON.stringify(batchStatus);
        return this.httpClient.patch(`${this.batchStatusUrl}/${status}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteBatchStatus(status : string): Observable<any> {
        return this.httpClient.delete(`${this.batchStatusUrl}/${status}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}