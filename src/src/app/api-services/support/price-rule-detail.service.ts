/* Copyright (c) 2020 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {catchError, map} from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {SharedService} from "../../shared/services/shared.service";
import {PriceRuleDetail} from "../../api-models/support/price-rule-detail.model";

@Injectable({
    providedIn: "root"
})
export class PriceRuleDetailService {

    private priceRuleDetailUrl: string = `${environment.apiUrl}/priceruledetails`;
    private contentHeaders = new HttpHeaders();

    constructor(private httpClient: HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPriceRuleDetails(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<PriceRuleDetail[]> {
        var url = `${this.priceRuleDetailUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PriceRuleDetail[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getPriceRuleDetail(priceRule: string): Observable<PriceRuleDetail> {
        return this.httpClient.get(`${this.priceRuleDetailUrl}/${priceRule}`, {observe: 'response'})
            .pipe(map(response => response.body as PriceRuleDetail),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getPriceRuleDetailsCount(): Observable<number> {
        var url = `${this.priceRuleDetailUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByAllowedReason(allowedReason: string): Observable<PriceRuleDetail[]> {
        return this.httpClient.get(`${this.priceRuleDetailUrl}/find-by-allowedreason/${allowedReason}`, {observe: 'response'})
            .pipe(map(response => response.body as PriceRuleDetail),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }


    createPriceRuleDetail(priceRuleDetail: PriceRuleDetail): Observable<any> {
        let body = JSON.stringify(priceRuleDetail);
        return this.httpClient.post(this.priceRuleDetailUrl, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updatePriceRuleDetail(priceRuleDetail: PriceRuleDetail, priceRule: string): Observable<any> {
        let body = JSON.stringify(priceRuleDetail);
        return this.httpClient.put(`${this.priceRuleDetailUrl}/${priceRule}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdatePriceRuleDetail(priceRuleDetail: PriceRuleDetail, priceRule: string): Observable<any> {
        let body = JSON.stringify(priceRuleDetail);
        return this.httpClient.patch(`${this.priceRuleDetailUrl}/${priceRule}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deletePriceRuleDetail(priceRule: string): Observable<any> {
        return this.httpClient.delete(`${this.priceRuleDetailUrl}/${priceRule}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
