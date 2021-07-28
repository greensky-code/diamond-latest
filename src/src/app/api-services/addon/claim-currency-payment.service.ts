/* Copyright (c) 2021 . All Rights Reserved. */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import { AddressOutgoingPaymentViewBean } from '../../api-models/addon/address-outgoing-payment-view-bean.model';
import { CurrencyClaimHeader } from '../../api-models/addon/currency-claim-header.model';
import { CurrencyLocalPaymentViewBean } from '../../api-models/addon/currency-local-payment-view-bean.model';
import { EntityHeader } from '../../api-models/addon/entity-header.model';
import { SharedService } from '../../shared/services/shared.service';

@Injectable({
    providedIn: "root"
})
export class ClaimCurrencyPaymentService {

    private ciebCountryCodeUrl: string = `${environment.apiUrl}/currencylocalpayment`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getEntityHeader(subscriberID: number, personNo: number): Observable<EntityHeader> {
        var url = `${this.ciebCountryCodeUrl}/getEntityHeader/${subscriberID}/${personNo}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as EntityHeader),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getClaimHeader(seqClaimId: number): Observable<CurrencyClaimHeader> {
        var url = `${this.ciebCountryCodeUrl}/getClaimHeader/${seqClaimId}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CurrencyClaimHeader),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getOutgoingAddress(seqClaimId: number): Observable<AddressOutgoingPaymentViewBean> {
        var url = `${this.ciebCountryCodeUrl}/getOutgoingAddress/${seqClaimId}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AddressOutgoingPaymentViewBean),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findClaimDetailLines(seqClaimId: number): Observable<CurrencyLocalPaymentViewBean> {
        var url = `${this.ciebCountryCodeUrl}/findClaimDetailLines/${seqClaimId}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CurrencyLocalPaymentViewBean),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

}
