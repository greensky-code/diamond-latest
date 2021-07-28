/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PmbArCustTaxBillHistory } from '../api-models/pmb-ar-cust-tax-bill-history.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PmbArCustTaxBillHistoryService {

    private pmbArCustTaxBillHistoryUrl: string = `${environment.apiUrl}/pmbarcusttaxbillhistorys`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPmbArCustTaxBillHistorys(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PmbArCustTaxBillHistory[]> {
        var url = `${this.pmbArCustTaxBillHistoryUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PmbArCustTaxBillHistory[]),
                catchError(this.sharedService.handleError))
    }

    getPmbArCustTaxBillHistory(customerType : string): Observable<PmbArCustTaxBillHistory> {
        return this.httpClient.get(`${this.pmbArCustTaxBillHistoryUrl}/${customerType}`, {observe: 'response'})
            .pipe(map(response => response.body as PmbArCustTaxBillHistory),
                catchError(this.sharedService.handleError))
    }

    getPmbArCustTaxBillHistorysCount(): Observable<number> {
        var url = `${this.pmbArCustTaxBillHistoryUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createPmbArCustTaxBillHistory(pmbArCustTaxBillHistory : PmbArCustTaxBillHistory): Observable<any> {
        let body = JSON.stringify(pmbArCustTaxBillHistory);
        return this.httpClient.post(this.pmbArCustTaxBillHistoryUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updatePmbArCustTaxBillHistory(pmbArCustTaxBillHistory : PmbArCustTaxBillHistory, customerType : string): Observable<any> {
        let body = JSON.stringify(pmbArCustTaxBillHistory);
        return this.httpClient.put(`${this.pmbArCustTaxBillHistoryUrl}/${customerType}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdatePmbArCustTaxBillHistory(pmbArCustTaxBillHistory : PmbArCustTaxBillHistory, customerType : string): Observable<any> {
        let body = JSON.stringify(pmbArCustTaxBillHistory);
        return this.httpClient.patch(`${this.pmbArCustTaxBillHistoryUrl}/${customerType}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deletePmbArCustTaxBillHistory(customerType : string): Observable<any> {
        return this.httpClient.delete(`${this.pmbArCustTaxBillHistoryUrl}/${customerType}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}