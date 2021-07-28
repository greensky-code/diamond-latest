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
                catchError(this.sharedService.handleError))
    }

    getProvContractDetRange(claimType : string): Observable<ProvContractDetRange> {
        return this.httpClient.get(`${this.provContractDetRangeUrl}/${claimType}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContractDetRange),
                catchError(this.sharedService.handleError))
    }

    getProvContractDetRangesCount(): Observable<number> {
        var url = `${this.provContractDetRangeUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createProvContractDetRange(provContractDetRange : ProvContractDetRange): Observable<any> {
        let body = JSON.stringify(provContractDetRange);
        return this.httpClient.post(this.provContractDetRangeUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateProvContractDetRange(provContractDetRange : ProvContractDetRange, claimType : string): Observable<any> {
        let body = JSON.stringify(provContractDetRange);
        return this.httpClient.put(`${this.provContractDetRangeUrl}/${claimType}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateProvContractDetRange(provContractDetRange : ProvContractDetRange, claimType : string): Observable<any> {
        let body = JSON.stringify(provContractDetRange);
        return this.httpClient.patch(`${this.provContractDetRangeUrl}/${claimType}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteProvContractDetRange(claimType : string): Observable<any> {
        return this.httpClient.delete(`${this.provContractDetRangeUrl}/${claimType}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}