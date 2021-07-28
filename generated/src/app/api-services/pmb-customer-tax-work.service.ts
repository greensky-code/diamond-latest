/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PmbCustomerTaxWork } from '../api-models/pmb-customer-tax-work.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PmbCustomerTaxWorkService {

    private pmbCustomerTaxWorkUrl: string = `${environment.apiUrl}/pmbcustomertaxworks`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPmbCustomerTaxWorks(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PmbCustomerTaxWork[]> {
        var url = `${this.pmbCustomerTaxWorkUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PmbCustomerTaxWork[]),
                catchError(this.sharedService.handleError))
    }

    getPmbCustomerTaxWork(seqGpbilId : number): Observable<PmbCustomerTaxWork> {
        return this.httpClient.get(`${this.pmbCustomerTaxWorkUrl}/${seqGpbilId}`, {observe: 'response'})
            .pipe(map(response => response.body as PmbCustomerTaxWork),
                catchError(this.sharedService.handleError))
    }

    getPmbCustomerTaxWorksCount(): Observable<number> {
        var url = `${this.pmbCustomerTaxWorkUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqGroupId(seqGroupId : number): Observable<PmbCustomerTaxWork[]> {
        return this.httpClient.get(`${this.pmbCustomerTaxWorkUrl}/find-by-seqgroupid/${seqGroupId}`, {observe: 'response'})
            .pipe(map(response => response.body as PmbCustomerTaxWork),
                catchError(this.sharedService.handleError))
    }
    findBySeqGpbilId(seqGpbilId : number): Observable<PmbCustomerTaxWork[]> {
        return this.httpClient.get(`${this.pmbCustomerTaxWorkUrl}/find-by-seqgpbilid/${seqGpbilId}`, {observe: 'response'})
            .pipe(map(response => response.body as PmbCustomerTaxWork),
                catchError(this.sharedService.handleError))
    }




    createPmbCustomerTaxWork(pmbCustomerTaxWork : PmbCustomerTaxWork): Observable<any> {
        let body = JSON.stringify(pmbCustomerTaxWork);
        return this.httpClient.post(this.pmbCustomerTaxWorkUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updatePmbCustomerTaxWork(pmbCustomerTaxWork : PmbCustomerTaxWork, seqGpbilId : number): Observable<any> {
        let body = JSON.stringify(pmbCustomerTaxWork);
        return this.httpClient.put(`${this.pmbCustomerTaxWorkUrl}/${seqGpbilId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdatePmbCustomerTaxWork(pmbCustomerTaxWork : PmbCustomerTaxWork, seqGpbilId : number): Observable<any> {
        let body = JSON.stringify(pmbCustomerTaxWork);
        return this.httpClient.patch(`${this.pmbCustomerTaxWorkUrl}/${seqGpbilId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deletePmbCustomerTaxWork(seqGpbilId : number): Observable<any> {
        return this.httpClient.delete(`${this.pmbCustomerTaxWorkUrl}/${seqGpbilId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}