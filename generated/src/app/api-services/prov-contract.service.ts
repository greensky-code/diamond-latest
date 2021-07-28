/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProvContract } from '../api-models/prov-contract.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ProvContractService {

    private provContractUrl: string = `${environment.apiUrl}/provcontracts`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getProvContracts(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ProvContract[]> {
        var url = `${this.provContractUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ProvContract[]),
                catchError(this.sharedService.handleError))
    }

    getProvContract(seqProvContract : number): Observable<ProvContract> {
        return this.httpClient.get(`${this.provContractUrl}/${seqProvContract}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContract),
                catchError(this.sharedService.handleError))
    }

    getProvContractsCount(): Observable<number> {
        var url = `${this.provContractUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqCovProvGrp(seqCovProvGrp : number): Observable<ProvContract[]> {
        return this.httpClient.get(`${this.provContractUrl}/find-by-seqcovprovgrp/${seqCovProvGrp}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContract),
                catchError(this.sharedService.handleError))
    }
    findByIpaId(ipaId : string): Observable<ProvContract[]> {
        return this.httpClient.get(`${this.provContractUrl}/find-by-ipaid/${ipaId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContract),
                catchError(this.sharedService.handleError))
    }
    findByClaimHoldReason(claimHoldReason : string): Observable<ProvContract[]> {
        return this.httpClient.get(`${this.provContractUrl}/find-by-claimholdreason/${claimHoldReason}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContract),
                catchError(this.sharedService.handleError))
    }
    findByLineOfBusiness(lineOfBusiness : string): Observable<ProvContract[]> {
        return this.httpClient.get(`${this.provContractUrl}/find-by-lineofbusiness/${lineOfBusiness}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContract),
                catchError(this.sharedService.handleError))
    }
    findByPanelId(panelId : string): Observable<ProvContract[]> {
        return this.httpClient.get(`${this.provContractUrl}/find-by-panelid/${panelId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContract),
                catchError(this.sharedService.handleError))
    }
    findBySeqProvId(seqProvId : number): Observable<ProvContract[]> {
        return this.httpClient.get(`${this.provContractUrl}/find-by-seqprovid/${seqProvId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContract),
                catchError(this.sharedService.handleError))
    }
    findBySeqVendAddress(seqVendAddress : number): Observable<ProvContract[]> {
        return this.httpClient.get(`${this.provContractUrl}/find-by-seqvendaddress/${seqVendAddress}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContract),
                catchError(this.sharedService.handleError))
    }
    findBySeqVendId(seqVendId : number): Observable<ProvContract[]> {
        return this.httpClient.get(`${this.provContractUrl}/find-by-seqvendid/${seqVendId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContract),
                catchError(this.sharedService.handleError))
    }
    findByTermReason(termReason : string): Observable<ProvContract[]> {
        return this.httpClient.get(`${this.provContractUrl}/find-by-termreason/${termReason}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContract),
                catchError(this.sharedService.handleError))
    }
    findByPriceSchedule1(priceSchedule1 : string): Observable<ProvContract[]> {
        return this.httpClient.get(`${this.provContractUrl}/find-by-priceschedule1/${priceSchedule1}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContract),
                catchError(this.sharedService.handleError))
    }
    findByPriceRule2(priceRule2 : string): Observable<ProvContract[]> {
        return this.httpClient.get(`${this.provContractUrl}/find-by-pricerule2/${priceRule2}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContract),
                catchError(this.sharedService.handleError))
    }
    findByPriceRule1(priceRule1 : string): Observable<ProvContract[]> {
        return this.httpClient.get(`${this.provContractUrl}/find-by-pricerule1/${priceRule1}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContract),
                catchError(this.sharedService.handleError))
    }
    findByPriceSchedule2(priceSchedule2 : string): Observable<ProvContract[]> {
        return this.httpClient.get(`${this.provContractUrl}/find-by-priceschedule2/${priceSchedule2}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContract),
                catchError(this.sharedService.handleError))
    }




    createProvContract(provContract : ProvContract): Observable<any> {
        let body = JSON.stringify(provContract);
        return this.httpClient.post(this.provContractUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateProvContract(provContract : ProvContract, seqProvContract : number): Observable<any> {
        let body = JSON.stringify(provContract);
        return this.httpClient.put(`${this.provContractUrl}/${seqProvContract}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateProvContract(provContract : ProvContract, seqProvContract : number): Observable<any> {
        let body = JSON.stringify(provContract);
        return this.httpClient.patch(`${this.provContractUrl}/${seqProvContract}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteProvContract(seqProvContract : number): Observable<any> {
        return this.httpClient.delete(`${this.provContractUrl}/${seqProvContract}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}