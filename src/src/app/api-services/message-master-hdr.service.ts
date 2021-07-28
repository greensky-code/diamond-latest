/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { MessageMasterHdr } from '../api-models/message-master-hdr.model';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class MessageMasterHdrService {

    private messageMasterHdrUrl: string = `${environment.apiUrl}/messagemasterhdrs`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient: HttpClient, private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getMessageMasterHdrs(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<MessageMasterHdr[]> {
        var url = `${this.messageMasterHdrUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as MessageMasterHdr[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getMessageMasterHdr(messageId: number): Observable<MessageMasterHdr> {
        return this.httpClient.get(`${this.messageMasterHdrUrl}/${messageId}`, { observe: 'response' })
            .pipe(map(response => response.body as MessageMasterHdr),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getMessageMasterHdrsCount(): Observable<number> {
        var url = `${this.messageMasterHdrUrl}/count`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    createMessageMasterHdr(messageMasterHdr: MessageMasterHdr): Observable<any> {
        let body = JSON.stringify(messageMasterHdr);
        return this.httpClient.post(this.messageMasterHdrUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateMessageMasterHdr(messageMasterHdr: MessageMasterHdr, messageId: number): Observable<any> {
        let body = JSON.stringify(messageMasterHdr);
        return this.httpClient.put(`${this.messageMasterHdrUrl}/${messageId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateMessageMasterHdr(messageMasterHdr: MessageMasterHdr, messageId: number): Observable<any> {
        let body = JSON.stringify(messageMasterHdr);
        return this.httpClient.patch(`${this.messageMasterHdrUrl}/${messageId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteMessageMasterHdr(messageId: number): Observable<any> {
        return this.httpClient.delete(`${this.messageMasterHdrUrl}/${messageId}`, { observe: 'response' })
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
