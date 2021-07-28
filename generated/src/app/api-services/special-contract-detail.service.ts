/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SpecialContractDetail } from '../api-models/special-contract-detail.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SpecialContractDetailService {

    private specialContractDetailUrl: string = `${environment.apiUrl}/specialcontractdetails`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSpecialContractDetails(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SpecialContractDetail[]> {
        var url = `${this.specialContractDetailUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SpecialContractDetail[]),
                catchError(this.sharedService.handleError))
    }

    getSpecialContractDetail(seqSpecCont : number): Observable<SpecialContractDetail> {
        return this.httpClient.get(`${this.specialContractDetailUrl}/${seqSpecCont}`, {observe: 'response'})
            .pipe(map(response => response.body as SpecialContractDetail),
                catchError(this.sharedService.handleError))
    }

    getSpecialContractDetailsCount(): Observable<number> {
        var url = `${this.specialContractDetailUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByProcedureCode(procedureCode : string): Observable<SpecialContractDetail[]> {
        return this.httpClient.get(`${this.specialContractDetailUrl}/find-by-procedurecode/${procedureCode}`, {observe: 'response'})
            .pipe(map(response => response.body as SpecialContractDetail),
                catchError(this.sharedService.handleError))
    }
    findByPctBilledReason(pctBilledReason : string): Observable<SpecialContractDetail[]> {
        return this.httpClient.get(`${this.specialContractDetailUrl}/find-by-pctbilledreason/${pctBilledReason}`, {observe: 'response'})
            .pipe(map(response => response.body as SpecialContractDetail),
                catchError(this.sharedService.handleError))
    }
    findByAllowedReason(allowedReason : string): Observable<SpecialContractDetail[]> {
        return this.httpClient.get(`${this.specialContractDetailUrl}/find-by-allowedreason/${allowedReason}`, {observe: 'response'})
            .pipe(map(response => response.body as SpecialContractDetail),
                catchError(this.sharedService.handleError))
    }




    createSpecialContractDetail(specialContractDetail : SpecialContractDetail): Observable<any> {
        let body = JSON.stringify(specialContractDetail);
        return this.httpClient.post(this.specialContractDetailUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSpecialContractDetail(specialContractDetail : SpecialContractDetail, seqSpecCont : number): Observable<any> {
        let body = JSON.stringify(specialContractDetail);
        return this.httpClient.put(`${this.specialContractDetailUrl}/${seqSpecCont}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSpecialContractDetail(specialContractDetail : SpecialContractDetail, seqSpecCont : number): Observable<any> {
        let body = JSON.stringify(specialContractDetail);
        return this.httpClient.patch(`${this.specialContractDetailUrl}/${seqSpecCont}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSpecialContractDetail(seqSpecCont : number): Observable<any> {
        return this.httpClient.delete(`${this.specialContractDetailUrl}/${seqSpecCont}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}