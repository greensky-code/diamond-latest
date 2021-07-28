/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AgentMaster } from '../api-models/agent-master.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AgentMasterService {

    private agentMasterUrl: string = `${environment.apiUrl}/agentmasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAgentMasters(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AgentMaster[]> {
        var url = `${this.agentMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AgentMaster[]),
                catchError(this.sharedService.handleError))
    }

    getAgentMaster(seqAgentId : number): Observable<AgentMaster> {
        return this.httpClient.get(`${this.agentMasterUrl}/${seqAgentId}`, {observe: 'response'})
            .pipe(map(response => response.body as AgentMaster),
                catchError(this.sharedService.handleError))
    }

    getAgentMastersCount(): Observable<number> {
        var url = `${this.agentMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqAgentId(seqAgentId : number): Observable<AgentMaster[]> {
        return this.httpClient.get(`${this.agentMasterUrl}/find-by-seqagentid/${seqAgentId}`, {observe: 'response'})
            .pipe(map(response => response.body as AgentMaster),
                catchError(this.sharedService.handleError))
    }




    createAgentMaster(agentMaster : AgentMaster): Observable<any> {
        let body = JSON.stringify(agentMaster);
        return this.httpClient.post(this.agentMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateAgentMaster(agentMaster : AgentMaster, seqAgentId : number): Observable<any> {
        let body = JSON.stringify(agentMaster);
        return this.httpClient.put(`${this.agentMasterUrl}/${seqAgentId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateAgentMaster(agentMaster : AgentMaster, seqAgentId : number): Observable<any> {
        let body = JSON.stringify(agentMaster);
        return this.httpClient.patch(`${this.agentMasterUrl}/${seqAgentId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteAgentMaster(seqAgentId : number): Observable<any> {
        return this.httpClient.delete(`${this.agentMasterUrl}/${seqAgentId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}