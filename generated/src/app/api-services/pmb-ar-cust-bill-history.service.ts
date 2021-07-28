/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PmbArCustBillHistory } from '../api-models/pmb-ar-cust-bill-history.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PmbArCustBillHistoryService {

    private pmbArCustBillHistoryUrl: string = `${environment.apiUrl}/pmbarcustbillhistorys`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPmbArCustBillHistorys(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PmbArCustBillHistory[]> {
        var url = `${this.pmbArCustBillHistoryUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PmbArCustBillHistory[]),
                catchError(this.sharedService.handleError))
    }

    getPmbArCustBillHistory(customerType : string): Observable<PmbArCustBillHistory> {
        return this.httpClient.get(`${this.pmbArCustBillHistoryUrl}/${customerType}`, {observe: 'response'})
            .pipe(map(response => response.body as PmbArCustBillHistory),
                catchError(this.sharedService.handleError))
    }

    getPmbArCustBillHistorysCount(): Observable<number> {
        var url = `${this.pmbArCustBillHistoryUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createPmbArCustBillHistory(pmbArCustBillHistory : PmbArCustBillHistory): Observable<any> {
        let body = JSON.stringify(pmbArCustBillHistory);
        return this.httpClient.post(this.pmbArCustBillHistoryUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updatePmbArCustBillHistory(pmbArCustBillHistory : PmbArCustBillHistory, customerType : string): Observable<any> {
        let body = JSON.stringify(pmbArCustBillHistory);
        return this.httpClient.put(`${this.pmbArCustBillHistoryUrl}/${customerType}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdatePmbArCustBillHistory(pmbArCustBillHistory : PmbArCustBillHistory, customerType : string): Observable<any> {
        let body = JSON.stringify(pmbArCustBillHistory);
        return this.httpClient.patch(`${this.pmbArCustBillHistoryUrl}/${customerType}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deletePmbArCustBillHistory(customerType : string): Observable<any> {
        return this.httpClient.delete(`${this.pmbArCustBillHistoryUrl}/${customerType}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}