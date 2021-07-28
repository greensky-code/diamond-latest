/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SmpAdAddresses } from '../api-models/smp-ad-addresses.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SmpAdAddressesService {

    private smpAdAddressesUrl: string = `${environment.apiUrl}/smpadaddresseses`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSmpAdAddresseses(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SmpAdAddresses[]> {
        var url = `${this.smpAdAddressesUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SmpAdAddresses[]),
                catchError(this.sharedService.handleError))
    }

    getSmpAdAddresses(owner : string): Observable<SmpAdAddresses> {
        return this.httpClient.get(`${this.smpAdAddressesUrl}/${owner}`, {observe: 'response'})
            .pipe(map(response => response.body as SmpAdAddresses),
                catchError(this.sharedService.handleError))
    }

    getSmpAdAddressesesCount(): Observable<number> {
        var url = `${this.smpAdAddressesUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSmpAdAddresses(smpAdAddresses : SmpAdAddresses): Observable<any> {
        let body = JSON.stringify(smpAdAddresses);
        return this.httpClient.post(this.smpAdAddressesUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSmpAdAddresses(smpAdAddresses : SmpAdAddresses, owner : string): Observable<any> {
        let body = JSON.stringify(smpAdAddresses);
        return this.httpClient.put(`${this.smpAdAddressesUrl}/${owner}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSmpAdAddresses(smpAdAddresses : SmpAdAddresses, owner : string): Observable<any> {
        let body = JSON.stringify(smpAdAddresses);
        return this.httpClient.patch(`${this.smpAdAddressesUrl}/${owner}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSmpAdAddresses(owner : string): Observable<any> {
        return this.httpClient.delete(`${this.smpAdAddressesUrl}/${owner}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}