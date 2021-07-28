/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CheckPostSummaryWork } from '../api-models/check-post-summary-work.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CheckPostSummaryWorkService {

    private checkPostSummaryWorkUrl: string = `${environment.apiUrl}/checkpostsummaryworks`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCheckPostSummaryWorks(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CheckPostSummaryWork[]> {
        var url = `${this.checkPostSummaryWorkUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CheckPostSummaryWork[]),
                catchError(this.sharedService.handleError))
    }

    getCheckPostSummaryWork(seqCkprtId : number): Observable<CheckPostSummaryWork> {
        return this.httpClient.get(`${this.checkPostSummaryWorkUrl}/${seqCkprtId}`, {observe: 'response'})
            .pipe(map(response => response.body as CheckPostSummaryWork),
                catchError(this.sharedService.handleError))
    }

    getCheckPostSummaryWorksCount(): Observable<number> {
        var url = `${this.checkPostSummaryWorkUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByCompanyCode(companyCode : string): Observable<CheckPostSummaryWork[]> {
        return this.httpClient.get(`${this.checkPostSummaryWorkUrl}/find-by-companycode/${companyCode}`, {observe: 'response'})
            .pipe(map(response => response.body as CheckPostSummaryWork),
                catchError(this.sharedService.handleError))
    }




    createCheckPostSummaryWork(checkPostSummaryWork : CheckPostSummaryWork): Observable<any> {
        let body = JSON.stringify(checkPostSummaryWork);
        return this.httpClient.post(this.checkPostSummaryWorkUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCheckPostSummaryWork(checkPostSummaryWork : CheckPostSummaryWork, seqCkprtId : number): Observable<any> {
        let body = JSON.stringify(checkPostSummaryWork);
        return this.httpClient.put(`${this.checkPostSummaryWorkUrl}/${seqCkprtId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCheckPostSummaryWork(checkPostSummaryWork : CheckPostSummaryWork, seqCkprtId : number): Observable<any> {
        let body = JSON.stringify(checkPostSummaryWork);
        return this.httpClient.patch(`${this.checkPostSummaryWorkUrl}/${seqCkprtId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCheckPostSummaryWork(seqCkprtId : number): Observable<any> {
        return this.httpClient.delete(`${this.checkPostSummaryWorkUrl}/${seqCkprtId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}