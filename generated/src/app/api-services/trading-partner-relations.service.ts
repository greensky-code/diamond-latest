/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { TradingPartnerRelations } from '../api-models/trading-partner-relations.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class TradingPartnerRelationsService {

    private tradingPartnerRelationsUrl: string = `${environment.apiUrl}/tradingpartnerrelationss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getTradingPartnerRelationss(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<TradingPartnerRelations[]> {
        var url = `${this.tradingPartnerRelationsUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as TradingPartnerRelations[]),
                catchError(this.sharedService.handleError))
    }

    getTradingPartnerRelations(seqTpRelations : number): Observable<TradingPartnerRelations> {
        return this.httpClient.get(`${this.tradingPartnerRelationsUrl}/${seqTpRelations}`, {observe: 'response'})
            .pipe(map(response => response.body as TradingPartnerRelations),
                catchError(this.sharedService.handleError))
    }

    getTradingPartnerRelationssCount(): Observable<number> {
        var url = `${this.tradingPartnerRelationsUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySourceTpId(sourceTpId : string): Observable<TradingPartnerRelations[]> {
        return this.httpClient.get(`${this.tradingPartnerRelationsUrl}/find-by-sourcetpid/${sourceTpId}`, {observe: 'response'})
            .pipe(map(response => response.body as TradingPartnerRelations),
                catchError(this.sharedService.handleError))
    }
    findByReceivingTpId(receivingTpId : string): Observable<TradingPartnerRelations[]> {
        return this.httpClient.get(`${this.tradingPartnerRelationsUrl}/find-by-receivingtpid/${receivingTpId}`, {observe: 'response'})
            .pipe(map(response => response.body as TradingPartnerRelations),
                catchError(this.sharedService.handleError))
    }
    findByCompanyCode(companyCode : string): Observable<TradingPartnerRelations[]> {
        return this.httpClient.get(`${this.tradingPartnerRelationsUrl}/find-by-companycode/${companyCode}`, {observe: 'response'})
            .pipe(map(response => response.body as TradingPartnerRelations),
                catchError(this.sharedService.handleError))
    }




    createTradingPartnerRelations(tradingPartnerRelations : TradingPartnerRelations): Observable<any> {
        let body = JSON.stringify(tradingPartnerRelations);
        return this.httpClient.post(this.tradingPartnerRelationsUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateTradingPartnerRelations(tradingPartnerRelations : TradingPartnerRelations, seqTpRelations : number): Observable<any> {
        let body = JSON.stringify(tradingPartnerRelations);
        return this.httpClient.put(`${this.tradingPartnerRelationsUrl}/${seqTpRelations}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateTradingPartnerRelations(tradingPartnerRelations : TradingPartnerRelations, seqTpRelations : number): Observable<any> {
        let body = JSON.stringify(tradingPartnerRelations);
        return this.httpClient.patch(`${this.tradingPartnerRelationsUrl}/${seqTpRelations}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteTradingPartnerRelations(seqTpRelations : number): Observable<any> {
        return this.httpClient.delete(`${this.tradingPartnerRelationsUrl}/${seqTpRelations}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}