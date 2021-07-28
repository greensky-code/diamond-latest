/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AccountsPayable } from '../api-models/accounts-payable.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class AccountsPayableService {
  private accountsPayableUrl: string = `${environment.apiUrl}/accountspayables`;
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

  getAccountsPayables(
    usePagination: boolean = false,
    page: number = 0,
    size: number = 0
  ): Observable<AccountsPayable[]> {
    var url = `${this.accountsPayableUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
    return this.httpClient.get(url, { observe: "response" }).pipe(
      map((response) => response.body as AccountsPayable[]),
      catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
    );
  }

  getAccountsPayable(seqApTrans: number): Observable<AccountsPayable> {
    return this.httpClient
      .get(`${this.accountsPayableUrl}/${seqApTrans}`, { observe: "response" })
      .pipe(
        map((response) => response.body as AccountsPayable),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  getAccountsPayablesCount(): Observable<number> {
    var url = `${this.accountsPayableUrl}/count`;
    return this.httpClient.get(url, { observe: "response" }).pipe(
      map((response) => response.body as number),
      catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
    );
  }

  findByOffsetSeqVadpyDtl(
    offsetSeqVadpyDtl: number
  ): Observable<AccountsPayable[]> {
    return this.httpClient
      .get(
        `${this.accountsPayableUrl}/find-by-offsetseqvadpydtl/${offsetSeqVadpyDtl}`,
        { observe: "response" }
      )
      .pipe(
        map((response) => response.body as AccountsPayable),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }
  findBySeqVendId(seqVendId: number): Observable<AccountsPayable[]> {
    return this.httpClient
      .get(`${this.accountsPayableUrl}/find-by-seqvendid/${seqVendId}`, {
        observe: "response",
      })
      .pipe(
        map((response) => response.body as AccountsPayable),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }
  findBySeqVendAddress(seqVendAddress: number): Observable<AccountsPayable[]> {
    return this.httpClient
      .get(
        `${this.accountsPayableUrl}/find-by-seqvendaddress/${seqVendAddress}`,
        { observe: "response" }
      )
      .pipe(
        map((response) => response.body as AccountsPayable),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }
  findByCompanyCode(companyCode: string): Observable<AccountsPayable[]> {
    return this.httpClient
      .get(`${this.accountsPayableUrl}/find-by-companycode/${companyCode}`, {
        observe: "response",
      })
      .pipe(
        map((response) => response.body as AccountsPayable),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }
  findByBankAccountCode(
    bankAccountCode: string
  ): Observable<AccountsPayable[]> {
    return this.httpClient
      .get(
        `${this.accountsPayableUrl}/find-by-bankaccountcode/${bankAccountCode}`,
        { observe: "response" }
      )
      .pipe(
        map((response) => response.body as AccountsPayable),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }
  findByCapFundModelId(capFundModelId: string): Observable<AccountsPayable[]> {
    return this.httpClient
      .get(
        `${this.accountsPayableUrl}/find-by-capfundmodelid/${capFundModelId}`,
        { observe: "response" }
      )
      .pipe(
        map((response) => response.body as AccountsPayable),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  createAccountsPayable(accountsPayable: AccountsPayable): Observable<any> {
    let body = JSON.stringify(accountsPayable);
    return this.httpClient
      .post(this.accountsPayableUrl, body, { headers: this.contentHeaders })
      .pipe(
        map((response) => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  updateAccountsPayable(
    accountsPayable: AccountsPayable,
    seqApTrans: number
  ): Observable<any> {
    let body = JSON.stringify(accountsPayable);
    return this.httpClient
      .put(`${this.accountsPayableUrl}/${seqApTrans}`, body, {
        headers: this.contentHeaders,
      })
      .pipe(
        map((response) => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  partiallyUpdateAccountsPayable(
    accountsPayable: AccountsPayable,
    seqApTrans: number
  ): Observable<any> {
    let body = JSON.stringify(accountsPayable);
    return this.httpClient
      .patch(`${this.accountsPayableUrl}/${seqApTrans}`, body, {
        headers: this.contentHeaders,
      })
      .pipe(
        map((response) => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  deleteAccountsPayable(seqApTrans: number): Observable<any> {
    return this.httpClient
      .delete(`${this.accountsPayableUrl}/${seqApTrans}`, {
        observe: "response",
      })
      .pipe(
        map((response) => response.body),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  getCreditBalance(seq_vend_id: string): Observable<any> {
    let params = new HttpParams();
    params = params.append("seq_vend_id", seq_vend_id);
    return this.httpClient
      .get(`${this.accountsPayableUrl}/find-credit-balance`, {
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

    getClaimProfessinal(seq_ap_trans: string, seq_claim_id: string): Observable<any> {
        let params = new HttpParams();
        params = params.append("seq_ap_trans", seq_ap_trans);
        params = params.append("seq_claim_id", seq_claim_id);
        return this.httpClient
            .get(`${this.accountsPayableUrl}/vendor/claim/professional`, {
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

    getVendorInfo(seq_vend_id: string, seq_vend_address: string): Observable<any> {
        let params = new HttpParams();
        params = params.append("seq_vend_id", seq_vend_id);
        params = params.append("seq_vend_address", seq_vend_address);
        return this.httpClient
            .get(`${this.accountsPayableUrl}/vendor/vendorInfo`, {
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

    getApTransDetails(seq_ap_trans: string ): Observable<any> {
        let params = new HttpParams();
        params = params.append("seq_ap_trans", seq_ap_trans);
        return this.httpClient
            .get(`${this.accountsPayableUrl}/vendor/apTransDetails`, {
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

    getClaimInstitutional(seqApTrans: string): Observable<any> {
        let params = new HttpParams();
        params = params.append("seq_ap_trans", seqApTrans);
        return this.httpClient
            .get(`${this.accountsPayableUrl}/vendor/claim/institutional`, {
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

    getClaimDental(seq_ap_trans: string, seq_claim_id: string): Observable<any> {
        let params = new HttpParams();
        params = params.append("seq_ap_trans", seq_ap_trans);
        params = params.append("seq_claim_id", seq_claim_id);
        return this.httpClient
            .get(`${this.accountsPayableUrl}/vendor/claim/dental`, {
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
}
