/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { IpaAffltAddrContact } from '../api-models/ipa-afflt-addr-contact.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class IpaAffltAddrContactService {

    private ipaAffltAddrContactUrl: string = `${environment.apiUrl}/ipaaffltaddrcontacts`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getIpaAffltAddrContacts(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<IpaAffltAddrContact[]> {
        var url = `${this.ipaAffltAddrContactUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as IpaAffltAddrContact[]),
                catchError(this.sharedService.handleError))
    }

    getIpaAffltAddrContact(seqIpaAffltAddrCtat : number): Observable<IpaAffltAddrContact> {
        return this.httpClient.get(`${this.ipaAffltAddrContactUrl}/${seqIpaAffltAddrCtat}`, {observe: 'response'})
            .pipe(map(response => response.body as IpaAffltAddrContact),
                catchError(this.sharedService.handleError))
    }

    getIpaAffltAddrContactsCount(): Observable<number> {
        var url = `${this.ipaAffltAddrContactUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqIpaAffltAddress(seqIpaAffltAddress : number): Observable<IpaAffltAddrContact[]> {
        return this.httpClient.get(`${this.ipaAffltAddrContactUrl}/find-by-seqipaaffltaddress/${seqIpaAffltAddress}`, {observe: 'response'})
            .pipe(map(response => response.body as IpaAffltAddrContact),
                catchError(this.sharedService.handleError))
    }




    createIpaAffltAddrContact(ipaAffltAddrContact : IpaAffltAddrContact): Observable<any> {
        let body = JSON.stringify(ipaAffltAddrContact);
        return this.httpClient.post(this.ipaAffltAddrContactUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateIpaAffltAddrContact(ipaAffltAddrContact : IpaAffltAddrContact, seqIpaAffltAddrCtat : number): Observable<any> {
        let body = JSON.stringify(ipaAffltAddrContact);
        return this.httpClient.put(`${this.ipaAffltAddrContactUrl}/${seqIpaAffltAddrCtat}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateIpaAffltAddrContact(ipaAffltAddrContact : IpaAffltAddrContact, seqIpaAffltAddrCtat : number): Observable<any> {
        let body = JSON.stringify(ipaAffltAddrContact);
        return this.httpClient.patch(`${this.ipaAffltAddrContactUrl}/${seqIpaAffltAddrCtat}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteIpaAffltAddrContact(seqIpaAffltAddrCtat : number): Observable<any> {
        return this.httpClient.delete(`${this.ipaAffltAddrContactUrl}/${seqIpaAffltAddrCtat}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}