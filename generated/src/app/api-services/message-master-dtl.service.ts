/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { MessageMasterDtl } from '../api-models/message-master-dtl.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class MessageMasterDtlService {

    private messageMasterDtlUrl: string = `${environment.apiUrl}/messagemasterdtls`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getMessageMasterDtls(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<MessageMasterDtl[]> {
        var url = `${this.messageMasterDtlUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as MessageMasterDtl[]),
                catchError(this.sharedService.handleError))
    }

    getMessageMasterDtl(messageId : number): Observable<MessageMasterDtl> {
        return this.httpClient.get(`${this.messageMasterDtlUrl}/${messageId}`, {observe: 'response'})
            .pipe(map(response => response.body as MessageMasterDtl),
                catchError(this.sharedService.handleError))
    }

    getMessageMasterDtlsCount(): Observable<number> {
        var url = `${this.messageMasterDtlUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByMessageId(messageId : number): Observable<MessageMasterDtl[]> {
        return this.httpClient.get(`${this.messageMasterDtlUrl}/find-by-messageid/${messageId}`, {observe: 'response'})
            .pipe(map(response => response.body as MessageMasterDtl),
                catchError(this.sharedService.handleError))
    }




    createMessageMasterDtl(messageMasterDtl : MessageMasterDtl): Observable<any> {
        let body = JSON.stringify(messageMasterDtl);
        return this.httpClient.post(this.messageMasterDtlUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateMessageMasterDtl(messageMasterDtl : MessageMasterDtl, messageId : number): Observable<any> {
        let body = JSON.stringify(messageMasterDtl);
        return this.httpClient.put(`${this.messageMasterDtlUrl}/${messageId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateMessageMasterDtl(messageMasterDtl : MessageMasterDtl, messageId : number): Observable<any> {
        let body = JSON.stringify(messageMasterDtl);
        return this.httpClient.patch(`${this.messageMasterDtlUrl}/${messageId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteMessageMasterDtl(messageId : number): Observable<any> {
        return this.httpClient.delete(`${this.messageMasterDtlUrl}/${messageId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}