/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {SharedService} from '../../shared/services/shared.service';
import {PcpaaRulesDtl} from '../../api-models/support/pcpaa-rules-dtl.model';

@Injectable()
export class PcpaaRulesDtlService {

    private pcpaaRulesDtlUrl = `${environment.apiUrl}/pcpaarulesdtls`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient: HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPcpaaRulesDtls(usePagination= false, page = 0, size = 0): Observable<PcpaaRulesDtl[]> {
        let url = `${this.pcpaaRulesDtlUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PcpaaRulesDtl[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getPcpaaRulesDtl(ruleId: string): Observable<PcpaaRulesDtl> {
        return this.httpClient.get(`${this.pcpaaRulesDtlUrl}/${ruleId}`, {observe: 'response'})
            .pipe(map(response => response.body as PcpaaRulesDtl),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getPcpaaRulesDtlsCount(): Observable<number> {
        let url = `${this.pcpaaRulesDtlUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findBySeqAttrbId(seqAttrbId: number): Observable<PcpaaRulesDtl[]> {
        return this.httpClient.get(`${this.pcpaaRulesDtlUrl}/find-by-seqattrbid/${seqAttrbId}`, {observe: 'response'})
            .pipe(map(response => response.body as PcpaaRulesDtl),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByRuleId(ruleId: string): Observable<PcpaaRulesDtl[]> {
        return this.httpClient.get(`${this.pcpaaRulesDtlUrl}/find-by-ruleid/${ruleId}`, {observe: 'response'})
            .pipe(map(response => response.body as PcpaaRulesDtl[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByRuleIdInMap(ruleId: string): Observable<PcpaaRulesDtl[]> {
        return this.httpClient.get(`${this.pcpaaRulesDtlUrl}/find-by-ruleid/${ruleId}/map`, {observe: 'response'})
            .pipe(map(response => response.body as PcpaaRulesDtl[]),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    createPcpaaRulesDtl(pcpaaRulesDtl: PcpaaRulesDtl): Observable<any> {
        let body = JSON.stringify(pcpaaRulesDtl);
        return this.httpClient.post(this.pcpaaRulesDtlUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updatePcpaaRulesDtl(pcpaaRulesDtl: PcpaaRulesDtl, ruleId: string): Observable<any> {
        let body = JSON.stringify(pcpaaRulesDtl);
        return this.httpClient.put(`${this.pcpaaRulesDtlUrl}/${ruleId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdatePcpaaRulesDtl(pcpaaRulesDtl: PcpaaRulesDtl, ruleId: string): Observable<any> {
        let body = JSON.stringify(pcpaaRulesDtl);
        return this.httpClient.patch(`${this.pcpaaRulesDtlUrl}/${ruleId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deletePcpaaRulesDtl(ruleId: string): Observable<any> {
        return this.httpClient.delete(`${this.pcpaaRulesDtlUrl}/${ruleId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
