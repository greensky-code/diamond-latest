/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ArCashReceipt } from '../api-models/ar-cash-receipt.model'
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class ArCashReceiptService {

  private arCashReceiptUrl: string = `${environment.apiUrl}/arcashreceipts`;
  private contentHeaders = new HttpHeaders();
  constructor(private httpClient: HttpClient,
    private sharedService: SharedService) {
    this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
    this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
  }

  getArCashReceipts(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<ArCashReceipt[]> {
    var url = `${this.arCashReceiptUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
    return this.httpClient.get(url, { observe: 'response' })
      .pipe(map(response => response.body as ArCashReceipt[]),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  getArCashReceipt(seqCashReceipt: number): Observable<ArCashReceipt> {
    return this.httpClient.get(`${this.arCashReceiptUrl}/${seqCashReceipt}`, { observe: 'response' })
      .pipe(map(response => response.body as ArCashReceipt),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  getArCashReceiptsCount(): Observable<number> {
    var url = `${this.arCashReceiptUrl}/count`;
    return this.httpClient.get(url, { observe: 'response' })
      .pipe(map(response => response.body as number),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  findBySeqCashBatchId(seqCashBatchId: number): Observable<ArCashReceipt[]> {
    return this.httpClient.get(`${this.arCashReceiptUrl}/find-by-seqcashbatchid/${seqCashBatchId}`, { observe: 'response' })
      .pipe(map(response => response.body as ArCashReceipt),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }




  createArCashReceipt(arCashReceipt: ArCashReceipt): Observable<any> {
    let body = JSON.stringify(arCashReceipt);
    return this.httpClient.post(this.arCashReceiptUrl, body, { headers: this.contentHeaders })
      .pipe(map(response => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  updateArCashReceipt(arCashReceipt: ArCashReceipt, seqCashReceipt: number): Observable<any> {
    let body = JSON.stringify(arCashReceipt);
    return this.httpClient.put(`${this.arCashReceiptUrl}/${seqCashReceipt}`, body, { headers: this.contentHeaders })
      .pipe(map(response => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  partiallyUpdateArCashReceipt(arCashReceipt: ArCashReceipt, seqCashReceipt: number): Observable<any> {
    let body = JSON.stringify(arCashReceipt);
    return this.httpClient.patch(`${this.arCashReceiptUrl}/${seqCashReceipt}`, body, { headers: this.contentHeaders })
      .pipe(map(response => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  deleteArCashReceipt(seqCashReceipt: number): Observable<any> {
    return this.httpClient.delete(`${this.arCashReceiptUrl}/${seqCashReceipt}`, { observe: 'response' })
      .pipe(map(response => response.body),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  getPmbArCashReceiptByCustomerIdAndType(customerId: string, customerType: string, invoiceNo:string): Observable<ArCashReceipt[]> {
    const url = `${this.arCashReceiptUrl}/${customerId}/${customerType}/${invoiceNo}`;
    return this.httpClient.get(url, {observe: 'response'})
        .pipe(map(response => response.body as ArCashReceipt[]),
            catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }
}
