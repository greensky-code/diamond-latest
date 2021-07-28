/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebPaymentAdviceCode } from '../../api-models/addon/cieb-payment-advice-code.model'
import { CONFIG } from '../../core/config';
import { environment } from '../../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class CiebPaymentAdviceCodeService {

    private ciebPaymentAdviceCodeUrl: string = `${environment.apiUrl}/ciebpaymentadvicecodes`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCiebPaymentAdviceCodes(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CiebPaymentAdviceCode[]> {
        var url = `${this.ciebPaymentAdviceCodeUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebPaymentAdviceCode[]),
                catchError(this.sharedService.handleError))
    }

    getCiebPaymentAdviceCode(paymentAdviceCode : string): Observable<CiebPaymentAdviceCode> {
        return this.httpClient.get(`${this.ciebPaymentAdviceCodeUrl}/${paymentAdviceCode}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebPaymentAdviceCode),
                catchError(this.sharedService.handleError))
    }

    getCiebPaymentAdviceCodesCount(): Observable<number> {
        var url = `${this.ciebPaymentAdviceCodeUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCiebPaymentAdviceCode(ciebPaymentAdviceCode : CiebPaymentAdviceCode): Observable<any> {
        let body = JSON.stringify(ciebPaymentAdviceCode);
        return this.httpClient.post(this.ciebPaymentAdviceCodeUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCiebPaymentAdviceCode(ciebPaymentAdviceCode : CiebPaymentAdviceCode, paymentAdviceCode : string): Observable<any> {
        let body = JSON.stringify(ciebPaymentAdviceCode);
        return this.httpClient.put(`${this.ciebPaymentAdviceCodeUrl}/${paymentAdviceCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCiebPaymentAdviceCode(ciebPaymentAdviceCode : CiebPaymentAdviceCode, paymentAdviceCode : string): Observable<any> {
        let body = JSON.stringify(ciebPaymentAdviceCode);
        return this.httpClient.patch(`${this.ciebPaymentAdviceCodeUrl}/${paymentAdviceCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCiebPaymentAdviceCode(paymentAdviceCode : string): Observable<any> {
        return this.httpClient.delete(`${this.ciebPaymentAdviceCodeUrl}/${paymentAdviceCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}