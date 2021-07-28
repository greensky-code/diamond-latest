/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProvAddressContact } from '../api-models/prov-address-contact.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ProvAddressContactService {

    private provAddressContactUrl: string = `${environment.apiUrl}/provaddresscontacts`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getProvAddressContacts(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ProvAddressContact[]> {
        var url = `${this.provAddressContactUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ProvAddressContact[]),
                catchError(this.sharedService.handleError))
    }

    getProvAddressContact(seqProvContact : number): Observable<ProvAddressContact> {
        return this.httpClient.get(`${this.provAddressContactUrl}/${seqProvContact}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvAddressContact),
                catchError(this.sharedService.handleError))
    }

    getProvAddressContactsCount(): Observable<number> {
        var url = `${this.provAddressContactUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqProvId(seqProvId : number): Observable<ProvAddressContact[]> {
        return this.httpClient.get(`${this.provAddressContactUrl}/find-by-seqprovid/${seqProvId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvAddressContact),
                catchError(this.sharedService.handleError))
    }
    findBySeqProvAddress(seqProvAddress : number): Observable<ProvAddressContact[]> {
        return this.httpClient.get(`${this.provAddressContactUrl}/find-by-seqprovaddress/${seqProvAddress}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvAddressContact),
                catchError(this.sharedService.handleError))
    }
    findByContactTitle(contactTitle : string): Observable<ProvAddressContact[]> {
        return this.httpClient.get(`${this.provAddressContactUrl}/find-by-contacttitle/${contactTitle}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvAddressContact),
                catchError(this.sharedService.handleError))
    }




    createProvAddressContact(provAddressContact : ProvAddressContact): Observable<any> {
        let body = JSON.stringify(provAddressContact);
        return this.httpClient.post(this.provAddressContactUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateProvAddressContact(provAddressContact : ProvAddressContact, seqProvContact : number): Observable<any> {
        let body = JSON.stringify(provAddressContact);
        return this.httpClient.put(`${this.provAddressContactUrl}/${seqProvContact}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateProvAddressContact(provAddressContact : ProvAddressContact, seqProvContact : number): Observable<any> {
        let body = JSON.stringify(provAddressContact);
        return this.httpClient.patch(`${this.provAddressContactUrl}/${seqProvContact}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteProvAddressContact(seqProvContact : number): Observable<any> {
        return this.httpClient.delete(`${this.provAddressContactUrl}/${seqProvContact}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}