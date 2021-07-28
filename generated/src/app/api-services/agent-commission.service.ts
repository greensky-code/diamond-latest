/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AgentCommission } from '../api-models/agent-commission.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AgentCommissionService {

    private agentCommissionUrl: string = `${environment.apiUrl}/agentcommissions`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAgentCommissions(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AgentCommission[]> {
        var url = `${this.agentCommissionUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AgentCommission[]),
                catchError(this.sharedService.handleError))
    }

    getAgentCommission(seqAgentCommissionId : number): Observable<AgentCommission> {
        return this.httpClient.get(`${this.agentCommissionUrl}/${seqAgentCommissionId}`, {observe: 'response'})
            .pipe(map(response => response.body as AgentCommission),
                catchError(this.sharedService.handleError))
    }

    getAgentCommissionsCount(): Observable<number> {
        var url = `${this.agentCommissionUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqVendAddress(seqVendAddress : number): Observable<AgentCommission[]> {
        return this.httpClient.get(`${this.agentCommissionUrl}/find-by-seqvendaddress/${seqVendAddress}`, {observe: 'response'})
            .pipe(map(response => response.body as AgentCommission),
                catchError(this.sharedService.handleError))
    }
    findByAgentSalesType(agentSalesType : string): Observable<AgentCommission[]> {
        return this.httpClient.get(`${this.agentCommissionUrl}/find-by-agentsalestype/${agentSalesType}`, {observe: 'response'})
            .pipe(map(response => response.body as AgentCommission),
                catchError(this.sharedService.handleError))
    }
    findBySeqVendId(seqVendId : number): Observable<AgentCommission[]> {
        return this.httpClient.get(`${this.agentCommissionUrl}/find-by-seqvendid/${seqVendId}`, {observe: 'response'})
            .pipe(map(response => response.body as AgentCommission),
                catchError(this.sharedService.handleError))
    }




    createAgentCommission(agentCommission : AgentCommission): Observable<any> {
        let body = JSON.stringify(agentCommission);
        return this.httpClient.post(this.agentCommissionUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateAgentCommission(agentCommission : AgentCommission, seqAgentCommissionId : number): Observable<any> {
        let body = JSON.stringify(agentCommission);
        return this.httpClient.put(`${this.agentCommissionUrl}/${seqAgentCommissionId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateAgentCommission(agentCommission : AgentCommission, seqAgentCommissionId : number): Observable<any> {
        let body = JSON.stringify(agentCommission);
        return this.httpClient.patch(`${this.agentCommissionUrl}/${seqAgentCommissionId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteAgentCommission(seqAgentCommissionId : number): Observable<any> {
        return this.httpClient.delete(`${this.agentCommissionUrl}/${seqAgentCommissionId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}