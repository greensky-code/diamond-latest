/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { IpaAddress } from '../api-models/ipa-address.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class IpaAddressService {

    private ipaAddressUrl: string = `${environment.apiUrl}/ipaaddresses`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getIpaAddresses(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<IpaAddress[]> {
        var url = `${this.ipaAddressUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as IpaAddress[]),
                catchError(this.sharedService.handleError))
    }

    getIpaAddress(seqIpaAddress : number): Observable<IpaAddress> {
        return this.httpClient.get(`${this.ipaAddressUrl}/${seqIpaAddress}`, {observe: 'response'})
            .pipe(map(response => response.body as IpaAddress),
                catchError(this.sharedService.handleError))
    }

    getIpaAddressesCount(): Observable<number> {
        var url = `${this.ipaAddressUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByIpaId(ipaId : string): Observable<IpaAddress[]> {
        return this.httpClient.get(`${this.ipaAddressUrl}/find-by-ipaid/${ipaId}`, {observe: 'response'})
            .pipe(map(response => response.body as IpaAddress),
                catchError(this.sharedService.handleError))
    }




    createIpaAddress(ipaAddress : IpaAddress): Observable<any> {
        let body = JSON.stringify(ipaAddress);
        return this.httpClient.post(this.ipaAddressUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateIpaAddress(ipaAddress : IpaAddress, seqIpaAddress : number): Observable<any> {
        let body = JSON.stringify(ipaAddress);
        return this.httpClient.put(`${this.ipaAddressUrl}/${seqIpaAddress}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateIpaAddress(ipaAddress : IpaAddress, seqIpaAddress : number): Observable<any> {
        let body = JSON.stringify(ipaAddress);
        return this.httpClient.patch(`${this.ipaAddressUrl}/${seqIpaAddress}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteIpaAddress(seqIpaAddress : number): Observable<any> {
        return this.httpClient.delete(`${this.ipaAddressUrl}/${seqIpaAddress}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}