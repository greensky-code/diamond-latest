/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PcpaaRulesDtl } from '../api-models/pcpaa-rules-dtl.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PcpaaRulesDtlService {

    private pcpaaRulesDtlUrl: string = `${environment.apiUrl}/pcpaarulesdtls`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPcpaaRulesDtls(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PcpaaRulesDtl[]> {
        var url = `${this.pcpaaRulesDtlUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PcpaaRulesDtl[]),
                catchError(this.sharedService.handleError))
    }

    getPcpaaRulesDtl(ruleId : string): Observable<PcpaaRulesDtl> {
        return this.httpClient.get(`${this.pcpaaRulesDtlUrl}/${ruleId}`, {observe: 'response'})
            .pipe(map(response => response.body as PcpaaRulesDtl),
                catchError(this.sharedService.handleError))
    }

    getPcpaaRulesDtlsCount(): Observable<number> {
        var url = `${this.pcpaaRulesDtlUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqAttrbId(seqAttrbId : number): Observable<PcpaaRulesDtl[]> {
        return this.httpClient.get(`${this.pcpaaRulesDtlUrl}/find-by-seqattrbid/${seqAttrbId}`, {observe: 'response'})
            .pipe(map(response => response.body as PcpaaRulesDtl),
                catchError(this.sharedService.handleError))
    }
    findByRuleId(ruleId : string): Observable<PcpaaRulesDtl[]> {
        return this.httpClient.get(`${this.pcpaaRulesDtlUrl}/find-by-ruleid/${ruleId}`, {observe: 'response'})
            .pipe(map(response => response.body as PcpaaRulesDtl),
                catchError(this.sharedService.handleError))
    }




    createPcpaaRulesDtl(pcpaaRulesDtl : PcpaaRulesDtl): Observable<any> {
        let body = JSON.stringify(pcpaaRulesDtl);
        return this.httpClient.post(this.pcpaaRulesDtlUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updatePcpaaRulesDtl(pcpaaRulesDtl : PcpaaRulesDtl, ruleId : string): Observable<any> {
        let body = JSON.stringify(pcpaaRulesDtl);
        return this.httpClient.put(`${this.pcpaaRulesDtlUrl}/${ruleId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdatePcpaaRulesDtl(pcpaaRulesDtl : PcpaaRulesDtl, ruleId : string): Observable<any> {
        let body = JSON.stringify(pcpaaRulesDtl);
        return this.httpClient.patch(`${this.pcpaaRulesDtlUrl}/${ruleId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deletePcpaaRulesDtl(ruleId : string): Observable<any> {
        return this.httpClient.delete(`${this.pcpaaRulesDtlUrl}/${ruleId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}