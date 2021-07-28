/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProvContractVendor } from '../api-models/prov-contract-vendor.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ProvContractVendorService {

    private provContractVendorUrl: string = `${environment.apiUrl}/provcontractvendors`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getProvContractVendors(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ProvContractVendor[]> {
        var url = `${this.provContractVendorUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ProvContractVendor[]),
                catchError(this.sharedService.handleError))
    }

    getProvContractVendor(seqProvVendId : number): Observable<ProvContractVendor> {
        return this.httpClient.get(`${this.provContractVendorUrl}/${seqProvVendId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContractVendor),
                catchError(this.sharedService.handleError))
    }

    getProvContractVendorsCount(): Observable<number> {
        var url = `${this.provContractVendorUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqProvContract(seqProvContract : number): Observable<ProvContractVendor[]> {
        return this.httpClient.get(`${this.provContractVendorUrl}/find-by-seqprovcontract/${seqProvContract}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContractVendor),
                catchError(this.sharedService.handleError))
    }
    findBySeqProvId(seqProvId : number): Observable<ProvContractVendor[]> {
        return this.httpClient.get(`${this.provContractVendorUrl}/find-by-seqprovid/${seqProvId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContractVendor),
                catchError(this.sharedService.handleError))
    }
    findBySeqVendAddress(seqVendAddress : number): Observable<ProvContractVendor[]> {
        return this.httpClient.get(`${this.provContractVendorUrl}/find-by-seqvendaddress/${seqVendAddress}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContractVendor),
                catchError(this.sharedService.handleError))
    }
    findBySeqVendId(seqVendId : number): Observable<ProvContractVendor[]> {
        return this.httpClient.get(`${this.provContractVendorUrl}/find-by-seqvendid/${seqVendId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContractVendor),
                catchError(this.sharedService.handleError))
    }




    createProvContractVendor(provContractVendor : ProvContractVendor): Observable<any> {
        let body = JSON.stringify(provContractVendor);
        return this.httpClient.post(this.provContractVendorUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateProvContractVendor(provContractVendor : ProvContractVendor, seqProvVendId : number): Observable<any> {
        let body = JSON.stringify(provContractVendor);
        return this.httpClient.put(`${this.provContractVendorUrl}/${seqProvVendId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateProvContractVendor(provContractVendor : ProvContractVendor, seqProvVendId : number): Observable<any> {
        let body = JSON.stringify(provContractVendor);
        return this.httpClient.patch(`${this.provContractVendorUrl}/${seqProvVendId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteProvContractVendor(seqProvVendId : number): Observable<any> {
        return this.httpClient.delete(`${this.provContractVendorUrl}/${seqProvVendId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError));
    }
}
