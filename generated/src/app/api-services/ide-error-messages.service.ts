/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { IdeErrorMessages } from '../api-models/ide-error-messages.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class IdeErrorMessagesService {

    private ideErrorMessagesUrl: string = `${environment.apiUrl}/ideerrormessageses`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getIdeErrorMessageses(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<IdeErrorMessages[]> {
        var url = `${this.ideErrorMessagesUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as IdeErrorMessages[]),
                catchError(this.sharedService.handleError))
    }

    getIdeErrorMessages(seqMessageId : number): Observable<IdeErrorMessages> {
        return this.httpClient.get(`${this.ideErrorMessagesUrl}/${seqMessageId}`, {observe: 'response'})
            .pipe(map(response => response.body as IdeErrorMessages),
                catchError(this.sharedService.handleError))
    }

    getIdeErrorMessagesesCount(): Observable<number> {
        var url = `${this.ideErrorMessagesUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createIdeErrorMessages(ideErrorMessages : IdeErrorMessages): Observable<any> {
        let body = JSON.stringify(ideErrorMessages);
        return this.httpClient.post(this.ideErrorMessagesUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateIdeErrorMessages(ideErrorMessages : IdeErrorMessages, seqMessageId : number): Observable<any> {
        let body = JSON.stringify(ideErrorMessages);
        return this.httpClient.put(`${this.ideErrorMessagesUrl}/${seqMessageId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateIdeErrorMessages(ideErrorMessages : IdeErrorMessages, seqMessageId : number): Observable<any> {
        let body = JSON.stringify(ideErrorMessages);
        return this.httpClient.patch(`${this.ideErrorMessagesUrl}/${seqMessageId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteIdeErrorMessages(seqMessageId : number): Observable<any> {
        return this.httpClient.delete(`${this.ideErrorMessagesUrl}/${seqMessageId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}