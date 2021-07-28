/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { EdiTransactionLog } from '../api-models/edi-transaction-log.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class EdiTransactionLogService {

    private ediTransactionLogUrl: string = `${environment.apiUrl}/editransactionlogs`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getEdiTransactionLogs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<EdiTransactionLog[]> {
        var url = `${this.ediTransactionLogUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as EdiTransactionLog[]),
                catchError(this.sharedService.handleError))
    }

    getEdiTransactionLog(transactionSetId : string): Observable<EdiTransactionLog> {
        return this.httpClient.get(`${this.ediTransactionLogUrl}/${transactionSetId}`, {observe: 'response'})
            .pipe(map(response => response.body as EdiTransactionLog),
                catchError(this.sharedService.handleError))
    }

    getEdiTransactionLogsCount(): Observable<number> {
        var url = `${this.ediTransactionLogUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createEdiTransactionLog(ediTransactionLog : EdiTransactionLog): Observable<any> {
        let body = JSON.stringify(ediTransactionLog);
        return this.httpClient.post(this.ediTransactionLogUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateEdiTransactionLog(ediTransactionLog : EdiTransactionLog, transactionSetId : string): Observable<any> {
        let body = JSON.stringify(ediTransactionLog);
        return this.httpClient.put(`${this.ediTransactionLogUrl}/${transactionSetId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateEdiTransactionLog(ediTransactionLog : EdiTransactionLog, transactionSetId : string): Observable<any> {
        let body = JSON.stringify(ediTransactionLog);
        return this.httpClient.patch(`${this.ediTransactionLogUrl}/${transactionSetId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteEdiTransactionLog(transactionSetId : string): Observable<any> {
        return this.httpClient.delete(`${this.ediTransactionLogUrl}/${transactionSetId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}