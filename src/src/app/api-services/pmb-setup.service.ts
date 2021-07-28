/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PmbSetup } from '../api-models/pmb-setup.model'
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PmbSetupService {

    private pmbSetupUrl: string = `${environment.apiUrl}/pmbsetups`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                

                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPmbSetups(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PmbSetup[]> {
        var url = `${this.pmbSetupUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PmbSetup[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getPmbSetup(seqGpbilId : number): Observable<PmbSetup> {
        return this.httpClient.get(`${this.pmbSetupUrl}/${seqGpbilId}`, {observe: 'response'})
            .pipe(map(response => response.body as PmbSetup),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getPmbSetupsCount(): Observable<number> {
        var url = `${this.pmbSetupUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }


    getNextJobId(): Observable<string> {
        const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
        return this.httpClient.get(`${this.pmbSetupUrl}/getNextJobId`, { headers, responseType: 'text'})
            .pipe(map(response => response as string)
                ,catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }));
    }

    createPmbSetup(pmbSetup : PmbSetup): Observable<PmbSetup> {
        let body = JSON.stringify(pmbSetup);
        return this.httpClient.post(this.pmbSetupUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response as PmbSetup),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updatePmbSetup(pmbSetup : PmbSetup, seqGpbilId : number): Observable<any> {
        let body = JSON.stringify(pmbSetup);
        return this.httpClient.put(`${this.pmbSetupUrl}/${seqGpbilId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdatePmbSetup(pmbSetup : PmbSetup, seqGpbilId : number): Observable<any> {
        let body = JSON.stringify(pmbSetup);
        return this.httpClient.patch(`${this.pmbSetupUrl}/${seqGpbilId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deletePmbSetup(seqGpbilId : number): Observable<any> {
        return this.httpClient.delete(`${this.pmbSetupUrl}/${seqGpbilId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }


    getMaxBillThruRequestDate(billing_cycle : string, billing_type:string): Observable<Date> {
        let requestParams = new HttpParams().set("billingCycle",billing_cycle).set("billingType", billing_type); 
        return this.httpClient.get(`${this.pmbSetupUrl}/getMaxBillThruRequestDate`, {params: requestParams, observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    validateBillingCycle(billing_cycle : string, billing_type:string,billJobType:string,billThruRequestDate:string): Observable<Number> {
        let requestParams = new HttpParams().set("billingCycle",billing_cycle).set("billingType", billing_type)
                                 .set("billJobType",billJobType).set("billThruRequestDate",billThruRequestDate); 

        return this.httpClient.get(`${this.pmbSetupUrl}/validateBillingCycle`, {params: requestParams, observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

}
