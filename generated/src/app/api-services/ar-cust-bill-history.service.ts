/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ArCustBillHistory } from '../api-models/ar-cust-bill-history.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ArCustBillHistoryService {

    private arCustBillHistoryUrl: string = `${environment.apiUrl}/arcustbillhistorys`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getArCustBillHistorys(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ArCustBillHistory[]> {
        var url = `${this.arCustBillHistoryUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ArCustBillHistory[]),
                catchError(this.sharedService.handleError))
    }

    getArCustBillHistory(customerType : string): Observable<ArCustBillHistory> {
        return this.httpClient.get(`${this.arCustBillHistoryUrl}/${customerType}`, {observe: 'response'})
            .pipe(map(response => response.body as ArCustBillHistory),
                catchError(this.sharedService.handleError))
    }

    getArCustBillHistorysCount(): Observable<number> {
        var url = `${this.arCustBillHistoryUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createArCustBillHistory(arCustBillHistory : ArCustBillHistory): Observable<any> {
        let body = JSON.stringify(arCustBillHistory);
        return this.httpClient.post(this.arCustBillHistoryUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateArCustBillHistory(arCustBillHistory : ArCustBillHistory, customerType : string): Observable<any> {
        let body = JSON.stringify(arCustBillHistory);
        return this.httpClient.put(`${this.arCustBillHistoryUrl}/${customerType}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateArCustBillHistory(arCustBillHistory : ArCustBillHistory, customerType : string): Observable<any> {
        let body = JSON.stringify(arCustBillHistory);
        return this.httpClient.patch(`${this.arCustBillHistoryUrl}/${customerType}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteArCustBillHistory(customerType : string): Observable<any> {
        return this.httpClient.delete(`${this.arCustBillHistoryUrl}/${customerType}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}