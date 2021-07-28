/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AccountsPayable } from '../api-models/accounts-payable.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class AccountsPayableService {

    private accountsPayableUrl: string = `${environment.apiUrl}/accountspayables`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAccountsPayables(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AccountsPayable[]> {
        var url = `${this.accountsPayableUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AccountsPayable[]),
                catchError(this.sharedService.handleError))
    }

    getAccountsPayable(seqApTrans : number): Observable<AccountsPayable> {
        return this.httpClient.get(`${this.accountsPayableUrl}/${seqApTrans}`, {observe: 'response'})
            .pipe(map(response => response.body as AccountsPayable),
                catchError(this.sharedService.handleError))
    }

    getAccountsPayablesCount(): Observable<number> {
        var url = `${this.accountsPayableUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createAccountsPayable(accountsPayable : AccountsPayable): Observable<any> {
        let body = JSON.stringify(accountsPayable);
        return this.httpClient.post(this.accountsPayableUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateAccountsPayable(accountsPayable : AccountsPayable, seqApTrans : number): Observable<any> {
        let body = JSON.stringify(accountsPayable);
        return this.httpClient.put(`${this.accountsPayableUrl}/${seqApTrans}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateAccountsPayable(accountsPayable : AccountsPayable, seqApTrans : number): Observable<any> {
        let body = JSON.stringify(accountsPayable);
        return this.httpClient.patch(`${this.accountsPayableUrl}/${seqApTrans}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteAccountsPayable(seqApTrans : number): Observable<any> {
        return this.httpClient.delete(`${this.accountsPayableUrl}/${seqApTrans}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}