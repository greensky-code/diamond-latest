/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PriceDeterminant } from '../api-models/price-determinant.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PriceDeterminantService {

    private priceDeterminantUrl: string = `${environment.apiUrl}/pricedeterminants`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPriceDeterminants(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PriceDeterminant[]> {
        var url = `${this.priceDeterminantUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PriceDeterminant[]),
                catchError(this.sharedService.handleError))
    }

    getPriceDeterminant(priceDeterminant : string): Observable<PriceDeterminant> {
        return this.httpClient.get(`${this.priceDeterminantUrl}/${priceDeterminant}`, {observe: 'response'})
            .pipe(map(response => response.body as PriceDeterminant),
                catchError(this.sharedService.handleError))
    }

    getPriceDeterminantsCount(): Observable<number> {
        var url = `${this.priceDeterminantUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createPriceDeterminant(priceDeterminant : PriceDeterminant): Observable<any> {
        let body = JSON.stringify(priceDeterminant);
        return this.httpClient.post(this.priceDeterminantUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updatePriceDeterminant(priceDeterminant : PriceDeterminant, priceDeterminant : string): Observable<any> {
        let body = JSON.stringify(priceDeterminant);
        return this.httpClient.put(`${this.priceDeterminantUrl}/${priceDeterminant}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdatePriceDeterminant(priceDeterminant : PriceDeterminant, priceDeterminant : string): Observable<any> {
        let body = JSON.stringify(priceDeterminant);
        return this.httpClient.patch(`${this.priceDeterminantUrl}/${priceDeterminant}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deletePriceDeterminant(priceDeterminant : string): Observable<any> {
        return this.httpClient.delete(`${this.priceDeterminantUrl}/${priceDeterminant}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}