/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { ProvAddressContact } from '../api-models/prov-address-contact.model'
import { environment } from '../../environments/environment'
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProvAddressContactService {

    private provAddressContactUrl: string = `${environment.apiUrl}/provaddresscontacts`;
    private contentHeaders = new HttpHeaders();

    constructor(private httpClient: HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getProvAddressContacts(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<ProvAddressContact[]> {
        var url = `${this.provAddressContactUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as ProvAddressContact[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getProvAddressContact(seqProvContact: number): Observable<ProvAddressContact[]> {
        return this.httpClient.get(`${this.provAddressContactUrl}/${seqProvContact}`, { observe: 'response' })
            .pipe(map(response => response.body as ProvAddressContact),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getProvAddressContactsCount(): Observable<number> {
        var url = `${this.provAddressContactUrl}/count`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findBySeqProvId(seqProvId: number): Observable<ProvAddressContact[]> {
        return this.httpClient.get(`${this.provAddressContactUrl}/find-by-seqprovid/${seqProvId}`, { observe: 'response' })
            .pipe(map(response => response.body as ProvAddressContact),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findBySeqProvAddress(seqProvAddress: number): Observable<ProvAddressContact[]> {
        return this.httpClient.get(`${this.provAddressContactUrl}/find-by-seqprovaddress/${seqProvAddress}`, { observe: 'response' })
            .pipe(map(response => response.body as ProvAddressContact),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByContactTitle(contactTitle: string): Observable<ProvAddressContact[]> {
        return this.httpClient.get(`${this.provAddressContactUrl}/find-by-contacttitle/${contactTitle}`, { observe: 'response' })
            .pipe(map(response => response.body as ProvAddressContact),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }


    createProvAddressContact(provAddressContact: ProvAddressContact): Observable<any> {
        let body = JSON.stringify(provAddressContact);
        return this.httpClient.post(this.provAddressContactUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateProvAddressContact(provAddressContact: ProvAddressContact, seqProvContact: number): Observable<any> {
        let body = JSON.stringify(provAddressContact);
        return this.httpClient.put(`${this.provAddressContactUrl}/${seqProvContact}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    /**
     * update inline grid records
     * @param provAddressContact
     */
    updateAddressContactPersonRecords(provAddressContact: ProvAddressContact[]): Observable<any> {
        let body = JSON.stringify(provAddressContact);
        return this.httpClient.post(`${this.provAddressContactUrl}/update-address-contact-records`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateProvAddressContact(provAddressContact: ProvAddressContact, seqProvContact: number): Observable<any> {
        let body = JSON.stringify(provAddressContact);
        return this.httpClient.patch(`${this.provAddressContactUrl}/${seqProvContact}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteProvAddressContact(seqProvContact: number): Observable<any> {
        return this.httpClient.delete(`${this.provAddressContactUrl}/${seqProvContact}`, { observe: 'response' })
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
