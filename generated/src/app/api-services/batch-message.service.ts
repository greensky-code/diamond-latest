/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { BatchMessage } from '../api-models/batch-message.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class BatchMessageService {

    private batchMessageUrl: string = `${environment.apiUrl}/batchmessages`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getBatchMessages(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<BatchMessage[]> {
        var url = `${this.batchMessageUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as BatchMessage[]),
                catchError(this.sharedService.handleError))
    }

    getBatchMessage(seqMessageId : number): Observable<BatchMessage> {
        return this.httpClient.get(`${this.batchMessageUrl}/${seqMessageId}`, {observe: 'response'})
            .pipe(map(response => response.body as BatchMessage),
                catchError(this.sharedService.handleError))
    }

    getBatchMessagesCount(): Observable<number> {
        var url = `${this.batchMessageUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByBatchId(batchId : string): Observable<BatchMessage[]> {
        return this.httpClient.get(`${this.batchMessageUrl}/find-by-batchid/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as BatchMessage),
                catchError(this.sharedService.handleError))
    }




    createBatchMessage(batchMessage : BatchMessage): Observable<any> {
        let body = JSON.stringify(batchMessage);
        return this.httpClient.post(this.batchMessageUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateBatchMessage(batchMessage : BatchMessage, seqMessageId : number): Observable<any> {
        let body = JSON.stringify(batchMessage);
        return this.httpClient.put(`${this.batchMessageUrl}/${seqMessageId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateBatchMessage(batchMessage : BatchMessage, seqMessageId : number): Observable<any> {
        let body = JSON.stringify(batchMessage);
        return this.httpClient.patch(`${this.batchMessageUrl}/${seqMessageId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteBatchMessage(seqMessageId : number): Observable<any> {
        return this.httpClient.delete(`${this.batchMessageUrl}/${seqMessageId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}