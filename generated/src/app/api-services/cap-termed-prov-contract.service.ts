/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CapTermedProvContract } from '../api-models/cap-termed-prov-contract.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CapTermedProvContractService {

    private capTermedProvContractUrl: string = `${environment.apiUrl}/captermedprovcontracts`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCapTermedProvContracts(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CapTermedProvContract[]> {
        var url = `${this.capTermedProvContractUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CapTermedProvContract[]),
                catchError(this.sharedService.handleError))
    }

    getCapTermedProvContract(seqProvContract : number): Observable<CapTermedProvContract> {
        return this.httpClient.get(`${this.capTermedProvContractUrl}/${seqProvContract}`, {observe: 'response'})
            .pipe(map(response => response.body as CapTermedProvContract),
                catchError(this.sharedService.handleError))
    }

    getCapTermedProvContractsCount(): Observable<number> {
        var url = `${this.capTermedProvContractUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCapTermedProvContract(capTermedProvContract : CapTermedProvContract): Observable<any> {
        let body = JSON.stringify(capTermedProvContract);
        return this.httpClient.post(this.capTermedProvContractUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCapTermedProvContract(capTermedProvContract : CapTermedProvContract, seqProvContract : number): Observable<any> {
        let body = JSON.stringify(capTermedProvContract);
        return this.httpClient.put(`${this.capTermedProvContractUrl}/${seqProvContract}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCapTermedProvContract(capTermedProvContract : CapTermedProvContract, seqProvContract : number): Observable<any> {
        let body = JSON.stringify(capTermedProvContract);
        return this.httpClient.patch(`${this.capTermedProvContractUrl}/${seqProvContract}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCapTermedProvContract(seqProvContract : number): Observable<any> {
        return this.httpClient.delete(`${this.capTermedProvContractUrl}/${seqProvContract}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}