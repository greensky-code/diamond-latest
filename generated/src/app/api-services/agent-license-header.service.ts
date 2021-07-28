/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AgentLicenseHeader } from '../api-models/agent-license-header.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AgentLicenseHeaderService {

    private agentLicenseHeaderUrl: string = `${environment.apiUrl}/agentlicenseheaders`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAgentLicenseHeaders(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AgentLicenseHeader[]> {
        var url = `${this.agentLicenseHeaderUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AgentLicenseHeader[]),
                catchError(this.sharedService.handleError))
    }

    getAgentLicenseHeader(seqAgentLicenseHeader : number): Observable<AgentLicenseHeader> {
        return this.httpClient.get(`${this.agentLicenseHeaderUrl}/${seqAgentLicenseHeader}`, {observe: 'response'})
            .pipe(map(response => response.body as AgentLicenseHeader),
                catchError(this.sharedService.handleError))
    }

    getAgentLicenseHeadersCount(): Observable<number> {
        var url = `${this.agentLicenseHeaderUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqAgentId(seqAgentId : number): Observable<AgentLicenseHeader[]> {
        return this.httpClient.get(`${this.agentLicenseHeaderUrl}/find-by-seqagentid/${seqAgentId}`, {observe: 'response'})
            .pipe(map(response => response.body as AgentLicenseHeader),
                catchError(this.sharedService.handleError))
    }
    findByCompanyCode(companyCode : string): Observable<AgentLicenseHeader[]> {
        return this.httpClient.get(`${this.agentLicenseHeaderUrl}/find-by-companycode/${companyCode}`, {observe: 'response'})
            .pipe(map(response => response.body as AgentLicenseHeader),
                catchError(this.sharedService.handleError))
    }
    findByRenewedReason(renewedReason : string): Observable<AgentLicenseHeader[]> {
        return this.httpClient.get(`${this.agentLicenseHeaderUrl}/find-by-renewedreason/${renewedReason}`, {observe: 'response'})
            .pipe(map(response => response.body as AgentLicenseHeader),
                catchError(this.sharedService.handleError))
    }
    findByDeniedReason(deniedReason : string): Observable<AgentLicenseHeader[]> {
        return this.httpClient.get(`${this.agentLicenseHeaderUrl}/find-by-deniedreason/${deniedReason}`, {observe: 'response'})
            .pipe(map(response => response.body as AgentLicenseHeader),
                catchError(this.sharedService.handleError))
    }
    findByClosedReason(closedReason : string): Observable<AgentLicenseHeader[]> {
        return this.httpClient.get(`${this.agentLicenseHeaderUrl}/find-by-closedreason/${closedReason}`, {observe: 'response'})
            .pipe(map(response => response.body as AgentLicenseHeader),
                catchError(this.sharedService.handleError))
    }
    findByHoldReason(holdReason : string): Observable<AgentLicenseHeader[]> {
        return this.httpClient.get(`${this.agentLicenseHeaderUrl}/find-by-holdreason/${holdReason}`, {observe: 'response'})
            .pipe(map(response => response.body as AgentLicenseHeader),
                catchError(this.sharedService.handleError))
    }




    createAgentLicenseHeader(agentLicenseHeader : AgentLicenseHeader): Observable<any> {
        let body = JSON.stringify(agentLicenseHeader);
        return this.httpClient.post(this.agentLicenseHeaderUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateAgentLicenseHeader(agentLicenseHeader : AgentLicenseHeader, seqAgentLicenseHeader : number): Observable<any> {
        let body = JSON.stringify(agentLicenseHeader);
        return this.httpClient.put(`${this.agentLicenseHeaderUrl}/${seqAgentLicenseHeader}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateAgentLicenseHeader(agentLicenseHeader : AgentLicenseHeader, seqAgentLicenseHeader : number): Observable<any> {
        let body = JSON.stringify(agentLicenseHeader);
        return this.httpClient.patch(`${this.agentLicenseHeaderUrl}/${seqAgentLicenseHeader}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteAgentLicenseHeader(seqAgentLicenseHeader : number): Observable<any> {
        return this.httpClient.delete(`${this.agentLicenseHeaderUrl}/${seqAgentLicenseHeader}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}