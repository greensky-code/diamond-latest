/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { LetterHistory } from '../api-models/letter-history.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class LetterHistoryService {

    private letterHistoryUrl: string = `${environment.apiUrl}/letterhistorys`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getLetterHistorys(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<LetterHistory[]> {
        var url = `${this.letterHistoryUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as LetterHistory[]),
                catchError(this.sharedService.handleError))
    }

    getLetterHistory(seqLetterHist : number): Observable<LetterHistory> {
        return this.httpClient.get(`${this.letterHistoryUrl}/${seqLetterHist}`, {observe: 'response'})
            .pipe(map(response => response.body as LetterHistory),
                catchError(this.sharedService.handleError))
    }

    getLetterHistorysCount(): Observable<number> {
        var url = `${this.letterHistoryUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqVendId(seqVendId : number): Observable<LetterHistory[]> {
        return this.httpClient.get(`${this.letterHistoryUrl}/find-by-seqvendid/${seqVendId}`, {observe: 'response'})
            .pipe(map(response => response.body as LetterHistory),
                catchError(this.sharedService.handleError))
    }
    findBySeqGroupId(seqGroupId : number): Observable<LetterHistory[]> {
        return this.httpClient.get(`${this.letterHistoryUrl}/find-by-seqgroupid/${seqGroupId}`, {observe: 'response'})
            .pipe(map(response => response.body as LetterHistory),
                catchError(this.sharedService.handleError))
    }
    findBySeqMembId(seqMembId : number): Observable<LetterHistory[]> {
        return this.httpClient.get(`${this.letterHistoryUrl}/find-by-seqmembid/${seqMembId}`, {observe: 'response'})
            .pipe(map(response => response.body as LetterHistory),
                catchError(this.sharedService.handleError))
    }
    findBySeqProvId(seqProvId : number): Observable<LetterHistory[]> {
        return this.httpClient.get(`${this.letterHistoryUrl}/find-by-seqprovid/${seqProvId}`, {observe: 'response'})
            .pipe(map(response => response.body as LetterHistory),
                catchError(this.sharedService.handleError))
    }




    createLetterHistory(letterHistory : LetterHistory): Observable<any> {
        let body = JSON.stringify(letterHistory);
        return this.httpClient.post(this.letterHistoryUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateLetterHistory(letterHistory : LetterHistory, seqLetterHist : number): Observable<any> {
        let body = JSON.stringify(letterHistory);
        return this.httpClient.put(`${this.letterHistoryUrl}/${seqLetterHist}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateLetterHistory(letterHistory : LetterHistory, seqLetterHist : number): Observable<any> {
        let body = JSON.stringify(letterHistory);
        return this.httpClient.patch(`${this.letterHistoryUrl}/${seqLetterHist}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteLetterHistory(seqLetterHist : number): Observable<any> {
        return this.httpClient.delete(`${this.letterHistoryUrl}/${seqLetterHist}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}