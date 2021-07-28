/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebPaymentCode } from '../../api-models'
import { environment } from '../../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class CiebPaymentCodeService {

    private ciebPaymentCodeUrl: string = `${environment.apiUrl}/ciebpaymentcodes`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCiebPaymentCodes(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CiebPaymentCode[]> {
        var url = `${this.ciebPaymentCodeUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebPaymentCode[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getCiebPaymentCode(paymentCode : string): Observable<CiebPaymentCode> {
        return this.httpClient.get(`${this.ciebPaymentCodeUrl}/${paymentCode}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebPaymentCode),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getCiebPaymentCodesCount(): Observable<number> {
        var url = `${this.ciebPaymentCodeUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }





    createCiebPaymentCode(ciebPaymentCode : CiebPaymentCode): Observable<any> {
        let body = JSON.stringify(ciebPaymentCode);
        return this.httpClient.post(this.ciebPaymentCodeUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateCiebPaymentCode(ciebPaymentCode : CiebPaymentCode, paymentCode : string): Observable<any> {
        let body = JSON.stringify(ciebPaymentCode);
        return this.httpClient.put(`${this.ciebPaymentCodeUrl}/${paymentCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateCiebPaymentCode(ciebPaymentCode : CiebPaymentCode, paymentCode : string): Observable<any> {
        let body = JSON.stringify(ciebPaymentCode);
        return this.httpClient.patch(`${this.ciebPaymentCodeUrl}/${paymentCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteCiebPaymentCode(paymentCode : string): Observable<any> {
        return this.httpClient.delete(`${this.ciebPaymentCodeUrl}/${paymentCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
