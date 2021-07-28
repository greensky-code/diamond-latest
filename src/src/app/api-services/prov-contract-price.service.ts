/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProvContractPrice } from '../api-models/prov-contract-price.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ProvContractPriceService {

    private provContractPriceUrl: string = `${environment.apiUrl}/provcontractprices`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getProvContractPrices(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ProvContractPrice[]> {
        var url = `${this.provContractPriceUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ProvContractPrice[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getProvContractPrice(claimType : string): Observable<ProvContractPrice> {
        return this.httpClient.get(`${this.provContractPriceUrl}/${claimType}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContractPrice),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getProvContractPricesCount(): Observable<number> {
        var url = `${this.provContractPriceUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByPriceRule2(priceRule2 : string): Observable<ProvContractPrice[]> {
        return this.httpClient.get(`${this.provContractPriceUrl}/find-by-pricerule2/${priceRule2}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContractPrice),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByTargetRevReason(targetRevReason : string): Observable<ProvContractPrice[]> {
        return this.httpClient.get(`${this.provContractPriceUrl}/find-by-targetrevreason/${targetRevReason}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContractPrice),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByPriceRule1(priceRule1 : string): Observable<ProvContractPrice[]> {
        return this.httpClient.get(`${this.provContractPriceUrl}/find-by-pricerule1/${priceRule1}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContractPrice),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByPriceSchedule1(priceSchedule1 : string): Observable<ProvContractPrice[]> {
        return this.httpClient.get(`${this.provContractPriceUrl}/find-by-priceschedule1/${priceSchedule1}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContractPrice),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByPriceSchedule2(priceSchedule2 : string): Observable<ProvContractPrice[]> {
        return this.httpClient.get(`${this.provContractPriceUrl}/find-by-priceschedule2/${priceSchedule2}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContractPrice),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }




    createProvContractPrice(provContractPrice : ProvContractPrice): Observable<any> {
        let body = JSON.stringify(provContractPrice);
        return this.httpClient.post(this.provContractPriceUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateProvContractPrice(provContractPrice : ProvContractPrice, claimType : string): Observable<any> {
        let body = JSON.stringify(provContractPrice);
        return this.httpClient.put(`${this.provContractPriceUrl}/${claimType}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateProvContractPrice(provContractPrice : ProvContractPrice, claimType : string): Observable<any> {
        let body = JSON.stringify(provContractPrice);
        return this.httpClient.patch(`${this.provContractPriceUrl}/${claimType}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteProvContractPrice(claimType : string): Observable<any> {
        return this.httpClient.delete(`${this.provContractPriceUrl}/${claimType}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }


    getProvContractPriceDrg(params: any ):Observable<any>{
        return this.httpClient.get(`${this.provContractPriceUrl}/${params.detSrchSequence}/${params.detSrchOrder}/${params.seqVendAddress}/${params.seqVendId}/${params.seqProvContract}/${params.claimType}`)
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }


    updateProvContractPriceDrgInformation(provContractPrice : ProvContractPrice, params: any): Observable<any> {
        let body = JSON.stringify(provContractPrice);
        return this.httpClient.put(`${this.provContractPriceUrl}/${params.detSrchSequence}/${params.detSrchOrder}/${params.seqVendAddress}/${params.seqVendId}/${params.seqProvContract}/${params.claimType}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    copySaveProvContractPrice(provContractPrice : ProvContractPrice, params: any): Observable<any> {
        let body = JSON.stringify(provContractPrice);
        return this.httpClient.post(`${this.provContractPriceUrl}/copy/${params.detSrchSequence}/${params.detSrchOrder}/${params.seqVendAddress}/${params.seqVendId}/${params.seqProvContract}/${params.claimType}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
