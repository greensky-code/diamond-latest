/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { VendorAddressContact } from '../api-models/vendor-address-contact.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class VendorAddressContactService {

    private vendorAddressContactUrl: string = `${environment.apiUrl}/vendoraddresscontacts`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getVendorAddressContacts(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<VendorAddressContact[]> {
        var url = `${this.vendorAddressContactUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as VendorAddressContact[]),
                catchError(this.sharedService.handleError))
    }

    getVendorAddressContact(seqVendContact : number): Observable<VendorAddressContact> {
        return this.httpClient.get(`${this.vendorAddressContactUrl}/${seqVendContact}`, {observe: 'response'})
            .pipe(map(response => response.body as VendorAddressContact),
                catchError(this.sharedService.handleError))
    }

    getVendorAddressContactsCount(): Observable<number> {
        var url = `${this.vendorAddressContactUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqVendId(seqVendId : number): Observable<VendorAddressContact[]> {
        return this.httpClient.get(`${this.vendorAddressContactUrl}/find-by-seqvendid/${seqVendId}`, {observe: 'response'})
            .pipe(map(response => response.body as VendorAddressContact),
                catchError(this.sharedService.handleError))
    }
    findBySeqVendAddress(seqVendAddress : number): Observable<VendorAddressContact[]> {
        return this.httpClient.get(`${this.vendorAddressContactUrl}/find-by-seqvendaddress/${seqVendAddress}`, {observe: 'response'})
            .pipe(map(response => response.body as VendorAddressContact),
                catchError(this.sharedService.handleError))
    }
    findByContactTitle(contactTitle : string): Observable<VendorAddressContact[]> {
        return this.httpClient.get(`${this.vendorAddressContactUrl}/find-by-contacttitle/${contactTitle}`, {observe: 'response'})
            .pipe(map(response => response.body as VendorAddressContact),
                catchError(this.sharedService.handleError))
    }




    createVendorAddressContact(vendorAddressContact : VendorAddressContact): Observable<any> {
        let body = JSON.stringify(vendorAddressContact);
        return this.httpClient.post(this.vendorAddressContactUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateVendorAddressContact(vendorAddressContact : VendorAddressContact, seqVendContact : number): Observable<any> {
        let body = JSON.stringify(vendorAddressContact);
        return this.httpClient.put(`${this.vendorAddressContactUrl}/${seqVendContact}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateVendorAddressContact(vendorAddressContact : VendorAddressContact, seqVendContact : number): Observable<any> {
        let body = JSON.stringify(vendorAddressContact);
        return this.httpClient.patch(`${this.vendorAddressContactUrl}/${seqVendContact}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteVendorAddressContact(seqVendContact : number): Observable<any> {
        return this.httpClient.delete(`${this.vendorAddressContactUrl}/${seqVendContact}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}