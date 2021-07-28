/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PmbCustomerWork } from '../api-models/pmb-customer-work.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PmbCustomerWorkService {

    private pmbCustomerWorkUrl: string = `${environment.apiUrl}/pmbcustomerworks`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPmbCustomerWorks(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PmbCustomerWork[]> {
        var url = `${this.pmbCustomerWorkUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PmbCustomerWork[]),
                catchError(this.sharedService.handleError))
    }

    getPmbCustomerWork(seqGpbilId : number): Observable<PmbCustomerWork> {
        return this.httpClient.get(`${this.pmbCustomerWorkUrl}/${seqGpbilId}`, {observe: 'response'})
            .pipe(map(response => response.body as PmbCustomerWork),
                catchError(this.sharedService.handleError))
    }

    getPmbCustomerWorksCount(): Observable<number> {
        var url = `${this.pmbCustomerWorkUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqGpbilId(seqGpbilId : number): Observable<PmbCustomerWork[]> {
        return this.httpClient.get(`${this.pmbCustomerWorkUrl}/find-by-seqgpbilid/${seqGpbilId}`, {observe: 'response'})
            .pipe(map(response => response.body as PmbCustomerWork),
                catchError(this.sharedService.handleError))
    }
    findBySeqGpbilId(seqGpbilId : number): Observable<PmbCustomerWork[]> {
        return this.httpClient.get(`${this.pmbCustomerWorkUrl}/find-by-seqgpbilid/${seqGpbilId}`, {observe: 'response'})
            .pipe(map(response => response.body as PmbCustomerWork),
                catchError(this.sharedService.handleError))
    }




    createPmbCustomerWork(pmbCustomerWork : PmbCustomerWork): Observable<any> {
        let body = JSON.stringify(pmbCustomerWork);
        return this.httpClient.post(this.pmbCustomerWorkUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updatePmbCustomerWork(pmbCustomerWork : PmbCustomerWork, seqGpbilId : number): Observable<any> {
        let body = JSON.stringify(pmbCustomerWork);
        return this.httpClient.put(`${this.pmbCustomerWorkUrl}/${seqGpbilId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdatePmbCustomerWork(pmbCustomerWork : PmbCustomerWork, seqGpbilId : number): Observable<any> {
        let body = JSON.stringify(pmbCustomerWork);
        return this.httpClient.patch(`${this.pmbCustomerWorkUrl}/${seqGpbilId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deletePmbCustomerWork(seqGpbilId : number): Observable<any> {
        return this.httpClient.delete(`${this.pmbCustomerWorkUrl}/${seqGpbilId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}