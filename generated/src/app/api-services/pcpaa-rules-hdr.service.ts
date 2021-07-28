/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PcpaaRulesHdr } from '../api-models/pcpaa-rules-hdr.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PcpaaRulesHdrService {

    private pcpaaRulesHdrUrl: string = `${environment.apiUrl}/pcpaaruleshdrs`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPcpaaRulesHdrs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PcpaaRulesHdr[]> {
        var url = `${this.pcpaaRulesHdrUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PcpaaRulesHdr[]),
                catchError(this.sharedService.handleError))
    }

    getPcpaaRulesHdr(ruleId : string): Observable<PcpaaRulesHdr> {
        return this.httpClient.get(`${this.pcpaaRulesHdrUrl}/${ruleId}`, {observe: 'response'})
            .pipe(map(response => response.body as PcpaaRulesHdr),
                catchError(this.sharedService.handleError))
    }

    getPcpaaRulesHdrsCount(): Observable<number> {
        var url = `${this.pcpaaRulesHdrUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createPcpaaRulesHdr(pcpaaRulesHdr : PcpaaRulesHdr): Observable<any> {
        let body = JSON.stringify(pcpaaRulesHdr);
        return this.httpClient.post(this.pcpaaRulesHdrUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updatePcpaaRulesHdr(pcpaaRulesHdr : PcpaaRulesHdr, ruleId : string): Observable<any> {
        let body = JSON.stringify(pcpaaRulesHdr);
        return this.httpClient.put(`${this.pcpaaRulesHdrUrl}/${ruleId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdatePcpaaRulesHdr(pcpaaRulesHdr : PcpaaRulesHdr, ruleId : string): Observable<any> {
        let body = JSON.stringify(pcpaaRulesHdr);
        return this.httpClient.patch(`${this.pcpaaRulesHdrUrl}/${ruleId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deletePcpaaRulesHdr(ruleId : string): Observable<any> {
        return this.httpClient.delete(`${this.pcpaaRulesHdrUrl}/${ruleId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}