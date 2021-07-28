/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { VendorAdvPayRules } from '../api-models/vendor-adv-pay-rules.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class VendorAdvPayRulesService {

    private vendorAdvPayRulesUrl: string = `${environment.apiUrl}/vendoradvpayruleses`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getVendorAdvPayRuleses(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<VendorAdvPayRules[]> {
        var url = `${this.vendorAdvPayRulesUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as VendorAdvPayRules[]),
                catchError(this.sharedService.handleError))
    }

    getVendorAdvPayRules(advPayType : string): Observable<VendorAdvPayRules> {
        return this.httpClient.get(`${this.vendorAdvPayRulesUrl}/${advPayType}`, {observe: 'response'})
            .pipe(map(response => response.body as VendorAdvPayRules),
                catchError(this.sharedService.handleError))
    }

    getVendorAdvPayRulesesCount(): Observable<number> {
        var url = `${this.vendorAdvPayRulesUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createVendorAdvPayRules(vendorAdvPayRules : VendorAdvPayRules): Observable<any> {
        let body = JSON.stringify(vendorAdvPayRules);
        return this.httpClient.post(this.vendorAdvPayRulesUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateVendorAdvPayRules(vendorAdvPayRules : VendorAdvPayRules, advPayType : string): Observable<any> {
        let body = JSON.stringify(vendorAdvPayRules);
        return this.httpClient.put(`${this.vendorAdvPayRulesUrl}/${advPayType}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateVendorAdvPayRules(vendorAdvPayRules : VendorAdvPayRules, advPayType : string): Observable<any> {
        let body = JSON.stringify(vendorAdvPayRules);
        return this.httpClient.patch(`${this.vendorAdvPayRulesUrl}/${advPayType}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteVendorAdvPayRules(advPayType : string): Observable<any> {
        return this.httpClient.delete(`${this.vendorAdvPayRulesUrl}/${advPayType}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}