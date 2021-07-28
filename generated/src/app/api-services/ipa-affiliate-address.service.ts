/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { IpaAffiliateAddress } from '../api-models/ipa-affiliate-address.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class IpaAffiliateAddressService {

    private ipaAffiliateAddressUrl: string = `${environment.apiUrl}/ipaaffiliateaddresses`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getIpaAffiliateAddresses(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<IpaAffiliateAddress[]> {
        var url = `${this.ipaAffiliateAddressUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as IpaAffiliateAddress[]),
                catchError(this.sharedService.handleError))
    }

    getIpaAffiliateAddress(seqIpaAffltAddress : number): Observable<IpaAffiliateAddress> {
        return this.httpClient.get(`${this.ipaAffiliateAddressUrl}/${seqIpaAffltAddress}`, {observe: 'response'})
            .pipe(map(response => response.body as IpaAffiliateAddress),
                catchError(this.sharedService.handleError))
    }

    getIpaAffiliateAddressesCount(): Observable<number> {
        var url = `${this.ipaAffiliateAddressUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByIpaId(ipaId : string): Observable<IpaAffiliateAddress[]> {
        return this.httpClient.get(`${this.ipaAffiliateAddressUrl}/find-by-ipaid/${ipaId}`, {observe: 'response'})
            .pipe(map(response => response.body as IpaAffiliateAddress),
                catchError(this.sharedService.handleError))
    }




    createIpaAffiliateAddress(ipaAffiliateAddress : IpaAffiliateAddress): Observable<any> {
        let body = JSON.stringify(ipaAffiliateAddress);
        return this.httpClient.post(this.ipaAffiliateAddressUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateIpaAffiliateAddress(ipaAffiliateAddress : IpaAffiliateAddress, seqIpaAffltAddress : number): Observable<any> {
        let body = JSON.stringify(ipaAffiliateAddress);
        return this.httpClient.put(`${this.ipaAffiliateAddressUrl}/${seqIpaAffltAddress}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateIpaAffiliateAddress(ipaAffiliateAddress : IpaAffiliateAddress, seqIpaAffltAddress : number): Observable<any> {
        let body = JSON.stringify(ipaAffiliateAddress);
        return this.httpClient.patch(`${this.ipaAffiliateAddressUrl}/${seqIpaAffltAddress}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteIpaAffiliateAddress(seqIpaAffltAddress : number): Observable<any> {
        return this.httpClient.delete(`${this.ipaAffiliateAddressUrl}/${seqIpaAffltAddress}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}