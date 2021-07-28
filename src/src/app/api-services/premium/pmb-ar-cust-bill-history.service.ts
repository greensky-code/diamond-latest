/* Copyright (c) 2020 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {SharedService} from '../../shared/services/shared.service';
import {PmbArCustBillHistory} from '../../api-models/premium/pmb-ar-cust-bill-history.model';

@Injectable({
    providedIn: "root",
})
export class PmbArCustBillHistoryService {

    private pmbArCustBillHistoryUrl: string = `${environment.apiUrl}/pmbarcustbillhistorys`;
    private contentHeaders = new HttpHeaders();

    constructor(private httpClient: HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPmbArCustBillHistorys(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<PmbArCustBillHistory[]> {
        var url = `${this.pmbArCustBillHistoryUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PmbArCustBillHistory[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getPmbArCustBillHistory(customerType: string): Observable<PmbArCustBillHistory> {
        return this.httpClient.get(`${this.pmbArCustBillHistoryUrl}/${customerType}`, {observe: 'response'})
            .pipe(map(response => response.body as PmbArCustBillHistory),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getPmbArCustBillHistorysCount(): Observable<number> {
        var url = `${this.pmbArCustBillHistoryUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }


    createPmbArCustBillHistory(pmbArCustBillHistory: PmbArCustBillHistory): Observable<any> {
        let body = JSON.stringify(pmbArCustBillHistory);
        return this.httpClient.post(this.pmbArCustBillHistoryUrl, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updatePmbArCustBillHistory(pmbArCustBillHistory: PmbArCustBillHistory, customerType: string): Observable<any> {
        let body = JSON.stringify(pmbArCustBillHistory);
        return this.httpClient.put(`${this.pmbArCustBillHistoryUrl}/${customerType}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdatePmbArCustBillHistory(pmbArCustBillHistory: PmbArCustBillHistory, customerType: string): Observable<any> {
        let body = JSON.stringify(pmbArCustBillHistory);
        return this.httpClient.patch(`${this.pmbArCustBillHistoryUrl}/${customerType}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deletePmbArCustBillHistory(customerType: string): Observable<any> {
        return this.httpClient.delete(`${this.pmbArCustBillHistoryUrl}/${customerType}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getPmbArCustBillHistorysByCustomerIdAndType(customerId: string, customerType: string, billFrom:string=null, billThrough:string=null): Observable<PmbArCustBillHistory[]> {
        const url = `${this.pmbArCustBillHistoryUrl}/${customerId}/${customerType}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PmbArCustBillHistory[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    getPmbArCustBillHistorysByCustomerIdAndTypeAndDates(customerId: string, customerType: string, billFrom:string=null, billThrough:string=null): Observable<PmbArCustBillHistory[]> {
        let datesPartUrl='';
        if(billFrom && billThrough)
            datesPartUrl =`/${billFrom}/${billThrough}`;
        const url = `${this.pmbArCustBillHistoryUrl}/${customerId}/${customerType}${datesPartUrl}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PmbArCustBillHistory[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
