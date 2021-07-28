/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { VendorCredit } from '../api-models/vendor-credit.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class VendorCreditService {
  private vendorCreditUrl: string = `${environment.apiUrl}/vendorcredits`;
  private contentHeaders = new HttpHeaders();
  constructor(
    private httpClient: HttpClient,
    private sharedService: SharedService
  ) {
    this.contentHeaders = this.contentHeaders.set("Accept", "application/json");
    this.contentHeaders = this.contentHeaders.set(
      "Content-Type",
      "application/json; charset=utf-8"
    );
  }

  getVendorCredits(
    usePagination: boolean = false,
    page: number = 0,
    size: number = 0
  ): Observable<VendorCredit[]> {
    var url = `${this.vendorCreditUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
    return this.httpClient.get(url, { observe: "response" }).pipe(
      map((response) => response.body as VendorCredit[]),
      catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
    );
  }

  getVendorCredit(seqVendCredit: number): Observable<VendorCredit> {
    return this.httpClient
      .get(`${this.vendorCreditUrl}/${seqVendCredit}`, { observe: "response" })
      .pipe(
        map((response) => response.body as VendorCredit),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  getVendorCreditsCount(): Observable<number> {
    var url = `${this.vendorCreditUrl}/count`;
    return this.httpClient.get(url, { observe: "response" }).pipe(
      map((response) => response.body as number),
      catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
    );
  }

  createVendorCredit(vendorCredit: VendorCredit): Observable<any> {
    let body = JSON.stringify(vendorCredit);
    return this.httpClient
      .post(this.vendorCreditUrl, body, { headers: this.contentHeaders })
      .pipe(
        map((response) => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  updateVendorCredit(
    vendorCredit: VendorCredit,
    seqVendCredit: number
  ): Observable<any> {
    let body = JSON.stringify(vendorCredit);
    return this.httpClient
      .put(`${this.vendorCreditUrl}/${seqVendCredit}`, body, {
        headers: this.contentHeaders,
      })
      .pipe(
        map((response) => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  partiallyUpdateVendorCredit(
    vendorCredit: VendorCredit,
    seqVendCredit: number
  ): Observable<any> {
    let body = JSON.stringify(vendorCredit);
    return this.httpClient
      .patch(`${this.vendorCreditUrl}/${seqVendCredit}`, body, {
        headers: this.contentHeaders,
      })
      .pipe(
        map((response) => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  deleteVendorCredit(seqVendCredit: number): Observable<any> {
    return this.httpClient
      .delete(`${this.vendorCreditUrl}/${seqVendCredit}`, {
        observe: "response",
      })
      .pipe(
        map((response) => response.body),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  checkCreditVendor(seq_vend_id: string): Observable<any> {
    let params = new HttpParams();
    params = params.append("seq_vend_id", seq_vend_id);
    return this.httpClient
      .get(`${this.vendorCreditUrl}/check_vendorCredit`, {
        params: params,
        headers: this.contentHeaders,
      })
      .pipe(
        map((resp) => resp),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }
  checkCreditVendorAddress(seq_vend_id: string): Observable<any> {
    let params = new HttpParams();
    params = params.append("seq_vend_id", seq_vend_id);
    return this.httpClient
      .get(`${this.vendorCreditUrl}/check_vendorCreditAddress`, {
        params: params,
        headers: this.contentHeaders,
      })
      .pipe(
        map((resp) => resp),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  getVendorCredits_(
    seq_vend_id: string,
    seq_vend_address: string
  ): Observable<any> {
    let params = new HttpParams();
    params = params.append("seq_vend_id", seq_vend_id);
    params = params.append("seq_vend_address", seq_vend_address);

    return this.httpClient
      .get(`${this.vendorCreditUrl}/find-by-vendid&vendAddress`, {
        params: params,
        headers: this.contentHeaders,
      })
      .pipe(
        map((resp) => resp),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  getAdvPayType(): Observable<any> {
    let params = new HttpParams();
    return this.httpClient
      .get(`${this.vendorCreditUrl}/check_advPayType`, {
        params: params,
        headers: this.contentHeaders,
      })
      .pipe(
        map((resp) => resp),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  validateAccountNumber(
    seq_vend_id: string,
    seq_vend_address: string,
    account_number: string
  ) {
    let params = new HttpParams();
    params = params.append("seq_vend_id", seq_vend_id);
    params = params.append("seq_vend_address", seq_vend_address);
    params = params.append("account_number", account_number);
    return this.httpClient
      .get(`${this.vendorCreditUrl}/validate_accountNo`, {
        params: params,
        headers: this.contentHeaders,
      })
      .pipe(
        map((resp) => resp),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  validateCheckNumber(
    seq_vend_id: string,
    seq_vend_address: string,
    account_number: string,
    check_eft_number: string
  ) {
    let params = new HttpParams();
    params = params.append("seq_vend_id", seq_vend_id);
    params = params.append("seq_vend_address", seq_vend_address);
    params = params.append("account_number", account_number);
    params = params.append("check_eft_number", check_eft_number);

    return this.httpClient
      .get(`${this.vendorCreditUrl}/validate_checkNumber`, {
        params: params,
        headers: this.contentHeaders,
      })
      .pipe(
        map((resp) => resp),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  validateOffsetToNumber(
    seq_vend_id: string,
    seq_vend_address: string,
    account_number: string
  ) {
    let params = new HttpParams();
    params = params.append("seq_vend_id", seq_vend_id);
    params = params.append("seq_vend_address", seq_vend_address);
    params = params.append("account_number", account_number);
    return this.httpClient
      .get(`${this.vendorCreditUrl}/validate_offsetToNumber`, {
        params: params,
        headers: this.contentHeaders,
      })
      .pipe(
        map((resp) => resp),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  updateVendorCreditCustom(
    vendorCredit: VendorCredit,
    seqVendCredit: number
  ): Observable<any> {
    let body = JSON.stringify(vendorCredit);
    return this.httpClient
      .put(`${this.vendorCreditUrl}/UpdateCustom/${seqVendCredit}`, body, {
        headers: this.contentHeaders,
      })
      .pipe(
        map((response) => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  callProcedure(seq_vend_credit: any): Observable<any> {
    let body = JSON.stringify(seq_vend_credit);
    return this.httpClient
      .post(`${environment.apiUrl}/spprocessvendorcredit`, body, {
        headers: this.contentHeaders,
      })
      .pipe(catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }));
  }
}
