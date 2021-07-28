/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CodereviewResult } from '../api-models/codereview-result.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CodereviewResultService {

    private codereviewResultUrl: string = `${environment.apiUrl}/codereviewresults`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCodereviewResults(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CodereviewResult[]> {
        var url = `${this.codereviewResultUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CodereviewResult[]),
                catchError(this.sharedService.handleError))
    }

    getCodereviewResult(seqClaimResultCode : number): Observable<CodereviewResult> {
        return this.httpClient.get(`${this.codereviewResultUrl}/${seqClaimResultCode}`, {observe: 'response'})
            .pipe(map(response => response.body as CodereviewResult),
                catchError(this.sharedService.handleError))
    }

    getCodereviewResultsCount(): Observable<number> {
        var url = `${this.codereviewResultUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqClaimResultCode(seqClaimResultCode : number): Observable<CodereviewResult[]> {
        return this.httpClient.get(`${this.codereviewResultUrl}/find-by-seqclaimresultcode/${seqClaimResultCode}`, {observe: 'response'})
            .pipe(map(response => response.body as CodereviewResult),
                catchError(this.sharedService.handleError))
    }




    createCodereviewResult(codereviewResult : CodereviewResult): Observable<any> {
        let body = JSON.stringify(codereviewResult);
        return this.httpClient.post(this.codereviewResultUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCodereviewResult(codereviewResult : CodereviewResult, seqClaimResultCode : number): Observable<any> {
        let body = JSON.stringify(codereviewResult);
        return this.httpClient.put(`${this.codereviewResultUrl}/${seqClaimResultCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCodereviewResult(codereviewResult : CodereviewResult, seqClaimResultCode : number): Observable<any> {
        let body = JSON.stringify(codereviewResult);
        return this.httpClient.patch(`${this.codereviewResultUrl}/${seqClaimResultCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCodereviewResult(seqClaimResultCode : number): Observable<any> {
        return this.httpClient.delete(`${this.codereviewResultUrl}/${seqClaimResultCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}