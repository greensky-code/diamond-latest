/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getVendorCredits(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<VendorCredit[]> {
        var url = `${this.vendorCreditUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as VendorCredit[]),
                catchError(this.sharedService.handleError))
    }

    getVendorCredit(seqVendCredit : number): Observable<VendorCredit> {
        return this.httpClient.get(`${this.vendorCreditUrl}/${seqVendCredit}`, {observe: 'response'})
            .pipe(map(response => response.body as VendorCredit),
                catchError(this.sharedService.handleError))
    }

    getVendorCreditsCount(): Observable<number> {
        var url = `${this.vendorCreditUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createVendorCredit(vendorCredit : VendorCredit): Observable<any> {
        let body = JSON.stringify(vendorCredit);
        return this.httpClient.post(this.vendorCreditUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateVendorCredit(vendorCredit : VendorCredit, seqVendCredit : number): Observable<any> {
        let body = JSON.stringify(vendorCredit);
        return this.httpClient.put(`${this.vendorCreditUrl}/${seqVendCredit}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateVendorCredit(vendorCredit : VendorCredit, seqVendCredit : number): Observable<any> {
        let body = JSON.stringify(vendorCredit);
        return this.httpClient.patch(`${this.vendorCreditUrl}/${seqVendCredit}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteVendorCredit(seqVendCredit : number): Observable<any> {
        return this.httpClient.delete(`${this.vendorCreditUrl}/${seqVendCredit}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}