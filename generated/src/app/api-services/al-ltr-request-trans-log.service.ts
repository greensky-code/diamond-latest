/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AlLtrRequestTransLog } from '../api-models/al-ltr-request-trans-log.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AlLtrRequestTransLogService {

    private alLtrRequestTransLogUrl: string = `${environment.apiUrl}/alltrrequesttranslogs`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAlLtrRequestTransLogs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AlLtrRequestTransLog[]> {
        var url = `${this.alLtrRequestTransLogUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AlLtrRequestTransLog[]),
                catchError(this.sharedService.handleError))
    }

    getAlLtrRequestTransLog(seqLetterRequestId : number): Observable<AlLtrRequestTransLog> {
        return this.httpClient.get(`${this.alLtrRequestTransLogUrl}/${seqLetterRequestId}`, {observe: 'response'})
            .pipe(map(response => response.body as AlLtrRequestTransLog),
                catchError(this.sharedService.handleError))
    }

    getAlLtrRequestTransLogsCount(): Observable<number> {
        var url = `${this.alLtrRequestTransLogUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqLetterRequestId(seqLetterRequestId : number): Observable<AlLtrRequestTransLog[]> {
        return this.httpClient.get(`${this.alLtrRequestTransLogUrl}/find-by-seqletterrequestid/${seqLetterRequestId}`, {observe: 'response'})
            .pipe(map(response => response.body as AlLtrRequestTransLog),
                catchError(this.sharedService.handleError))
    }




    createAlLtrRequestTransLog(alLtrRequestTransLog : AlLtrRequestTransLog): Observable<any> {
        let body = JSON.stringify(alLtrRequestTransLog);
        return this.httpClient.post(this.alLtrRequestTransLogUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateAlLtrRequestTransLog(alLtrRequestTransLog : AlLtrRequestTransLog, seqLetterRequestId : number): Observable<any> {
        let body = JSON.stringify(alLtrRequestTransLog);
        return this.httpClient.put(`${this.alLtrRequestTransLogUrl}/${seqLetterRequestId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateAlLtrRequestTransLog(alLtrRequestTransLog : AlLtrRequestTransLog, seqLetterRequestId : number): Observable<any> {
        let body = JSON.stringify(alLtrRequestTransLog);
        return this.httpClient.patch(`${this.alLtrRequestTransLogUrl}/${seqLetterRequestId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteAlLtrRequestTransLog(seqLetterRequestId : number): Observable<any> {
        return this.httpClient.delete(`${this.alLtrRequestTransLogUrl}/${seqLetterRequestId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}