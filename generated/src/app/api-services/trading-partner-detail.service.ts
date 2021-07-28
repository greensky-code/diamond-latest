/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { TradingPartnerDetail } from '../api-models/trading-partner-detail.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class TradingPartnerDetailService {

    private tradingPartnerDetailUrl: string = `${environment.apiUrl}/tradingpartnerdetails`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getTradingPartnerDetails(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<TradingPartnerDetail[]> {
        var url = `${this.tradingPartnerDetailUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as TradingPartnerDetail[]),
                catchError(this.sharedService.handleError))
    }

    getTradingPartnerDetail(tradingPartnerId : string): Observable<TradingPartnerDetail> {
        return this.httpClient.get(`${this.tradingPartnerDetailUrl}/${tradingPartnerId}`, {observe: 'response'})
            .pipe(map(response => response.body as TradingPartnerDetail),
                catchError(this.sharedService.handleError))
    }

    getTradingPartnerDetailsCount(): Observable<number> {
        var url = `${this.tradingPartnerDetailUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByTransactionType(transactionType : string): Observable<TradingPartnerDetail[]> {
        return this.httpClient.get(`${this.tradingPartnerDetailUrl}/find-by-transactiontype/${transactionType}`, {observe: 'response'})
            .pipe(map(response => response.body as TradingPartnerDetail),
                catchError(this.sharedService.handleError))
    }
    findByTradingPartnerId(tradingPartnerId : string): Observable<TradingPartnerDetail[]> {
        return this.httpClient.get(`${this.tradingPartnerDetailUrl}/find-by-tradingpartnerid/${tradingPartnerId}`, {observe: 'response'})
            .pipe(map(response => response.body as TradingPartnerDetail),
                catchError(this.sharedService.handleError))
    }




    createTradingPartnerDetail(tradingPartnerDetail : TradingPartnerDetail): Observable<any> {
        let body = JSON.stringify(tradingPartnerDetail);
        return this.httpClient.post(this.tradingPartnerDetailUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateTradingPartnerDetail(tradingPartnerDetail : TradingPartnerDetail, tradingPartnerId : string): Observable<any> {
        let body = JSON.stringify(tradingPartnerDetail);
        return this.httpClient.put(`${this.tradingPartnerDetailUrl}/${tradingPartnerId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateTradingPartnerDetail(tradingPartnerDetail : TradingPartnerDetail, tradingPartnerId : string): Observable<any> {
        let body = JSON.stringify(tradingPartnerDetail);
        return this.httpClient.patch(`${this.tradingPartnerDetailUrl}/${tradingPartnerId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteTradingPartnerDetail(tradingPartnerId : string): Observable<any> {
        return this.httpClient.delete(`${this.tradingPartnerDetailUrl}/${tradingPartnerId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}