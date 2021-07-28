/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ManualCheckSummaryWork } from '../api-models/manual-check-summary-work.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class ManualCheckSummaryWorkService {

    private manualCheckSummaryWorkUrl: string = `${environment.apiUrl}/manualchecksummaryworks`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getManualCheckSummaryWorks(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ManualCheckSummaryWork[]> {
        var url = `${this.manualCheckSummaryWorkUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ManualCheckSummaryWork[]),
                catchError(this.sharedService.handleError))
    }

    getManualCheckSummaryWork(checkNumber : string): Observable<ManualCheckSummaryWork> {
        return this.httpClient.get(`${this.manualCheckSummaryWorkUrl}/${checkNumber}`, {observe: 'response'})
            .pipe(map(response => response.body as ManualCheckSummaryWork),
                catchError(this.sharedService.handleError))
    }

    getManualCheckSummaryWorksCount(): Observable<number> {
        var url = `${this.manualCheckSummaryWorkUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createManualCheckSummaryWork(manualCheckSummaryWork : ManualCheckSummaryWork): Observable<any> {
        let body = JSON.stringify(manualCheckSummaryWork);
        return this.httpClient.post(this.manualCheckSummaryWorkUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateManualCheckSummaryWork(manualCheckSummaryWork : ManualCheckSummaryWork, checkNumber : string): Observable<any> {
        let body = JSON.stringify(manualCheckSummaryWork);
        return this.httpClient.put(`${this.manualCheckSummaryWorkUrl}/${checkNumber}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateManualCheckSummaryWork(manualCheckSummaryWork : ManualCheckSummaryWork, checkNumber : string): Observable<any> {
        let body = JSON.stringify(manualCheckSummaryWork);
        return this.httpClient.patch(`${this.manualCheckSummaryWorkUrl}/${checkNumber}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteManualCheckSummaryWork(checkNumber : string): Observable<any> {
        return this.httpClient.delete(`${this.manualCheckSummaryWorkUrl}/${checkNumber}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}