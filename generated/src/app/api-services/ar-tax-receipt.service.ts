/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ArTaxReceipt } from '../api-models/ar-tax-receipt.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ArTaxReceiptService {

    private arTaxReceiptUrl: string = `${environment.apiUrl}/artaxreceipts`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getArTaxReceipts(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ArTaxReceipt[]> {
        var url = `${this.arTaxReceiptUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ArTaxReceipt[]),
                catchError(this.sharedService.handleError))
    }

    getArTaxReceipt(seqCashReceipt : number): Observable<ArTaxReceipt> {
        return this.httpClient.get(`${this.arTaxReceiptUrl}/${seqCashReceipt}`, {observe: 'response'})
            .pipe(map(response => response.body as ArTaxReceipt),
                catchError(this.sharedService.handleError))
    }

    getArTaxReceiptsCount(): Observable<number> {
        var url = `${this.arTaxReceiptUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createArTaxReceipt(arTaxReceipt : ArTaxReceipt): Observable<any> {
        let body = JSON.stringify(arTaxReceipt);
        return this.httpClient.post(this.arTaxReceiptUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateArTaxReceipt(arTaxReceipt : ArTaxReceipt, seqCashReceipt : number): Observable<any> {
        let body = JSON.stringify(arTaxReceipt);
        return this.httpClient.put(`${this.arTaxReceiptUrl}/${seqCashReceipt}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateArTaxReceipt(arTaxReceipt : ArTaxReceipt, seqCashReceipt : number): Observable<any> {
        let body = JSON.stringify(arTaxReceipt);
        return this.httpClient.patch(`${this.arTaxReceiptUrl}/${seqCashReceipt}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteArTaxReceipt(seqCashReceipt : number): Observable<any> {
        return this.httpClient.delete(`${this.arTaxReceiptUrl}/${seqCashReceipt}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}