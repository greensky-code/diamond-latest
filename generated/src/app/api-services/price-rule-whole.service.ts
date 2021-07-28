/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PriceRuleWhole } from '../api-models/price-rule-whole.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PriceRuleWholeService {

    private priceRuleWholeUrl: string = `${environment.apiUrl}/pricerulewholes`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPriceRuleWholes(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PriceRuleWhole[]> {
        var url = `${this.priceRuleWholeUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PriceRuleWhole[]),
                catchError(this.sharedService.handleError))
    }

    getPriceRuleWhole(priceRule : string): Observable<PriceRuleWhole> {
        return this.httpClient.get(`${this.priceRuleWholeUrl}/${priceRule}`, {observe: 'response'})
            .pipe(map(response => response.body as PriceRuleWhole),
                catchError(this.sharedService.handleError))
    }

    getPriceRuleWholesCount(): Observable<number> {
        var url = `${this.priceRuleWholeUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByPriceRule(priceRule : string): Observable<PriceRuleWhole[]> {
        return this.httpClient.get(`${this.priceRuleWholeUrl}/find-by-pricerule/${priceRule}`, {observe: 'response'})
            .pipe(map(response => response.body as PriceRuleWhole),
                catchError(this.sharedService.handleError))
    }
    findByHoldReason(holdReason : string): Observable<PriceRuleWhole[]> {
        return this.httpClient.get(`${this.priceRuleWholeUrl}/find-by-holdreason/${holdReason}`, {observe: 'response'})
            .pipe(map(response => response.body as PriceRuleWhole),
                catchError(this.sharedService.handleError))
    }
    findByAllowedReason(allowedReason : string): Observable<PriceRuleWhole[]> {
        return this.httpClient.get(`${this.priceRuleWholeUrl}/find-by-allowedreason/${allowedReason}`, {observe: 'response'})
            .pipe(map(response => response.body as PriceRuleWhole),
                catchError(this.sharedService.handleError))
    }




    createPriceRuleWhole(priceRuleWhole : PriceRuleWhole): Observable<any> {
        let body = JSON.stringify(priceRuleWhole);
        return this.httpClient.post(this.priceRuleWholeUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updatePriceRuleWhole(priceRuleWhole : PriceRuleWhole, priceRule : string): Observable<any> {
        let body = JSON.stringify(priceRuleWhole);
        return this.httpClient.put(`${this.priceRuleWholeUrl}/${priceRule}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdatePriceRuleWhole(priceRuleWhole : PriceRuleWhole, priceRule : string): Observable<any> {
        let body = JSON.stringify(priceRuleWhole);
        return this.httpClient.patch(`${this.priceRuleWholeUrl}/${priceRule}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deletePriceRuleWhole(priceRule : string): Observable<any> {
        return this.httpClient.delete(`${this.priceRuleWholeUrl}/${priceRule}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}