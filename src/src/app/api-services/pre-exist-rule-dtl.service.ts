/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PreExistRuleDtl } from '../api-models/pre-exist-rule-dtl.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PreExistRuleDtlService {

    private preExistRuleDtlUrl: string = `${environment.apiUrl}/preexistruledtls`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPreExistRuleDtls(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PreExistRuleDtl[]> {
        var url = `${this.preExistRuleDtlUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PreExistRuleDtl[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getPreExistRuleDtl(seqPecDtlId : number): Observable<PreExistRuleDtl> {
        return this.httpClient.get(`${this.preExistRuleDtlUrl}/${seqPecDtlId}`, {observe: 'response'})
            .pipe(map(response => response.body as PreExistRuleDtl),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getPreExistRuleDtlsCount(): Observable<number> {
        var url = `${this.preExistRuleDtlUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findBySeqPecId(seqPecId : number): Observable<PreExistRuleDtl[]> {
        return this.httpClient.get(`${this.preExistRuleDtlUrl}/find-by-seqpecid/${seqPecId}`, {observe: 'response'})
            .pipe(map(response => response.body as PreExistRuleDtl),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    createPreExistRuleDtl(preExistRuleDtl : PreExistRuleDtl): Observable<any> {
        let body = JSON.stringify(preExistRuleDtl);
        return this.httpClient.post(this.preExistRuleDtlUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updatePreExistRuleDtl(preExistRuleDtl : PreExistRuleDtl, seqPecDtlId : number): Observable<any> {
        let body = JSON.stringify(preExistRuleDtl);
        return this.httpClient.put(`${this.preExistRuleDtlUrl}/${seqPecDtlId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdatePreExistRuleDtl(preExistRuleDtl : PreExistRuleDtl, seqPecDtlId : number): Observable<any> {
        let body = JSON.stringify(preExistRuleDtl);
        return this.httpClient.patch(`${this.preExistRuleDtlUrl}/${seqPecDtlId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deletePreExistRuleDtl(seqPecDtlId : number): Observable<any> {
        return this.httpClient.delete(`${this.preExistRuleDtlUrl}/${seqPecDtlId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
