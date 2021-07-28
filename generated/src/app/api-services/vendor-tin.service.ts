/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { VendorTin } from '../api-models/vendor-tin.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class VendorTinService {

    private vendorTinUrl: string = `${environment.apiUrl}/vendortins`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getVendorTins(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<VendorTin[]> {
        var url = `${this.vendorTinUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as VendorTin[]),
                catchError(this.sharedService.handleError))
    }

    getVendorTin(irsTaxId : string): Observable<VendorTin> {
        return this.httpClient.get(`${this.vendorTinUrl}/${irsTaxId}`, {observe: 'response'})
            .pipe(map(response => response.body as VendorTin),
                catchError(this.sharedService.handleError))
    }

    getVendorTinsCount(): Observable<number> {
        var url = `${this.vendorTinUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createVendorTin(vendorTin : VendorTin): Observable<any> {
        let body = JSON.stringify(vendorTin);
        return this.httpClient.post(this.vendorTinUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateVendorTin(vendorTin : VendorTin, irsTaxId : string): Observable<any> {
        let body = JSON.stringify(vendorTin);
        return this.httpClient.put(`${this.vendorTinUrl}/${irsTaxId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateVendorTin(vendorTin : VendorTin, irsTaxId : string): Observable<any> {
        let body = JSON.stringify(vendorTin);
        return this.httpClient.patch(`${this.vendorTinUrl}/${irsTaxId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteVendorTin(irsTaxId : string): Observable<any> {
        return this.httpClient.delete(`${this.vendorTinUrl}/${irsTaxId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}