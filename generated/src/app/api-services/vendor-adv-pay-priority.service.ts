/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { VendorAdvPayPriority } from '../api-models/vendor-adv-pay-priority.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class VendorAdvPayPriorityService {

    private vendorAdvPayPriorityUrl: string = `${environment.apiUrl}/vendoradvpayprioritys`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getVendorAdvPayPrioritys(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<VendorAdvPayPriority[]> {
        var url = `${this.vendorAdvPayPriorityUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as VendorAdvPayPriority[]),
                catchError(this.sharedService.handleError))
    }

    getVendorAdvPayPriority(seqVendAdvPayPriority : number): Observable<VendorAdvPayPriority> {
        return this.httpClient.get(`${this.vendorAdvPayPriorityUrl}/${seqVendAdvPayPriority}`, {observe: 'response'})
            .pipe(map(response => response.body as VendorAdvPayPriority),
                catchError(this.sharedService.handleError))
    }

    getVendorAdvPayPrioritysCount(): Observable<number> {
        var url = `${this.vendorAdvPayPriorityUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqVendId(seqVendId : number): Observable<VendorAdvPayPriority[]> {
        return this.httpClient.get(`${this.vendorAdvPayPriorityUrl}/find-by-seqvendid/${seqVendId}`, {observe: 'response'})
            .pipe(map(response => response.body as VendorAdvPayPriority),
                catchError(this.sharedService.handleError))
    }




    createVendorAdvPayPriority(vendorAdvPayPriority : VendorAdvPayPriority): Observable<any> {
        let body = JSON.stringify(vendorAdvPayPriority);
        return this.httpClient.post(this.vendorAdvPayPriorityUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateVendorAdvPayPriority(vendorAdvPayPriority : VendorAdvPayPriority, seqVendAdvPayPriority : number): Observable<any> {
        let body = JSON.stringify(vendorAdvPayPriority);
        return this.httpClient.put(`${this.vendorAdvPayPriorityUrl}/${seqVendAdvPayPriority}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateVendorAdvPayPriority(vendorAdvPayPriority : VendorAdvPayPriority, seqVendAdvPayPriority : number): Observable<any> {
        let body = JSON.stringify(vendorAdvPayPriority);
        return this.httpClient.patch(`${this.vendorAdvPayPriorityUrl}/${seqVendAdvPayPriority}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteVendorAdvPayPriority(seqVendAdvPayPriority : number): Observable<any> {
        return this.httpClient.delete(`${this.vendorAdvPayPriorityUrl}/${seqVendAdvPayPriority}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}