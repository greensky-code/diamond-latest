/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PmbTaxExceptions } from '../api-models/pmb-tax-exceptions.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PmbTaxExceptionsService {

    private pmbTaxExceptionsUrl: string = `${environment.apiUrl}/pmbtaxexceptionss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPmbTaxExceptionss(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PmbTaxExceptions[]> {
        var url = `${this.pmbTaxExceptionsUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PmbTaxExceptions[]),
                catchError(this.sharedService.handleError))
    }

    getPmbTaxExceptions(seqTaxExceptionId : number): Observable<PmbTaxExceptions> {
        return this.httpClient.get(`${this.pmbTaxExceptionsUrl}/${seqTaxExceptionId}`, {observe: 'response'})
            .pipe(map(response => response.body as PmbTaxExceptions),
                catchError(this.sharedService.handleError))
    }

    getPmbTaxExceptionssCount(): Observable<number> {
        var url = `${this.pmbTaxExceptionsUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createPmbTaxExceptions(pmbTaxExceptions : PmbTaxExceptions): Observable<any> {
        let body = JSON.stringify(pmbTaxExceptions);
        return this.httpClient.post(this.pmbTaxExceptionsUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updatePmbTaxExceptions(pmbTaxExceptions : PmbTaxExceptions, seqTaxExceptionId : number): Observable<any> {
        let body = JSON.stringify(pmbTaxExceptions);
        return this.httpClient.put(`${this.pmbTaxExceptionsUrl}/${seqTaxExceptionId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdatePmbTaxExceptions(pmbTaxExceptions : PmbTaxExceptions, seqTaxExceptionId : number): Observable<any> {
        let body = JSON.stringify(pmbTaxExceptions);
        return this.httpClient.patch(`${this.pmbTaxExceptionsUrl}/${seqTaxExceptionId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deletePmbTaxExceptions(seqTaxExceptionId : number): Observable<any> {
        return this.httpClient.delete(`${this.pmbTaxExceptionsUrl}/${seqTaxExceptionId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}