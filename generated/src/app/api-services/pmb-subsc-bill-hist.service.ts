/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PmbSubscBillHist } from '../api-models/pmb-subsc-bill-hist.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PmbSubscBillHistService {

    private pmbSubscBillHistUrl: string = `${environment.apiUrl}/pmbsubscbillhists`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPmbSubscBillHists(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PmbSubscBillHist[]> {
        var url = `${this.pmbSubscBillHistUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PmbSubscBillHist[]),
                catchError(this.sharedService.handleError))
    }

    getPmbSubscBillHist(customerType : string): Observable<PmbSubscBillHist> {
        return this.httpClient.get(`${this.pmbSubscBillHistUrl}/${customerType}`, {observe: 'response'})
            .pipe(map(response => response.body as PmbSubscBillHist),
                catchError(this.sharedService.handleError))
    }

    getPmbSubscBillHistsCount(): Observable<number> {
        var url = `${this.pmbSubscBillHistUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createPmbSubscBillHist(pmbSubscBillHist : PmbSubscBillHist): Observable<any> {
        let body = JSON.stringify(pmbSubscBillHist);
        return this.httpClient.post(this.pmbSubscBillHistUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updatePmbSubscBillHist(pmbSubscBillHist : PmbSubscBillHist, customerType : string): Observable<any> {
        let body = JSON.stringify(pmbSubscBillHist);
        return this.httpClient.put(`${this.pmbSubscBillHistUrl}/${customerType}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdatePmbSubscBillHist(pmbSubscBillHist : PmbSubscBillHist, customerType : string): Observable<any> {
        let body = JSON.stringify(pmbSubscBillHist);
        return this.httpClient.patch(`${this.pmbSubscBillHistUrl}/${customerType}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deletePmbSubscBillHist(customerType : string): Observable<any> {
        return this.httpClient.delete(`${this.pmbSubscBillHistUrl}/${customerType}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}