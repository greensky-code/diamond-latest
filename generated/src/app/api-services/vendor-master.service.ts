/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { VendorMaster } from '../api-models/vendor-master.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class VendorMasterService {

    private vendorMasterUrl: string = `${environment.apiUrl}/vendormasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getVendorMasters(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<VendorMaster[]> {
        var url = `${this.vendorMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as VendorMaster[]),
                catchError(this.sharedService.handleError))
    }

    getVendorMaster(seqVendId : number): Observable<VendorMaster> {
        return this.httpClient.get(`${this.vendorMasterUrl}/${seqVendId}`, {observe: 'response'})
            .pipe(map(response => response.body as VendorMaster),
                catchError(this.sharedService.handleError))
    }

    getVendorMastersCount(): Observable<number> {
        var url = `${this.vendorMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createVendorMaster(vendorMaster : VendorMaster): Observable<any> {
        let body = JSON.stringify(vendorMaster);
        return this.httpClient.post(this.vendorMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateVendorMaster(vendorMaster : VendorMaster, seqVendId : number): Observable<any> {
        let body = JSON.stringify(vendorMaster);
        return this.httpClient.put(`${this.vendorMasterUrl}/${seqVendId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateVendorMaster(vendorMaster : VendorMaster, seqVendId : number): Observable<any> {
        let body = JSON.stringify(vendorMaster);
        return this.httpClient.patch(`${this.vendorMasterUrl}/${seqVendId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteVendorMaster(seqVendId : number): Observable<any> {
        return this.httpClient.delete(`${this.vendorMasterUrl}/${seqVendId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}