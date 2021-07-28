/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ArAdjPostSummaryWork } from '../api-models/ar-adj-post-summary-work.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ArAdjPostSummaryWorkService {

    private arAdjPostSummaryWorkUrl: string = `${environment.apiUrl}/aradjpostsummaryworks`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getArAdjPostSummaryWorks(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ArAdjPostSummaryWork[]> {
        var url = `${this.arAdjPostSummaryWorkUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ArAdjPostSummaryWork[]),
                catchError(this.sharedService.handleError))
    }

    getArAdjPostSummaryWork(seqAradjId : number): Observable<ArAdjPostSummaryWork> {
        return this.httpClient.get(`${this.arAdjPostSummaryWorkUrl}/${seqAradjId}`, {observe: 'response'})
            .pipe(map(response => response.body as ArAdjPostSummaryWork),
                catchError(this.sharedService.handleError))
    }

    getArAdjPostSummaryWorksCount(): Observable<number> {
        var url = `${this.arAdjPostSummaryWorkUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createArAdjPostSummaryWork(arAdjPostSummaryWork : ArAdjPostSummaryWork): Observable<any> {
        let body = JSON.stringify(arAdjPostSummaryWork);
        return this.httpClient.post(this.arAdjPostSummaryWorkUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateArAdjPostSummaryWork(arAdjPostSummaryWork : ArAdjPostSummaryWork, seqAradjId : number): Observable<any> {
        let body = JSON.stringify(arAdjPostSummaryWork);
        return this.httpClient.put(`${this.arAdjPostSummaryWorkUrl}/${seqAradjId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateArAdjPostSummaryWork(arAdjPostSummaryWork : ArAdjPostSummaryWork, seqAradjId : number): Observable<any> {
        let body = JSON.stringify(arAdjPostSummaryWork);
        return this.httpClient.patch(`${this.arAdjPostSummaryWorkUrl}/${seqAradjId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteArAdjPostSummaryWork(seqAradjId : number): Observable<any> {
        return this.httpClient.delete(`${this.arAdjPostSummaryWorkUrl}/${seqAradjId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}