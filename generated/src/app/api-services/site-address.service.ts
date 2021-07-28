/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SiteAddress } from '../api-models/site-address.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SiteAddressService {

    private siteAddressUrl: string = `${environment.apiUrl}/siteaddresses`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSiteAddresses(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SiteAddress[]> {
        var url = `${this.siteAddressUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SiteAddress[]),
                catchError(this.sharedService.handleError))
    }

    getSiteAddress(siteCode : string): Observable<SiteAddress> {
        return this.httpClient.get(`${this.siteAddressUrl}/${siteCode}`, {observe: 'response'})
            .pipe(map(response => response.body as SiteAddress),
                catchError(this.sharedService.handleError))
    }

    getSiteAddressesCount(): Observable<number> {
        var url = `${this.siteAddressUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByTermReasonCode(termReasonCode : string): Observable<SiteAddress[]> {
        return this.httpClient.get(`${this.siteAddressUrl}/find-by-termreasoncode/${termReasonCode}`, {observe: 'response'})
            .pipe(map(response => response.body as SiteAddress),
                catchError(this.sharedService.handleError))
    }
    findBySiteCode(siteCode : string): Observable<SiteAddress[]> {
        return this.httpClient.get(`${this.siteAddressUrl}/find-by-sitecode/${siteCode}`, {observe: 'response'})
            .pipe(map(response => response.body as SiteAddress),
                catchError(this.sharedService.handleError))
    }




    createSiteAddress(siteAddress : SiteAddress): Observable<any> {
        let body = JSON.stringify(siteAddress);
        return this.httpClient.post(this.siteAddressUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSiteAddress(siteAddress : SiteAddress, siteCode : string): Observable<any> {
        let body = JSON.stringify(siteAddress);
        return this.httpClient.put(`${this.siteAddressUrl}/${siteCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSiteAddress(siteAddress : SiteAddress, siteCode : string): Observable<any> {
        let body = JSON.stringify(siteAddress);
        return this.httpClient.patch(`${this.siteAddressUrl}/${siteCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSiteAddress(siteCode : string): Observable<any> {
        return this.httpClient.delete(`${this.siteAddressUrl}/${siteCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}