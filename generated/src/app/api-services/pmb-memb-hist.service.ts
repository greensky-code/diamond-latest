/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PmbMembHist } from '../api-models/pmb-memb-hist.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PmbMembHistService {

    private pmbMembHistUrl: string = `${environment.apiUrl}/pmbmembhists`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPmbMembHists(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PmbMembHist[]> {
        var url = `${this.pmbMembHistUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PmbMembHist[]),
                catchError(this.sharedService.handleError))
    }

    getPmbMembHist(customerType : string): Observable<PmbMembHist> {
        return this.httpClient.get(`${this.pmbMembHistUrl}/${customerType}`, {observe: 'response'})
            .pipe(map(response => response.body as PmbMembHist),
                catchError(this.sharedService.handleError))
    }

    getPmbMembHistsCount(): Observable<number> {
        var url = `${this.pmbMembHistUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createPmbMembHist(pmbMembHist : PmbMembHist): Observable<any> {
        let body = JSON.stringify(pmbMembHist);
        return this.httpClient.post(this.pmbMembHistUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updatePmbMembHist(pmbMembHist : PmbMembHist, customerType : string): Observable<any> {
        let body = JSON.stringify(pmbMembHist);
        return this.httpClient.put(`${this.pmbMembHistUrl}/${customerType}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdatePmbMembHist(pmbMembHist : PmbMembHist, customerType : string): Observable<any> {
        let body = JSON.stringify(pmbMembHist);
        return this.httpClient.patch(`${this.pmbMembHistUrl}/${customerType}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deletePmbMembHist(customerType : string): Observable<any> {
        return this.httpClient.delete(`${this.pmbMembHistUrl}/${customerType}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}