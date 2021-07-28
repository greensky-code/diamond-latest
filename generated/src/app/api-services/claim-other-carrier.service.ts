/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ClaimOtherCarrier } from '../api-models/claim-other-carrier.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ClaimOtherCarrierService {

    private claimOtherCarrierUrl: string = `${environment.apiUrl}/claimothercarriers`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getClaimOtherCarriers(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ClaimOtherCarrier[]> {
        var url = `${this.claimOtherCarrierUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ClaimOtherCarrier[]),
                catchError(this.sharedService.handleError))
    }

    getClaimOtherCarrier(seqClaimId : number): Observable<ClaimOtherCarrier> {
        return this.httpClient.get(`${this.claimOtherCarrierUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body as ClaimOtherCarrier),
                catchError(this.sharedService.handleError))
    }

    getClaimOtherCarriersCount(): Observable<number> {
        var url = `${this.claimOtherCarrierUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createClaimOtherCarrier(claimOtherCarrier : ClaimOtherCarrier): Observable<any> {
        let body = JSON.stringify(claimOtherCarrier);
        return this.httpClient.post(this.claimOtherCarrierUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateClaimOtherCarrier(claimOtherCarrier : ClaimOtherCarrier, seqClaimId : number): Observable<any> {
        let body = JSON.stringify(claimOtherCarrier);
        return this.httpClient.put(`${this.claimOtherCarrierUrl}/${seqClaimId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateClaimOtherCarrier(claimOtherCarrier : ClaimOtherCarrier, seqClaimId : number): Observable<any> {
        let body = JSON.stringify(claimOtherCarrier);
        return this.httpClient.patch(`${this.claimOtherCarrierUrl}/${seqClaimId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteClaimOtherCarrier(seqClaimId : number): Observable<any> {
        return this.httpClient.delete(`${this.claimOtherCarrierUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}