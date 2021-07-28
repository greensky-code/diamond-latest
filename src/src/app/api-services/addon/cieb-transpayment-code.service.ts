/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';
import { CiebTransPaymentCode } from '../../api-models/addon/cieb-transpayment-code.model';

@Injectable({
    providedIn: "root"
})
export class CiebTransPaymentService {

    private ciebTransPaymentCodeUrl: string = `${environment.apiUrl}/ciebtranspaymentcodes`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCiebTransPaymentCodes(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CiebTransPaymentCode[]> {
        var url = `${this.ciebTransPaymentCodeUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebTransPaymentCode[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getCiebTransPaymentCodeList(): Observable<CiebTransPaymentCode[]> {
        var url = `${this.ciebTransPaymentCodeUrl}/getCiebTransPaymentCodeList`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebTransPaymentCode[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getCiebTransPaymentCode(TransPaymentCode : string): Observable<CiebTransPaymentCode> {
        return this.httpClient.get(`${this.ciebTransPaymentCodeUrl}/${TransPaymentCode}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebTransPaymentCode),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getCiebTransPaymentCodesCount(): Observable<number> {
        var url = `${this.ciebTransPaymentCodeUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    createCiebTransPaymentCode(ciebTransPaymentCode : CiebTransPaymentCode): Observable<any> {
        let body = JSON.stringify(ciebTransPaymentCode);
        return this.httpClient.post(this.ciebTransPaymentCodeUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateCiebTransPaymentCode(ciebTransPaymentCode : CiebTransPaymentCode, TransPaymentCode : string): Observable<any> {
        let body = JSON.stringify(ciebTransPaymentCode);
        return this.httpClient.put(`${this.ciebTransPaymentCodeUrl}/${TransPaymentCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateCiebTransPaymentCode(ciebTransPaymentCode : CiebTransPaymentCode, TransPaymentCode : string): Observable<any> {
        let body = JSON.stringify(ciebTransPaymentCode);
        return this.httpClient.patch(`${this.ciebTransPaymentCodeUrl}/${TransPaymentCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteCiebTransPaymentCode(TransPaymentCode : string): Observable<any> {
        return this.httpClient.delete(`${this.ciebTransPaymentCodeUrl}/${TransPaymentCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
