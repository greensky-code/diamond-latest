/* Copyright (c) 2020 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {PriceRuleDetail} from '../api-models/price-rule-detail.model'
import {CONFIG} from '../core/config';
import {environment} from '../../environments/environment'
import {HttpHeaders} from '@angular/common/http';
import {SharedService} from '../shared/services/shared.service';
import {catchError, map} from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})

export class PriceRuleDetailService {
    private priceRuleDetailUrl: string = `${environment.apiUrl}/priceruledetails`;
    private contentHeaders = new HttpHeaders();

    constructor(
        private httpClient: HttpClient,
        private sharedService: SharedService
    ) {
        this.contentHeaders = this.contentHeaders.set("Accept", "application/json");
        this.contentHeaders = this.contentHeaders.set(
            "Content-Type",
            "application/json; charset=utf-8"
        );
    }

    getPriceRuleDetails(
        usePagination: boolean = false,
        page: number = 0,
        size: number = 0
    ): Observable<PriceRuleDetail[]> {
        var url = `${this.priceRuleDetailUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: "response"}).pipe(
            map((response) => response.body as PriceRuleDetail[]),
            catchError(this.sharedService.handleError)
        );
    }

    getPriceRuleDetail(priceRule: string): Observable<PriceRuleDetail[]> {
        return this.httpClient
            .get(`${this.priceRuleDetailUrl}/${priceRule}`, {observe: "response"})
            .pipe(
                map((response) => response.body as PriceRuleDetail[]),
                catchError(this.sharedService.handleError)
            );
    }

    getPriceRuleDetailsCount(): Observable<number> {
        var url = `${this.priceRuleDetailUrl}/count`;
        return this.httpClient.get(url, {observe: "response"}).pipe(
            map((response) => response.body as number),
            catchError(this.sharedService.handleError)
        );
    }

    findByAllowedReason(allowedReason: string): Observable<PriceRuleDetail[]> {
        return this.httpClient
            .get(
                `${this.priceRuleDetailUrl}/find-by-allowedreason/${allowedReason}`,
                {observe: "response"}
            )
            .pipe(
                map((response) => response.body as PriceRuleDetail),
                catchError(this.sharedService.handleError)
            );
    }

    createPriceRuleDetail(priceRuleDetail: PriceRuleDetail): Observable<any> {
        let body = JSON.stringify(priceRuleDetail);
        return this.httpClient
            .post(this.priceRuleDetailUrl, body, {headers: this.contentHeaders})
            .pipe(
                map((response) => response),
                catchError(this.sharedService.handleError)
            );
    }

    updatePriceRuleDetail(
        priceRuleDetail: PriceRuleDetail,
        priceRule: string
    ): Observable<any> {
        let body = JSON.stringify(priceRuleDetail);
        return this.httpClient
            .put(`${this.priceRuleDetailUrl}/${priceRule}`, body, {
                headers: this.contentHeaders,
            })
            .pipe(
                map((response) => response),
                catchError(this.sharedService.handleError)
            );
    }

    /**
     * {seqRuleDetail}/{priceRule}"
     * @param priceRuleDetail
     * @param priceRule
     * @param seqRuleDetail
     */
    updatePriceRuleDetailByPrimaryKey(priceRuleDetail: PriceRuleDetail, priceRule: string, seqRuleDetail: number): Observable<any> {
        let body = JSON.stringify(priceRuleDetail);
        return this.httpClient
            .put(`${this.priceRuleDetailUrl}/${seqRuleDetail}/${priceRule}`, body, {
                headers: this.contentHeaders,
            })
            .pipe(map((response) => response),
                catchError(this.sharedService.handleError)
            );
    }

    partiallyUpdatePriceRuleDetail(
        priceRuleDetail: PriceRuleDetail,
        priceRule: string
    ): Observable<any> {
        let body = JSON.stringify(priceRuleDetail);
        return this.httpClient
            .patch(`${this.priceRuleDetailUrl}/${priceRule}`, body, {
                headers: this.contentHeaders,
            })
            .pipe(
                map((response) => response),
                catchError(this.sharedService.handleError)
            );
    }

    deletePriceRuleDetail(priceRule: string): Observable<any> {
        return this.httpClient
            .delete(`${this.priceRuleDetailUrl}/${priceRule}`, {
                observe: "response",
            })
            .pipe(
                map((response) => response.body),
                catchError(this.sharedService.handleError)
            );
    }

    findByPriceRule(priceRule: any) {
        return this.httpClient
            .get(`${this.priceRuleDetailUrl}/find-by-price_rule/${priceRule}`, {
                observe: "response",
            })
            .pipe(
                map((response) => response.body as PriceRuleDetail),
                catchError(this.sharedService.handleError)
            );
    }
}
