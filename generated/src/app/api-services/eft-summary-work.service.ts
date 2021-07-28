/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { EftSummaryWork } from '../api-models/eft-summary-work.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class EftSummaryWorkService {

    private eftSummaryWorkUrl: string = `${environment.apiUrl}/eftsummaryworks`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getEftSummaryWorks(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<EftSummaryWork[]> {
        var url = `${this.eftSummaryWorkUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as EftSummaryWork[]),
                catchError(this.sharedService.handleError))
    }

    getEftSummaryWork(eftTransNumber : string): Observable<EftSummaryWork> {
        return this.httpClient.get(`${this.eftSummaryWorkUrl}/${eftTransNumber}`, {observe: 'response'})
            .pipe(map(response => response.body as EftSummaryWork),
                catchError(this.sharedService.handleError))
    }

    getEftSummaryWorksCount(): Observable<number> {
        var url = `${this.eftSummaryWorkUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createEftSummaryWork(eftSummaryWork : EftSummaryWork): Observable<any> {
        let body = JSON.stringify(eftSummaryWork);
        return this.httpClient.post(this.eftSummaryWorkUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateEftSummaryWork(eftSummaryWork : EftSummaryWork, eftTransNumber : string): Observable<any> {
        let body = JSON.stringify(eftSummaryWork);
        return this.httpClient.put(`${this.eftSummaryWorkUrl}/${eftTransNumber}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateEftSummaryWork(eftSummaryWork : EftSummaryWork, eftTransNumber : string): Observable<any> {
        let body = JSON.stringify(eftSummaryWork);
        return this.httpClient.patch(`${this.eftSummaryWorkUrl}/${eftTransNumber}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteEftSummaryWork(eftTransNumber : string): Observable<any> {
        return this.httpClient.delete(`${this.eftSummaryWorkUrl}/${eftTransNumber}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}