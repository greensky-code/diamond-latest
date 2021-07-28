/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebCurrencyCode } from '../api-models/cieb-currency-code.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class CiebCurrencyCodeService {

    private ciebCurrencyCodeUrl: string = `${environment.apiUrl}/ciebcurrencycodes`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCiebCurrencyCodes(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CiebCurrencyCode[]> {
        var url = `${this.ciebCurrencyCodeUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebCurrencyCode[]),
                catchError(this.sharedService.handleError))
    }

    getCiebCurrencyCode(currencyCode : string): Observable<CiebCurrencyCode> {
        return this.httpClient.get(`${this.ciebCurrencyCodeUrl}/${currencyCode}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebCurrencyCode),
                catchError(this.sharedService.handleError))
    }

    getCiebCurrencyCodesCount(): Observable<number> {
        var url = `${this.ciebCurrencyCodeUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCiebCurrencyCode(ciebCurrencyCode : CiebCurrencyCode): Observable<any> {
        let body = JSON.stringify(ciebCurrencyCode);
        return this.httpClient.post(this.ciebCurrencyCodeUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCiebCurrencyCode(ciebCurrencyCode : CiebCurrencyCode, currencyCode : string): Observable<any> {
        let body = JSON.stringify(ciebCurrencyCode);
        return this.httpClient.put(`${this.ciebCurrencyCodeUrl}/${currencyCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCiebCurrencyCode(ciebCurrencyCode : CiebCurrencyCode, currencyCode : string): Observable<any> {
        let body = JSON.stringify(ciebCurrencyCode);
        return this.httpClient.patch(`${this.ciebCurrencyCodeUrl}/${currencyCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCiebCurrencyCode(currencyCode : string): Observable<any> {
        return this.httpClient.delete(`${this.ciebCurrencyCodeUrl}/${currencyCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}