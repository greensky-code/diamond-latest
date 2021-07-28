/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { IpaAddressContact } from '../api-models/ipa-address-contact.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class IpaAddressContactService {

    private ipaAddressContactUrl: string = `${environment.apiUrl}/ipaaddresscontacts`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getIpaAddressContacts(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<IpaAddressContact[]> {
        var url = `${this.ipaAddressContactUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as IpaAddressContact[]),
                catchError(this.sharedService.handleError))
    }

    getIpaAddressContact(seqIpaAddrContact : number): Observable<IpaAddressContact> {
        return this.httpClient.get(`${this.ipaAddressContactUrl}/${seqIpaAddrContact}`, {observe: 'response'})
            .pipe(map(response => response.body as IpaAddressContact),
                catchError(this.sharedService.handleError))
    }

    getIpaAddressContactsCount(): Observable<number> {
        var url = `${this.ipaAddressContactUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqIpaAddress(seqIpaAddress : number): Observable<IpaAddressContact[]> {
        return this.httpClient.get(`${this.ipaAddressContactUrl}/find-by-seqipaaddress/${seqIpaAddress}`, {observe: 'response'})
            .pipe(map(response => response.body as IpaAddressContact),
                catchError(this.sharedService.handleError))
    }




    createIpaAddressContact(ipaAddressContact : IpaAddressContact): Observable<any> {
        let body = JSON.stringify(ipaAddressContact);
        return this.httpClient.post(this.ipaAddressContactUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateIpaAddressContact(ipaAddressContact : IpaAddressContact, seqIpaAddrContact : number): Observable<any> {
        let body = JSON.stringify(ipaAddressContact);
        return this.httpClient.put(`${this.ipaAddressContactUrl}/${seqIpaAddrContact}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateIpaAddressContact(ipaAddressContact : IpaAddressContact, seqIpaAddrContact : number): Observable<any> {
        let body = JSON.stringify(ipaAddressContact);
        return this.httpClient.patch(`${this.ipaAddressContactUrl}/${seqIpaAddrContact}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteIpaAddressContact(seqIpaAddrContact : number): Observable<any> {
        return this.httpClient.delete(`${this.ipaAddressContactUrl}/${seqIpaAddrContact}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}