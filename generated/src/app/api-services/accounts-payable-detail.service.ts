/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AccountsPayableDetail } from '../api-models/accounts-payable-detail.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class AccountsPayableDetailService {

    private accountsPayableDetailUrl: string = `${environment.apiUrl}/accountspayabledetails`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAccountsPayableDetails(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AccountsPayableDetail[]> {
        var url = `${this.accountsPayableDetailUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AccountsPayableDetail[]),
                catchError(this.sharedService.handleError))
    }

    getAccountsPayableDetail(seqApTrans : number): Observable<AccountsPayableDetail> {
        return this.httpClient.get(`${this.accountsPayableDetailUrl}/${seqApTrans}`, {observe: 'response'})
            .pipe(map(response => response.body as AccountsPayableDetail),
                catchError(this.sharedService.handleError))
    }

    getAccountsPayableDetailsCount(): Observable<number> {
        var url = `${this.accountsPayableDetailUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createAccountsPayableDetail(accountsPayableDetail : AccountsPayableDetail): Observable<any> {
        let body = JSON.stringify(accountsPayableDetail);
        return this.httpClient.post(this.accountsPayableDetailUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateAccountsPayableDetail(accountsPayableDetail : AccountsPayableDetail, seqApTrans : number): Observable<any> {
        let body = JSON.stringify(accountsPayableDetail);
        return this.httpClient.put(`${this.accountsPayableDetailUrl}/${seqApTrans}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateAccountsPayableDetail(accountsPayableDetail : AccountsPayableDetail, seqApTrans : number): Observable<any> {
        let body = JSON.stringify(accountsPayableDetail);
        return this.httpClient.patch(`${this.accountsPayableDetailUrl}/${seqApTrans}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteAccountsPayableDetail(seqApTrans : number): Observable<any> {
        return this.httpClient.delete(`${this.accountsPayableDetailUrl}/${seqApTrans}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}