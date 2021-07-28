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

@Injectable({
    providedIn: 'root'
})
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
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getProvContract(seqProvContract : number): Observable<ProvContract> {
        return this.httpClient.get(`${this.provContractUrl}/${seqProvContract}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContract),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    getSeqProvContract(): Observable<number> {
        return this.httpClient.get(`${this.provContractUrl}/next-seq-prov-contact`, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getProvContractsCount(): Observable<number> {
        var url = `${this.provContractUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findBySeqCovProvGrp(seqCovProvGrp : number): Observable<ProvContract[]> {
        return this.httpClient.get(`${this.provContractUrl}/find-by-seqcovprovgrp/${seqCovProvGrp}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContract),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByIpaId(ipaId : string): Observable<ProvContract[]> {
        return this.httpClient.get(`${this.provContractUrl}/find-by-ipaid/${ipaId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContract),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByClaimHoldReason(claimHoldReason : string): Observable<ProvContract[]> {
        return this.httpClient.get(`${this.provContractUrl}/find-by-claimholdreason/${claimHoldReason}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContract),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByLineOfBusiness(lineOfBusiness : string): Observable<ProvContract[]> {
        return this.httpClient.get(`${this.provContractUrl}/find-by-lineofbusiness/${lineOfBusiness}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContract),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByPanelId(panelId : string): Observable<ProvContract[]> {
        return this.httpClient.get(`${this.provContractUrl}/find-by-panelid/${panelId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContract),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findBySeqProvId(seqProvId : number): Observable<ProvContract[]> {
        return this.httpClient.get(`${this.provContractUrl}/find-by-seqprovid/${seqProvId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContract),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findBySeqVendAddress(seqVendAddress : number): Observable<ProvContract[]> {
        return this.httpClient.get(`${this.provContractUrl}/find-by-seqvendaddress/${seqVendAddress}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContract),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findBySeqVendId(seqVendId : number): Observable<ProvContract[]> {
        return this.httpClient.get(`${this.provContractUrl}/find-by-seqvendid/${seqVendId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContract),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByTermReason(termReason : string): Observable<ProvContract[]> {
        return this.httpClient.get(`${this.provContractUrl}/find-by-termreason/${termReason}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContract),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByPriceSchedule1(priceSchedule1 : string): Observable<ProvContract[]> {
        return this.httpClient.get(`${this.provContractUrl}/find-by-priceschedule1/${priceSchedule1}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContract),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByPriceRule2(priceRule2 : string): Observable<ProvContract[]> {
        return this.httpClient.get(`${this.provContractUrl}/find-by-pricerule2/${priceRule2}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContract),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByPriceRule1(priceRule1 : string): Observable<ProvContract[]> {
        return this.httpClient.get(`${this.provContractUrl}/find-by-pricerule1/${priceRule1}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContract),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByPriceSchedule2(priceSchedule2 : string): Observable<ProvContract[]> {
        return this.httpClient.get(`${this.provContractUrl}/find-by-priceschedule2/${priceSchedule2}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContract),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }




    createProvContract(provContract : ProvContract): Observable<any> {
        let body = JSON.stringify(provContract);
        return this.httpClient.post(this.provContractUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateProvContract(provContract : ProvContract, seqProvContract : number): Observable<any> {
        let body = JSON.stringify(provContract);
        return this.httpClient.put(`${this.provContractUrl}/${seqProvContract}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateProvContract(provContract : ProvContract, seqProvContract : number): Observable<any> {
        let body = JSON.stringify(provContract);
        return this.httpClient.patch(`${this.provContractUrl}/${seqProvContract}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteProvContract(seqProvContract : number): Observable<any> {
        return this.httpClient.delete(`${this.provContractUrl}/${seqProvContract}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }


    findBySeqProviderId(seqProvId : any): Observable<ProvContract[]> {
        return this.httpClient.get(`${this.provContractUrl}/find-by-seqproviderid/${seqProvId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContract),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getProviderContract(seqProvContract : number): Observable<ProvContract> {
        return this.httpClient.get(`${this.provContractUrl}/provider-contract/${seqProvContract}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContract),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

}
