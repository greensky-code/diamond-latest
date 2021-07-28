/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProvContractDetRange } from '../api-models/prov-contract-det-range.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ProvContractDetRangeService {

    private provContractDetRangeUrl: string = `${environment.apiUrl}/provcontractdetranges`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getProvContractDetRanges(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ProvContractDetRange[]> {
        var url = `${this.provContractDetRangeUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ProvContractDetRange[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getProvContractDetRange(claimType : string): Observable<ProvContractDetRange> {
        return this.httpClient.get(`${this.provContractDetRangeUrl}/${claimType}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContractDetRange),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getProvContractDetRangesCount(): Observable<number> {
        var url = `${this.provContractDetRangeUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }





    createProvContractDetRange(provContractDetRange : ProvContractDetRange): Observable<any> {
        let body = JSON.stringify(provContractDetRange);
        return this.httpClient.post(this.provContractDetRangeUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateProvContractDetRange(provContractDetRange : ProvContractDetRange, claimType : string): Observable<any> {
        let body = JSON.stringify(provContractDetRange);
        return this.httpClient.put(`${this.provContractDetRangeUrl}/${claimType}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateProvContractDetRange(provContractDetRange : ProvContractDetRange, claimType : string): Observable<any> {
        let body = JSON.stringify(provContractDetRange);
        return this.httpClient.patch(`${this.provContractDetRangeUrl}/${claimType}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteProvContractDetRange(claimType : string): Observable<any> {
        return this.httpClient.delete(`${this.provContractDetRangeUrl}/${claimType}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByDetails(DET_SRCH_SEQUENCE: any, DET_SRCH_ORDER: any, seqVendAddrss: any, seqVendId: any, seqProvContract: any, CLAIM_TYPE: any): Observable<any> {
        return this.httpClient.get(`${this.provContractDetRangeUrl}/${DET_SRCH_SEQUENCE}/${DET_SRCH_ORDER}/${seqVendAddrss}/${seqVendId}/${seqProvContract}/${CLAIM_TYPE}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateContractDetRange(priceDetRanges: ProvContractDetRange[]) {
        let body = JSON.stringify(priceDetRanges);
        return this.httpClient.post(`${this.provContractDetRangeUrl}/updateContractDetRange`, body, { headers: this.contentHeaders })
            .pipe(map(response => response));
    }
}
