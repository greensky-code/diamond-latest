/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { IpaContractDelegations } from '../api-models/ipa-contract-delegations.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class IpaContractDelegationsService {

    private ipaContractDelegationsUrl: string = `${environment.apiUrl}/ipacontractdelegationss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getIpaContractDelegationss(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<IpaContractDelegations[]> {
        var url = `${this.ipaContractDelegationsUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as IpaContractDelegations[]),
                catchError(this.sharedService.handleError))
    }

    getIpaContractDelegations(seqIpaContract : number): Observable<IpaContractDelegations> {
        return this.httpClient.get(`${this.ipaContractDelegationsUrl}/${seqIpaContract}`, {observe: 'response'})
            .pipe(map(response => response.body as IpaContractDelegations),
                catchError(this.sharedService.handleError))
    }

    getIpaContractDelegationssCount(): Observable<number> {
        var url = `${this.ipaContractDelegationsUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByDelegationServiceCode(delegationServiceCode : string): Observable<IpaContractDelegations[]> {
        return this.httpClient.get(`${this.ipaContractDelegationsUrl}/find-by-delegationservicecode/${delegationServiceCode}`, {observe: 'response'})
            .pipe(map(response => response.body as IpaContractDelegations),
                catchError(this.sharedService.handleError))
    }
    findBySeqIpaContract(seqIpaContract : number): Observable<IpaContractDelegations[]> {
        return this.httpClient.get(`${this.ipaContractDelegationsUrl}/find-by-seqipacontract/${seqIpaContract}`, {observe: 'response'})
            .pipe(map(response => response.body as IpaContractDelegations),
                catchError(this.sharedService.handleError))
    }




    createIpaContractDelegations(ipaContractDelegations : IpaContractDelegations): Observable<any> {
        let body = JSON.stringify(ipaContractDelegations);
        return this.httpClient.post(this.ipaContractDelegationsUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateIpaContractDelegations(ipaContractDelegations : IpaContractDelegations, seqIpaContract : number): Observable<any> {
        let body = JSON.stringify(ipaContractDelegations);
        return this.httpClient.put(`${this.ipaContractDelegationsUrl}/${seqIpaContract}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateIpaContractDelegations(ipaContractDelegations : IpaContractDelegations, seqIpaContract : number): Observable<any> {
        let body = JSON.stringify(ipaContractDelegations);
        return this.httpClient.patch(`${this.ipaContractDelegationsUrl}/${seqIpaContract}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteIpaContractDelegations(seqIpaContract : number): Observable<any> {
        return this.httpClient.delete(`${this.ipaContractDelegationsUrl}/${seqIpaContract}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}