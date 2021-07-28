/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PremBillCashWork } from '../api-models/prem-bill-cash-work.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PremBillCashWorkService {

    private premBillCashWorkUrl: string = `${environment.apiUrl}/prembillcashworks`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPremBillCashWorks(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PremBillCashWork[]> {
        var url = `${this.premBillCashWorkUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PremBillCashWork[]),
                catchError(this.sharedService.handleError))
    }

    getPremBillCashWork(seqGpbilId : number): Observable<PremBillCashWork> {
        return this.httpClient.get(`${this.premBillCashWorkUrl}/${seqGpbilId}`, {observe: 'response'})
            .pipe(map(response => response.body as PremBillCashWork),
                catchError(this.sharedService.handleError))
    }

    getPremBillCashWorksCount(): Observable<number> {
        var url = `${this.premBillCashWorkUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createPremBillCashWork(premBillCashWork : PremBillCashWork): Observable<any> {
        let body = JSON.stringify(premBillCashWork);
        return this.httpClient.post(this.premBillCashWorkUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updatePremBillCashWork(premBillCashWork : PremBillCashWork, seqGpbilId : number): Observable<any> {
        let body = JSON.stringify(premBillCashWork);
        return this.httpClient.put(`${this.premBillCashWorkUrl}/${seqGpbilId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdatePremBillCashWork(premBillCashWork : PremBillCashWork, seqGpbilId : number): Observable<any> {
        let body = JSON.stringify(premBillCashWork);
        return this.httpClient.patch(`${this.premBillCashWorkUrl}/${seqGpbilId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deletePremBillCashWork(seqGpbilId : number): Observable<any> {
        return this.httpClient.delete(`${this.premBillCashWorkUrl}/${seqGpbilId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}