/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { IpaContractSpeclProgms } from '../api-models/ipa-contract-specl-progms.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class IpaContractSpeclProgmsService {

    private ipaContractSpeclProgmsUrl: string = `${environment.apiUrl}/ipacontractspeclprogmss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getIpaContractSpeclProgmss(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<IpaContractSpeclProgms[]> {
        var url = `${this.ipaContractSpeclProgmsUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as IpaContractSpeclProgms[]),
                catchError(this.sharedService.handleError))
    }

    getIpaContractSpeclProgms(seqIpaContract : number): Observable<IpaContractSpeclProgms> {
        return this.httpClient.get(`${this.ipaContractSpeclProgmsUrl}/${seqIpaContract}`, {observe: 'response'})
            .pipe(map(response => response.body as IpaContractSpeclProgms),
                catchError(this.sharedService.handleError))
    }

    getIpaContractSpeclProgmssCount(): Observable<number> {
        var url = `${this.ipaContractSpeclProgmsUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqIpaContract(seqIpaContract : number): Observable<IpaContractSpeclProgms[]> {
        return this.httpClient.get(`${this.ipaContractSpeclProgmsUrl}/find-by-seqipacontract/${seqIpaContract}`, {observe: 'response'})
            .pipe(map(response => response.body as IpaContractSpeclProgms),
                catchError(this.sharedService.handleError))
    }
    findBySpecialProgramId(specialProgramId : string): Observable<IpaContractSpeclProgms[]> {
        return this.httpClient.get(`${this.ipaContractSpeclProgmsUrl}/find-by-specialprogramid/${specialProgramId}`, {observe: 'response'})
            .pipe(map(response => response.body as IpaContractSpeclProgms),
                catchError(this.sharedService.handleError))
    }




    createIpaContractSpeclProgms(ipaContractSpeclProgms : IpaContractSpeclProgms): Observable<any> {
        let body = JSON.stringify(ipaContractSpeclProgms);
        return this.httpClient.post(this.ipaContractSpeclProgmsUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateIpaContractSpeclProgms(ipaContractSpeclProgms : IpaContractSpeclProgms, seqIpaContract : number): Observable<any> {
        let body = JSON.stringify(ipaContractSpeclProgms);
        return this.httpClient.put(`${this.ipaContractSpeclProgmsUrl}/${seqIpaContract}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateIpaContractSpeclProgms(ipaContractSpeclProgms : IpaContractSpeclProgms, seqIpaContract : number): Observable<any> {
        let body = JSON.stringify(ipaContractSpeclProgms);
        return this.httpClient.patch(`${this.ipaContractSpeclProgmsUrl}/${seqIpaContract}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteIpaContractSpeclProgms(seqIpaContract : number): Observable<any> {
        return this.httpClient.delete(`${this.ipaContractSpeclProgmsUrl}/${seqIpaContract}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}