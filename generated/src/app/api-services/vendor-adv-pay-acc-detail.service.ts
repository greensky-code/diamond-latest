/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { VendorAdvPayAccDetail } from '../api-models/vendor-adv-pay-acc-detail.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class VendorAdvPayAccDetailService {

    private vendorAdvPayAccDetailUrl: string = `${environment.apiUrl}/vendoradvpayaccdetails`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getVendorAdvPayAccDetails(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<VendorAdvPayAccDetail[]> {
        var url = `${this.vendorAdvPayAccDetailUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as VendorAdvPayAccDetail[]),
                catchError(this.sharedService.handleError))
    }

    getVendorAdvPayAccDetail(seqVendAdvPayAccDtl : number): Observable<VendorAdvPayAccDetail> {
        return this.httpClient.get(`${this.vendorAdvPayAccDetailUrl}/${seqVendAdvPayAccDtl}`, {observe: 'response'})
            .pipe(map(response => response.body as VendorAdvPayAccDetail),
                catchError(this.sharedService.handleError))
    }

    getVendorAdvPayAccDetailsCount(): Observable<number> {
        var url = `${this.vendorAdvPayAccDetailUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqVendAdvPayAccDtl(seqVendAdvPayAccDtl : number): Observable<VendorAdvPayAccDetail[]> {
        return this.httpClient.get(`${this.vendorAdvPayAccDetailUrl}/find-by-seqvendadvpayaccdtl/${seqVendAdvPayAccDtl}`, {observe: 'response'})
            .pipe(map(response => response.body as VendorAdvPayAccDetail),
                catchError(this.sharedService.handleError))
    }




    createVendorAdvPayAccDetail(vendorAdvPayAccDetail : VendorAdvPayAccDetail): Observable<any> {
        let body = JSON.stringify(vendorAdvPayAccDetail);
        return this.httpClient.post(this.vendorAdvPayAccDetailUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateVendorAdvPayAccDetail(vendorAdvPayAccDetail : VendorAdvPayAccDetail, seqVendAdvPayAccDtl : number): Observable<any> {
        let body = JSON.stringify(vendorAdvPayAccDetail);
        return this.httpClient.put(`${this.vendorAdvPayAccDetailUrl}/${seqVendAdvPayAccDtl}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateVendorAdvPayAccDetail(vendorAdvPayAccDetail : VendorAdvPayAccDetail, seqVendAdvPayAccDtl : number): Observable<any> {
        let body = JSON.stringify(vendorAdvPayAccDetail);
        return this.httpClient.patch(`${this.vendorAdvPayAccDetailUrl}/${seqVendAdvPayAccDtl}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteVendorAdvPayAccDetail(seqVendAdvPayAccDtl : number): Observable<any> {
        return this.httpClient.delete(`${this.vendorAdvPayAccDetailUrl}/${seqVendAdvPayAccDtl}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}