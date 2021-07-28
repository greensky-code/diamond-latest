/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { VendorAdvPayAccount } from '../api-models/vendor-adv-pay-account.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class VendorAdvPayAccountService {

    private vendorAdvPayAccountUrl: string = `${environment.apiUrl}/vendoradvpayaccounts`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getVendorAdvPayAccounts(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<VendorAdvPayAccount[]> {
        var url = `${this.vendorAdvPayAccountUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as VendorAdvPayAccount[]),
                catchError(this.sharedService.handleError))
    }

    getVendorAdvPayAccount(seqVendAdvPayAcc : number): Observable<VendorAdvPayAccount> {
        return this.httpClient.get(`${this.vendorAdvPayAccountUrl}/${seqVendAdvPayAcc}`, {observe: 'response'})
            .pipe(map(response => response.body as VendorAdvPayAccount),
                catchError(this.sharedService.handleError))
    }

    getVendorAdvPayAccountsCount(): Observable<number> {
        var url = `${this.vendorAdvPayAccountUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqVendId(seqVendId : number): Observable<VendorAdvPayAccount[]> {
        return this.httpClient.get(`${this.vendorAdvPayAccountUrl}/find-by-seqvendid/${seqVendId}`, {observe: 'response'})
            .pipe(map(response => response.body as VendorAdvPayAccount),
                catchError(this.sharedService.handleError))
    }
    findBySeqVendAddress(seqVendAddress : number): Observable<VendorAdvPayAccount[]> {
        return this.httpClient.get(`${this.vendorAdvPayAccountUrl}/find-by-seqvendaddress/${seqVendAddress}`, {observe: 'response'})
            .pipe(map(response => response.body as VendorAdvPayAccount),
                catchError(this.sharedService.handleError))
    }




    createVendorAdvPayAccount(vendorAdvPayAccount : VendorAdvPayAccount): Observable<any> {
        let body = JSON.stringify(vendorAdvPayAccount);
        return this.httpClient.post(this.vendorAdvPayAccountUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateVendorAdvPayAccount(vendorAdvPayAccount : VendorAdvPayAccount, seqVendAdvPayAcc : number): Observable<any> {
        let body = JSON.stringify(vendorAdvPayAccount);
        return this.httpClient.put(`${this.vendorAdvPayAccountUrl}/${seqVendAdvPayAcc}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateVendorAdvPayAccount(vendorAdvPayAccount : VendorAdvPayAccount, seqVendAdvPayAcc : number): Observable<any> {
        let body = JSON.stringify(vendorAdvPayAccount);
        return this.httpClient.patch(`${this.vendorAdvPayAccountUrl}/${seqVendAdvPayAcc}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteVendorAdvPayAccount(seqVendAdvPayAcc : number): Observable<any> {
        return this.httpClient.delete(`${this.vendorAdvPayAccountUrl}/${seqVendAdvPayAcc}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}