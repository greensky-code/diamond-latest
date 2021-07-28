/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AlLetterHistory } from '../api-models/al-letter-history.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AlLetterHistoryService {

    private alLetterHistoryUrl: string = `${environment.apiUrl}/alletterhistorys`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAlLetterHistorys(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AlLetterHistory[]> {
        var url = `${this.alLetterHistoryUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AlLetterHistory[]),
                catchError(this.sharedService.handleError))
    }

    getAlLetterHistory(seqLetterHist : number): Observable<AlLetterHistory> {
        return this.httpClient.get(`${this.alLetterHistoryUrl}/${seqLetterHist}`, {observe: 'response'})
            .pipe(map(response => response.body as AlLetterHistory),
                catchError(this.sharedService.handleError))
    }

    getAlLetterHistorysCount(): Observable<number> {
        var url = `${this.alLetterHistoryUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqLetterTempId(seqLetterTempId : number): Observable<AlLetterHistory[]> {
        return this.httpClient.get(`${this.alLetterHistoryUrl}/find-by-seqlettertempid/${seqLetterTempId}`, {observe: 'response'})
            .pipe(map(response => response.body as AlLetterHistory),
                catchError(this.sharedService.handleError))
    }




    createAlLetterHistory(alLetterHistory : AlLetterHistory): Observable<any> {
        let body = JSON.stringify(alLetterHistory);
        return this.httpClient.post(this.alLetterHistoryUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateAlLetterHistory(alLetterHistory : AlLetterHistory, seqLetterHist : number): Observable<any> {
        let body = JSON.stringify(alLetterHistory);
        return this.httpClient.put(`${this.alLetterHistoryUrl}/${seqLetterHist}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateAlLetterHistory(alLetterHistory : AlLetterHistory, seqLetterHist : number): Observable<any> {
        let body = JSON.stringify(alLetterHistory);
        return this.httpClient.patch(`${this.alLetterHistoryUrl}/${seqLetterHist}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteAlLetterHistory(seqLetterHist : number): Observable<any> {
        return this.httpClient.delete(`${this.alLetterHistoryUrl}/${seqLetterHist}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}