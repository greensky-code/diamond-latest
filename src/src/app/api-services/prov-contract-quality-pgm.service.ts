/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProvContractQualityPgm } from '../api-models/prov-contract-quality-pgm.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ProvContractQualityPgmService {

    private provContractQualityPgmUrl: string = `${environment.apiUrl}/provcontractqualitypgms`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getProvContractQualityPgms(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ProvContractQualityPgm[]> {
        var url = `${this.provContractQualityPgmUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ProvContractQualityPgm[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getProvContractQualityPgm(seqProvContract : number): Observable<ProvContractQualityPgm> {
        return this.httpClient.get(`${this.provContractQualityPgmUrl}/${seqProvContract}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvContractQualityPgm),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getProvContractQualityPgmsCount(): Observable<number> {
        var url = `${this.provContractQualityPgmUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }





    createProvContractQualityPgm(provContractQualityPgm : ProvContractQualityPgm): Observable<any> {
        let body = JSON.stringify(provContractQualityPgm);
        return this.httpClient.post(this.provContractQualityPgmUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateProvContractQualityPgm(provContractQualityPgm : ProvContractQualityPgm, seqProvContract : number): Observable<any> {
        let body = JSON.stringify(provContractQualityPgm);
        return this.httpClient.put(`${this.provContractQualityPgmUrl}/${seqProvContract}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateProvContractQualityPgm(provContractQualityPgm : ProvContractQualityPgm, seqProvContract : number): Observable<any> {
        let body = JSON.stringify(provContractQualityPgm);
        return this.httpClient.patch(`${this.provContractQualityPgmUrl}/${seqProvContract}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteProvContractQualityPgm(seqProvContract : number): Observable<any> {
        return this.httpClient.delete(`${this.provContractQualityPgmUrl}/${seqProvContract}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
