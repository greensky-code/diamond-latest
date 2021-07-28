/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PmbSubscHist } from '../api-models/pmb-subsc-hist.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PmbSubscHistService {

    private pmbSubscHistUrl: string = `${environment.apiUrl}/pmbsubschists`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPmbSubscHists(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PmbSubscHist[]> {
        var url = `${this.pmbSubscHistUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PmbSubscHist[]),
                catchError(this.sharedService.handleError))
    }

    getPmbSubscHist(customerType : string): Observable<PmbSubscHist> {
        return this.httpClient.get(`${this.pmbSubscHistUrl}/${customerType}`, {observe: 'response'})
            .pipe(map(response => response.body as PmbSubscHist),
                catchError(this.sharedService.handleError))
    }

    getPmbSubscHistsCount(): Observable<number> {
        var url = `${this.pmbSubscHistUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createPmbSubscHist(pmbSubscHist : PmbSubscHist): Observable<any> {
        let body = JSON.stringify(pmbSubscHist);
        return this.httpClient.post(this.pmbSubscHistUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updatePmbSubscHist(pmbSubscHist : PmbSubscHist, customerType : string): Observable<any> {
        let body = JSON.stringify(pmbSubscHist);
        return this.httpClient.put(`${this.pmbSubscHistUrl}/${customerType}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdatePmbSubscHist(pmbSubscHist : PmbSubscHist, customerType : string): Observable<any> {
        let body = JSON.stringify(pmbSubscHist);
        return this.httpClient.patch(`${this.pmbSubscHistUrl}/${customerType}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deletePmbSubscHist(customerType : string): Observable<any> {
        return this.httpClient.delete(`${this.pmbSubscHistUrl}/${customerType}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}