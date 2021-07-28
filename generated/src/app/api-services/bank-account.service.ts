/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { BankAccount } from '../api-models/bank-account.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class BankAccountService {

    private bankAccountUrl: string = `${environment.apiUrl}/bankaccounts`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getBankAccounts(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<BankAccount[]> {
        var url = `${this.bankAccountUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as BankAccount[]),
                catchError(this.sharedService.handleError))
    }

    getBankAccount(bankAccountCode : string): Observable<BankAccount> {
        return this.httpClient.get(`${this.bankAccountUrl}/${bankAccountCode}`, {observe: 'response'})
            .pipe(map(response => response.body as BankAccount),
                catchError(this.sharedService.handleError))
    }

    getBankAccountsCount(): Observable<number> {
        var url = `${this.bankAccountUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createBankAccount(bankAccount : BankAccount): Observable<any> {
        let body = JSON.stringify(bankAccount);
        return this.httpClient.post(this.bankAccountUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateBankAccount(bankAccount : BankAccount, bankAccountCode : string): Observable<any> {
        let body = JSON.stringify(bankAccount);
        return this.httpClient.put(`${this.bankAccountUrl}/${bankAccountCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateBankAccount(bankAccount : BankAccount, bankAccountCode : string): Observable<any> {
        let body = JSON.stringify(bankAccount);
        return this.httpClient.patch(`${this.bankAccountUrl}/${bankAccountCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteBankAccount(bankAccountCode : string): Observable<any> {
        return this.httpClient.delete(`${this.bankAccountUrl}/${bankAccountCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}