/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ArCashReceipt } from '../api-models/ar-cash-receipt.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ArCashReceiptService {

    private arCashReceiptUrl: string = `${environment.apiUrl}/arcashreceipts`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getArCashReceipts(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ArCashReceipt[]> {
        var url = `${this.arCashReceiptUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ArCashReceipt[]),
                catchError(this.sharedService.handleError))
    }

    getArCashReceipt(seqCashReceipt : number): Observable<ArCashReceipt> {
        return this.httpClient.get(`${this.arCashReceiptUrl}/${seqCashReceipt}`, {observe: 'response'})
            .pipe(map(response => response.body as ArCashReceipt),
                catchError(this.sharedService.handleError))
    }

    getArCashReceiptsCount(): Observable<number> {
        var url = `${this.arCashReceiptUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqCashBatchId(seqCashBatchId : number): Observable<ArCashReceipt[]> {
        return this.httpClient.get(`${this.arCashReceiptUrl}/find-by-seqcashbatchid/${seqCashBatchId}`, {observe: 'response'})
            .pipe(map(response => response.body as ArCashReceipt),
                catchError(this.sharedService.handleError))
    }




    createArCashReceipt(arCashReceipt : ArCashReceipt): Observable<any> {
        let body = JSON.stringify(arCashReceipt);
        return this.httpClient.post(this.arCashReceiptUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateArCashReceipt(arCashReceipt : ArCashReceipt, seqCashReceipt : number): Observable<any> {
        let body = JSON.stringify(arCashReceipt);
        return this.httpClient.put(`${this.arCashReceiptUrl}/${seqCashReceipt}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateArCashReceipt(arCashReceipt : ArCashReceipt, seqCashReceipt : number): Observable<any> {
        let body = JSON.stringify(arCashReceipt);
        return this.httpClient.patch(`${this.arCashReceiptUrl}/${seqCashReceipt}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteArCashReceipt(seqCashReceipt : number): Observable<any> {
        return this.httpClient.delete(`${this.arCashReceiptUrl}/${seqCashReceipt}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}