/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebBankAcctCode } from '../../api-models/addon/cieb-bank-acct-code.model'
import { CONFIG } from '../../core/config';
import { environment } from '../../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class CiebBankAcctCodeService {

    private ciebBankAcctCodeUrl: string = `${environment.apiUrl}/ciebbankacctcodes`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCiebBankAcctCodes(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CiebBankAcctCode[]> {
        var url = `${this.ciebBankAcctCodeUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebBankAcctCode[]),
                catchError(this.sharedService.handleError))
    }

    getCiebBankAcctCode(bankAcctCode : string): Observable<CiebBankAcctCode> {
        return this.httpClient.get(`${this.ciebBankAcctCodeUrl}/${bankAcctCode}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebBankAcctCode),
                catchError(this.sharedService.handleError))
    }

    getCiebBankAcctCodesCount(): Observable<number> {
        var url = `${this.ciebBankAcctCodeUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCiebBankAcctCode(ciebBankAcctCode : CiebBankAcctCode): Observable<any> {
        let body = JSON.stringify(ciebBankAcctCode);
        return this.httpClient.post(this.ciebBankAcctCodeUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCiebBankAcctCode(ciebBankAcctCode : CiebBankAcctCode, bankAcctCode : string): Observable<any> {
        let body = JSON.stringify(ciebBankAcctCode);
        return this.httpClient.put(`${this.ciebBankAcctCodeUrl}/${bankAcctCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCiebBankAcctCode(ciebBankAcctCode : CiebBankAcctCode, bankAcctCode : string): Observable<any> {
        let body = JSON.stringify(ciebBankAcctCode);
        return this.httpClient.patch(`${this.ciebBankAcctCodeUrl}/${bankAcctCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCiebBankAcctCode(bankAcctCode : string): Observable<any> {
        return this.httpClient.delete(`${this.ciebBankAcctCodeUrl}/${bankAcctCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}