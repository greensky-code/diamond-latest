/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { BatchMasterOut } from '../api-models/batch-master-out.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class BatchMasterOutService {

    private batchMasterOutUrl: string = `${environment.apiUrl}/batchmasterouts`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getBatchMasterOuts(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<BatchMasterOut[]> {
        var url = `${this.batchMasterOutUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as BatchMasterOut[]),
                catchError(this.sharedService.handleError))
    }

    getBatchMasterOut(batchId : string): Observable<BatchMasterOut> {
        return this.httpClient.get(`${this.batchMasterOutUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as BatchMasterOut),
                catchError(this.sharedService.handleError))
    }

    getBatchMasterOutsCount(): Observable<number> {
        var url = `${this.batchMasterOutUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByBatchId(batchId : string): Observable<BatchMasterOut[]> {
        return this.httpClient.get(`${this.batchMasterOutUrl}/find-by-batchid/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as BatchMasterOut),
                catchError(this.sharedService.handleError))
    }




    createBatchMasterOut(batchMasterOut : BatchMasterOut): Observable<any> {
        let body = JSON.stringify(batchMasterOut);
        return this.httpClient.post(this.batchMasterOutUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateBatchMasterOut(batchMasterOut : BatchMasterOut, batchId : string): Observable<any> {
        let body = JSON.stringify(batchMasterOut);
        return this.httpClient.put(`${this.batchMasterOutUrl}/${batchId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateBatchMasterOut(batchMasterOut : BatchMasterOut, batchId : string): Observable<any> {
        let body = JSON.stringify(batchMasterOut);
        return this.httpClient.patch(`${this.batchMasterOutUrl}/${batchId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteBatchMasterOut(batchId : string): Observable<any> {
        return this.httpClient.delete(`${this.batchMasterOutUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}