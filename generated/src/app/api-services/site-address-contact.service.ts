/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SiteAddressContact } from '../api-models/site-address-contact.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SiteAddressContactService {

    private siteAddressContactUrl: string = `${environment.apiUrl}/siteaddresscontacts`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSiteAddressContacts(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SiteAddressContact[]> {
        var url = `${this.siteAddressContactUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SiteAddressContact[]),
                catchError(this.sharedService.handleError))
    }

    getSiteAddressContact(siteCode : string): Observable<SiteAddressContact> {
        return this.httpClient.get(`${this.siteAddressContactUrl}/${siteCode}`, {observe: 'response'})
            .pipe(map(response => response.body as SiteAddressContact),
                catchError(this.sharedService.handleError))
    }

    getSiteAddressContactsCount(): Observable<number> {
        var url = `${this.siteAddressContactUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByContactTitle(contactTitle : string): Observable<SiteAddressContact[]> {
        return this.httpClient.get(`${this.siteAddressContactUrl}/find-by-contacttitle/${contactTitle}`, {observe: 'response'})
            .pipe(map(response => response.body as SiteAddressContact),
                catchError(this.sharedService.handleError))
    }




    createSiteAddressContact(siteAddressContact : SiteAddressContact): Observable<any> {
        let body = JSON.stringify(siteAddressContact);
        return this.httpClient.post(this.siteAddressContactUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSiteAddressContact(siteAddressContact : SiteAddressContact, siteCode : string): Observable<any> {
        let body = JSON.stringify(siteAddressContact);
        return this.httpClient.put(`${this.siteAddressContactUrl}/${siteCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSiteAddressContact(siteAddressContact : SiteAddressContact, siteCode : string): Observable<any> {
        let body = JSON.stringify(siteAddressContact);
        return this.httpClient.patch(`${this.siteAddressContactUrl}/${siteCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSiteAddressContact(siteCode : string): Observable<any> {
        return this.httpClient.delete(`${this.siteAddressContactUrl}/${siteCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}