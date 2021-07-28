/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { HttpHeaders } from '@angular/common/http';

import { catchError, map } from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {SharedService} from '../../shared/services/shared.service';
import {PcpaaRulesHdr} from '../../api-models/support/pcpaa-rules-hdr.model';

@Injectable()
export class PcpaaRulesHdrService {

    private pcpaaRulesHdrUrl = `${environment.apiUrl}/pcpaaruleshdrs`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient: HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPcpaaRulesHdrs(usePagination= false, page = 0, size = 0): Observable<PcpaaRulesHdr[]> {
        let url = `${this.pcpaaRulesHdrUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PcpaaRulesHdr[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getPcpaaRulesHdr(ruleId: string): Observable<PcpaaRulesHdr> {
        return this.httpClient.get(`${this.pcpaaRulesHdrUrl}/${ruleId}`, {observe: 'response'})
            .pipe(map(response => response.body as PcpaaRulesHdr),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getPcpaaRulesHdrsCount(): Observable<number> {
        let url = `${this.pcpaaRulesHdrUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    createPcpaaRulesHdr(pcpaaRulesHdr: PcpaaRulesHdr): Observable<any> {
        let body = JSON.stringify(pcpaaRulesHdr);
        return this.httpClient.post(this.pcpaaRulesHdrUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updatePcpaaRulesHdr(pcpaaRulesHdr: PcpaaRulesHdr, ruleId: string): Observable<any> {
        let body = JSON.stringify(pcpaaRulesHdr);
        return this.httpClient.put(`${this.pcpaaRulesHdrUrl}/${ruleId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdatePcpaaRulesHdr(pcpaaRulesHdr: PcpaaRulesHdr, ruleId: string): Observable<any> {
        let body = JSON.stringify(pcpaaRulesHdr);
        return this.httpClient.patch(`${this.pcpaaRulesHdrUrl}/${ruleId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deletePcpaaRulesHdr(ruleId: string): Observable<any> {
        return this.httpClient.delete(`${this.pcpaaRulesHdrUrl}/${ruleId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getScreenAttributes(): Observable<any> {
        return this.httpClient.get(`${this.pcpaaRulesHdrUrl}/find/attributes`, {observe: 'response'})
            .pipe(map(response => response.body as PcpaaRulesHdr),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }
}
