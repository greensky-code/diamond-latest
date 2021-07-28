/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { MessageMasterDtl } from '../api-models/message-master-dtl.model';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { catchError, map } from "rxjs/operators";
import { SharedService } from '../shared/services/shared.service';

@Injectable({
    providedIn: "root"
})
export class MessageMasterDtlService {

    private messageMasterDtlUrl: string = `${environment.apiUrl}/messagemasterdtls`;
    private contentHeaders = new HttpHeaders();

    constructor(private httpClient: HttpClient, private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getMessageMasterDtls(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<MessageMasterDtl[]> {
        var url = `${this.messageMasterDtlUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as MessageMasterDtl[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getMessageMasterDtl(messageId: number): Observable<MessageMasterDtl> {
        return this.httpClient.get(`${this.messageMasterDtlUrl}/${messageId}`, { observe: 'response' })
            .pipe(map(response => response.body as MessageMasterDtl),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getMessageMasterDtlsCount(): Observable<number> {
        var url = `${this.messageMasterDtlUrl}/count`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByMessageId(messageId: number): Observable<MessageMasterDtl[]> {
        return this.httpClient.get(`${this.messageMasterDtlUrl}/find-by-messageid/${messageId}`, { observe: 'response' })
            .pipe(map(response => response.body as MessageMasterDtl),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    createMessageMasterDtl(messageMasterDtl: MessageMasterDtl): Observable<any> {
        let body = JSON.stringify(messageMasterDtl);
        return this.httpClient.post(this.messageMasterDtlUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateMessageMasterDtl(messageMasterDtl: MessageMasterDtl, messageId: number): Observable<any> {
        let body = JSON.stringify(messageMasterDtl);
        return this.httpClient.put(`${this.messageMasterDtlUrl}/${messageId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateMessageMasterDtl(messageMasterDtl: MessageMasterDtl, messageId: number): Observable<any> {
        let body = JSON.stringify(messageMasterDtl);
        return this.httpClient.patch(`${this.messageMasterDtlUrl}/${messageId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteMessageMasterDtl(messageId: number): Observable<any> {
        return this.httpClient.delete(`${this.messageMasterDtlUrl}/${messageId}`, { observe: 'response' })
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
