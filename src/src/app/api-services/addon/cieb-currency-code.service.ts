/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebCurrencyCode } from '../../api-models';
import { environment } from '../../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../../shared/services/shared.service';
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
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getCurrencyPayableList(): Observable<CiebCurrencyCode[]> {
        var url = `${this.ciebCurrencyCodeUrl}/getCurrencyPayableList`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebCurrencyCode[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getCiebCurrencyCode(currencyCode : string): Observable<CiebCurrencyCode> {
        return this.httpClient.get(`${this.ciebCurrencyCodeUrl}/${currencyCode}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebCurrencyCode),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getCiebCurrencyCodesCount(): Observable<number> {
        var url = `${this.ciebCurrencyCodeUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }





    createCiebCurrencyCode(ciebCurrencyCode : CiebCurrencyCode): Observable<any> {
        let body = JSON.stringify(ciebCurrencyCode);
        return this.httpClient.post(this.ciebCurrencyCodeUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateCiebCurrencyCode(ciebCurrencyCode : CiebCurrencyCode, currencyCode : string): Observable<any> {
        let body = JSON.stringify(ciebCurrencyCode);
        return this.httpClient.put(`${this.ciebCurrencyCodeUrl}/${currencyCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateCiebCurrencyCode(ciebCurrencyCode : CiebCurrencyCode, currencyCode : string): Observable<any> {
        let body = JSON.stringify(ciebCurrencyCode);
        return this.httpClient.patch(`${this.ciebCurrencyCodeUrl}/${currencyCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteCiebCurrencyCode(currencyCode : string): Observable<any> {
        return this.httpClient.delete(`${this.ciebCurrencyCodeUrl}/${currencyCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
