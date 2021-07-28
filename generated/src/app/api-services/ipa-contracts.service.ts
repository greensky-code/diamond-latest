/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { IpaContracts } from '../api-models/ipa-contracts.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class IpaContractsService {

    private ipaContractsUrl: string = `${environment.apiUrl}/ipacontractss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getIpaContractss(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<IpaContracts[]> {
        var url = `${this.ipaContractsUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as IpaContracts[]),
                catchError(this.sharedService.handleError))
    }

    getIpaContracts(seqIpaContract : number): Observable<IpaContracts> {
        return this.httpClient.get(`${this.ipaContractsUrl}/${seqIpaContract}`, {observe: 'response'})
            .pipe(map(response => response.body as IpaContracts),
                catchError(this.sharedService.handleError))
    }

    getIpaContractssCount(): Observable<number> {
        var url = `${this.ipaContractsUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByLineOfBusiness(lineOfBusiness : string): Observable<IpaContracts[]> {
        return this.httpClient.get(`${this.ipaContractsUrl}/find-by-lineofbusiness/${lineOfBusiness}`, {observe: 'response'})
            .pipe(map(response => response.body as IpaContracts),
                catchError(this.sharedService.handleError))
    }
    findByIpaId(ipaId : string): Observable<IpaContracts[]> {
        return this.httpClient.get(`${this.ipaContractsUrl}/find-by-ipaid/${ipaId}`, {observe: 'response'})
            .pipe(map(response => response.body as IpaContracts),
                catchError(this.sharedService.handleError))
    }
    findByServiceAreaName(serviceAreaName : string): Observable<IpaContracts[]> {
        return this.httpClient.get(`${this.ipaContractsUrl}/find-by-serviceareaname/${serviceAreaName}`, {observe: 'response'})
            .pipe(map(response => response.body as IpaContracts),
                catchError(this.sharedService.handleError))
    }




    createIpaContracts(ipaContracts : IpaContracts): Observable<any> {
        let body = JSON.stringify(ipaContracts);
        return this.httpClient.post(this.ipaContractsUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateIpaContracts(ipaContracts : IpaContracts, seqIpaContract : number): Observable<any> {
        let body = JSON.stringify(ipaContracts);
        return this.httpClient.put(`${this.ipaContractsUrl}/${seqIpaContract}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateIpaContracts(ipaContracts : IpaContracts, seqIpaContract : number): Observable<any> {
        let body = JSON.stringify(ipaContracts);
        return this.httpClient.patch(`${this.ipaContractsUrl}/${seqIpaContract}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteIpaContracts(seqIpaContract : number): Observable<any> {
        return this.httpClient.delete(`${this.ipaContractsUrl}/${seqIpaContract}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}