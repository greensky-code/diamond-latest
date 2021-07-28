/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PremBillCustomerWork } from '../api-models/prem-bill-customer-work.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PremBillCustomerWorkService {

    private premBillCustomerWorkUrl: string = `${environment.apiUrl}/prembillcustomerworks`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPremBillCustomerWorks(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PremBillCustomerWork[]> {
        var url = `${this.premBillCustomerWorkUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PremBillCustomerWork[]),
                catchError(this.sharedService.handleError))
    }

    getPremBillCustomerWork(seqGpbilId : number): Observable<PremBillCustomerWork> {
        return this.httpClient.get(`${this.premBillCustomerWorkUrl}/${seqGpbilId}`, {observe: 'response'})
            .pipe(map(response => response.body as PremBillCustomerWork),
                catchError(this.sharedService.handleError))
    }

    getPremBillCustomerWorksCount(): Observable<number> {
        var url = `${this.premBillCustomerWorkUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createPremBillCustomerWork(premBillCustomerWork : PremBillCustomerWork): Observable<any> {
        let body = JSON.stringify(premBillCustomerWork);
        return this.httpClient.post(this.premBillCustomerWorkUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updatePremBillCustomerWork(premBillCustomerWork : PremBillCustomerWork, seqGpbilId : number): Observable<any> {
        let body = JSON.stringify(premBillCustomerWork);
        return this.httpClient.put(`${this.premBillCustomerWorkUrl}/${seqGpbilId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdatePremBillCustomerWork(premBillCustomerWork : PremBillCustomerWork, seqGpbilId : number): Observable<any> {
        let body = JSON.stringify(premBillCustomerWork);
        return this.httpClient.patch(`${this.premBillCustomerWorkUrl}/${seqGpbilId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deletePremBillCustomerWork(seqGpbilId : number): Observable<any> {
        return this.httpClient.delete(`${this.premBillCustomerWorkUrl}/${seqGpbilId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}