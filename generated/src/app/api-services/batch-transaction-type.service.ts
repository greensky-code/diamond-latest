/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { BatchTransactionType } from '../api-models/batch-transaction-type.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class BatchTransactionTypeService {

    private batchTransactionTypeUrl: string = `${environment.apiUrl}/batchtransactiontypes`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getBatchTransactionTypes(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<BatchTransactionType[]> {
        var url = `${this.batchTransactionTypeUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as BatchTransactionType[]),
                catchError(this.sharedService.handleError))
    }

    getBatchTransactionType(transactionType : string): Observable<BatchTransactionType> {
        return this.httpClient.get(`${this.batchTransactionTypeUrl}/${transactionType}`, {observe: 'response'})
            .pipe(map(response => response.body as BatchTransactionType),
                catchError(this.sharedService.handleError))
    }

    getBatchTransactionTypesCount(): Observable<number> {
        var url = `${this.batchTransactionTypeUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createBatchTransactionType(batchTransactionType : BatchTransactionType): Observable<any> {
        let body = JSON.stringify(batchTransactionType);
        return this.httpClient.post(this.batchTransactionTypeUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateBatchTransactionType(batchTransactionType : BatchTransactionType, transactionType : string): Observable<any> {
        let body = JSON.stringify(batchTransactionType);
        return this.httpClient.put(`${this.batchTransactionTypeUrl}/${transactionType}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateBatchTransactionType(batchTransactionType : BatchTransactionType, transactionType : string): Observable<any> {
        let body = JSON.stringify(batchTransactionType);
        return this.httpClient.patch(`${this.batchTransactionTypeUrl}/${transactionType}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteBatchTransactionType(transactionType : string): Observable<any> {
        return this.httpClient.delete(`${this.batchTransactionTypeUrl}/${transactionType}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}