/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PmbMembBillHist } from '../api-models/pmb-memb-bill-hist.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PmbMembBillHistService {

    private pmbMembBillHistUrl: string = `${environment.apiUrl}/pmbmembbillhists`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPmbMembBillHists(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PmbMembBillHist[]> {
        var url = `${this.pmbMembBillHistUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PmbMembBillHist[]),
                catchError(this.sharedService.handleError))
    }

    getPmbMembBillHist(customerType : string): Observable<PmbMembBillHist> {
        return this.httpClient.get(`${this.pmbMembBillHistUrl}/${customerType}`, {observe: 'response'})
            .pipe(map(response => response.body as PmbMembBillHist),
                catchError(this.sharedService.handleError))
    }

    getPmbMembBillHistsCount(): Observable<number> {
        var url = `${this.pmbMembBillHistUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createPmbMembBillHist(pmbMembBillHist : PmbMembBillHist): Observable<any> {
        let body = JSON.stringify(pmbMembBillHist);
        return this.httpClient.post(this.pmbMembBillHistUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updatePmbMembBillHist(pmbMembBillHist : PmbMembBillHist, customerType : string): Observable<any> {
        let body = JSON.stringify(pmbMembBillHist);
        return this.httpClient.put(`${this.pmbMembBillHistUrl}/${customerType}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdatePmbMembBillHist(pmbMembBillHist : PmbMembBillHist, customerType : string): Observable<any> {
        let body = JSON.stringify(pmbMembBillHist);
        return this.httpClient.patch(`${this.pmbMembBillHistUrl}/${customerType}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deletePmbMembBillHist(customerType : string): Observable<any> {
        return this.httpClient.delete(`${this.pmbMembBillHistUrl}/${customerType}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}