/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProvContractPriceSched } from '../api-models/prov-contract-price-sched.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ProvContractPriceSchedService {

    private provContractPriceSchedUrl: string = `${environment.apiUrl}/provcontractpricescheds`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getProvContractPriceScheds(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ProvContractPriceSched[]> {
        var url = `${this.provContractPriceSchedUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ProvContractPriceSched[]),
                catchError(this.sharedService.handleError))
    }

    getProvContractPriceSched(claimType : string): Observable<ProvContractPriceSched> {
        return this.httpClient.get(`${this.provContractPriceSchedUrl}/${claimType}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContractPriceSched),
                catchError(this.sharedService.handleError))
    }

    getProvContractPriceSchedsCount(): Observable<number> {
        var url = `${this.provContractPriceSchedUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByPriceSchedule(priceSchedule : string): Observable<ProvContractPriceSched[]> {
        return this.httpClient.get(`${this.provContractPriceSchedUrl}/find-by-priceschedule/${priceSchedule}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContractPriceSched),
                catchError(this.sharedService.handleError))
    }




    createProvContractPriceSched(provContractPriceSched : ProvContractPriceSched): Observable<any> {
        let body = JSON.stringify(provContractPriceSched);
        return this.httpClient.post(this.provContractPriceSchedUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateProvContractPriceSched(provContractPriceSched : ProvContractPriceSched, claimType : string): Observable<any> {
        let body = JSON.stringify(provContractPriceSched);
        return this.httpClient.put(`${this.provContractPriceSchedUrl}/${claimType}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateProvContractPriceSched(provContractPriceSched : ProvContractPriceSched, claimType : string): Observable<any> {
        let body = JSON.stringify(provContractPriceSched);
        return this.httpClient.patch(`${this.provContractPriceSchedUrl}/${claimType}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteProvContractPriceSched(claimType : string): Observable<any> {
        return this.httpClient.delete(`${this.provContractPriceSchedUrl}/${claimType}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}