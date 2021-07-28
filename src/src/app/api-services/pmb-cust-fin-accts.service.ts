/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PmbCustFinAccts } from '../api-models/pmb-cust-fin-accts.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PmbCustFinAcctsService {

    private pmbCustFinAcctsUrl: string = `${environment.apiUrl}/pmbcustfinacctss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPmbCustFinAcctss(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PmbCustFinAccts[]> {
        var url = `${this.pmbCustFinAcctsUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PmbCustFinAccts[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getPmbCustFinAcctsByCustIdAndType(customerId: string, customerType: string): Observable<PmbCustFinAccts[]> {
        let url = `${this.pmbCustFinAcctsUrl}/${customerId}/${customerType}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PmbCustFinAccts[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getPmbCustFinAccts(customerType : string): Observable<PmbCustFinAccts> {
        return this.httpClient.get(`${this.pmbCustFinAcctsUrl}/${customerType}`, {observe: 'response'})
            .pipe(map(response => response.body as PmbCustFinAccts),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getPmbCustFinAcctssCount(): Observable<number> {
        var url = `${this.pmbCustFinAcctsUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }





    createPmbCustFinAccts(pmbCustFinAccts : PmbCustFinAccts): Observable<any> {
        let body = JSON.stringify(pmbCustFinAccts);
        return this.httpClient.post(this.pmbCustFinAcctsUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updatePmbCustFinAccts(pmbCustFinAccts: PmbCustFinAccts): Observable<any> {
        let body = JSON.stringify(pmbCustFinAccts);
        return this.httpClient.put(`${this.pmbCustFinAcctsUrl}`,
            body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdatePmbCustFinAccts(pmbCustFinAccts : PmbCustFinAccts, customerType : string): Observable<any> {
        let body = JSON.stringify(pmbCustFinAccts);
        return this.httpClient.patch(`${this.pmbCustFinAcctsUrl}/${customerType}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deletePmbCustFinAccts(pmbCustFinAccts : PmbCustFinAccts): Observable<any> {
        let body = JSON.stringify(pmbCustFinAccts);
        return this.httpClient.post(`${this.pmbCustFinAcctsUrl}/delete`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
