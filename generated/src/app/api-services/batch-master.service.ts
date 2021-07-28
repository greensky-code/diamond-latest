/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { BatchMaster } from '../api-models/batch-master.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class BatchMasterService {

    private batchMasterUrl: string = `${environment.apiUrl}/batchmasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getBatchMasters(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<BatchMaster[]> {
        var url = `${this.batchMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as BatchMaster[]),
                catchError(this.sharedService.handleError))
    }

    getBatchMaster(batchId : string): Observable<BatchMaster> {
        return this.httpClient.get(`${this.batchMasterUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as BatchMaster),
                catchError(this.sharedService.handleError))
    }

    getBatchMastersCount(): Observable<number> {
        var url = `${this.batchMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByTransactionType(transactionType : string): Observable<BatchMaster[]> {
        return this.httpClient.get(`${this.batchMasterUrl}/find-by-transactiontype/${transactionType}`, {observe: 'response'})
            .pipe(map(response => response.body as BatchMaster),
                catchError(this.sharedService.handleError))
    }
    findByTradingPartnerId(tradingPartnerId : string): Observable<BatchMaster[]> {
        return this.httpClient.get(`${this.batchMasterUrl}/find-by-tradingpartnerid/${tradingPartnerId}`, {observe: 'response'})
            .pipe(map(response => response.body as BatchMaster),
                catchError(this.sharedService.handleError))
    }
    findByStatus(status : string): Observable<BatchMaster[]> {
        return this.httpClient.get(`${this.batchMasterUrl}/find-by-status/${status}`, {observe: 'response'})
            .pipe(map(response => response.body as BatchMaster),
                catchError(this.sharedService.handleError))
    }




    createBatchMaster(batchMaster : BatchMaster): Observable<any> {
        let body = JSON.stringify(batchMaster);
        return this.httpClient.post(this.batchMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateBatchMaster(batchMaster : BatchMaster, batchId : string): Observable<any> {
        let body = JSON.stringify(batchMaster);
        return this.httpClient.put(`${this.batchMasterUrl}/${batchId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateBatchMaster(batchMaster : BatchMaster, batchId : string): Observable<any> {
        let body = JSON.stringify(batchMaster);
        return this.httpClient.patch(`${this.batchMasterUrl}/${batchId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteBatchMaster(batchId : string): Observable<any> {
        return this.httpClient.delete(`${this.batchMasterUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}