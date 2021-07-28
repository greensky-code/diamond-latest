/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PmbTempCustomerWork } from '../api-models/pmb-temp-customer-work.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PmbTempCustomerWorkService {

    private pmbTempCustomerWorkUrl: string = `${environment.apiUrl}/pmbtempcustomerworks`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPmbTempCustomerWorks(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PmbTempCustomerWork[]> {
        var url = `${this.pmbTempCustomerWorkUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PmbTempCustomerWork[]),
                catchError(this.sharedService.handleError))
    }

    getPmbTempCustomerWork(seqGpbilId : number): Observable<PmbTempCustomerWork> {
        return this.httpClient.get(`${this.pmbTempCustomerWorkUrl}/${seqGpbilId}`, {observe: 'response'})
            .pipe(map(response => response.body as PmbTempCustomerWork),
                catchError(this.sharedService.handleError))
    }

    getPmbTempCustomerWorksCount(): Observable<number> {
        var url = `${this.pmbTempCustomerWorkUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createPmbTempCustomerWork(pmbTempCustomerWork : PmbTempCustomerWork): Observable<any> {
        let body = JSON.stringify(pmbTempCustomerWork);
        return this.httpClient.post(this.pmbTempCustomerWorkUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updatePmbTempCustomerWork(pmbTempCustomerWork : PmbTempCustomerWork, seqGpbilId : number): Observable<any> {
        let body = JSON.stringify(pmbTempCustomerWork);
        return this.httpClient.put(`${this.pmbTempCustomerWorkUrl}/${seqGpbilId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdatePmbTempCustomerWork(pmbTempCustomerWork : PmbTempCustomerWork, seqGpbilId : number): Observable<any> {
        let body = JSON.stringify(pmbTempCustomerWork);
        return this.httpClient.patch(`${this.pmbTempCustomerWorkUrl}/${seqGpbilId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deletePmbTempCustomerWork(seqGpbilId : number): Observable<any> {
        return this.httpClient.delete(`${this.pmbTempCustomerWorkUrl}/${seqGpbilId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}