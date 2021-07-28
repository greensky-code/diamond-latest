/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PcpAutoAssignDtl } from '../../api-models/index';
import { environment } from '../../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PcpAutoAssignDtlService {

    private pcpAutoAssignDtlUrl: string = `${environment.apiUrl}/pcpautoassigndtls`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPcpAutoAssignDtls(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PcpAutoAssignDtl[]> {
        var url = `${this.pcpAutoAssignDtlUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PcpAutoAssignDtl[]),
                catchError(this.sharedService.handleError))
    }

    getPcpAutoAssignDtl(seqPcpAutoAssgn : number): Observable<PcpAutoAssignDtl> {
        return this.httpClient.get(`${this.pcpAutoAssignDtlUrl}/${seqPcpAutoAssgn}`, {observe: 'response'})
            .pipe(map(response => response.body as PcpAutoAssignDtl),
                catchError(this.sharedService.handleError))
    }

    getPcpAutoAssignDtlsCount(): Observable<number> {
        var url = `${this.pcpAutoAssignDtlUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqPcpAutoAssgn(seqPcpAutoAssgn : number): Observable<PcpAutoAssignDtl[]> {
        return this.httpClient.get(`${this.pcpAutoAssignDtlUrl}/find-by-seqpcpautoassgn/${seqPcpAutoAssgn}`, {observe: 'response'})
            .pipe(map(response => response.body as PcpAutoAssignDtl[]),
                catchError(this.sharedService.handleError))
    }

    findByRuleAndPcpAutoAssignHdr(seqPcpAutoAssgn : number): Observable<PcpAutoAssignDtl[]> {
        return this.httpClient.get(`${this.pcpAutoAssignDtlUrl}/find-by-rule/pcpautoassignhdr/${seqPcpAutoAssgn}`, {observe: 'response'})
            .pipe(map(response => response.body as PcpAutoAssignDtl[]),
                catchError(this.sharedService.handleError))
    }

    createPcpAutoAssignDtl(pcpAutoAssignDtl : PcpAutoAssignDtl): Observable<any> {
        let body = JSON.stringify(pcpAutoAssignDtl);
        return this.httpClient.post(this.pcpAutoAssignDtlUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updatePcpAutoAssignDtl(pcpAutoAssignDtl : PcpAutoAssignDtl, seqPcpAutoAssgn : number): Observable<any> {
        let body = JSON.stringify(pcpAutoAssignDtl);
        return this.httpClient.put(`${this.pcpAutoAssignDtlUrl}/${seqPcpAutoAssgn}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdatePcpAutoAssignDtl(pcpAutoAssignDtl : PcpAutoAssignDtl, seqPcpAutoAssgn : number): Observable<any> {
        let body = JSON.stringify(pcpAutoAssignDtl);
        return this.httpClient.patch(`${this.pcpAutoAssignDtlUrl}/${seqPcpAutoAssgn}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deletePcpAutoAssignDtl(seqPcpAutoAssgn : number): Observable<any> {
        return this.httpClient.delete(`${this.pcpAutoAssignDtlUrl}/${seqPcpAutoAssgn}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}
