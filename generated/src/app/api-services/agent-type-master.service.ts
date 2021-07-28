/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AgentTypeMaster } from '../api-models/agent-type-master.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AgentTypeMasterService {

    private agentTypeMasterUrl: string = `${environment.apiUrl}/agenttypemasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAgentTypeMasters(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AgentTypeMaster[]> {
        var url = `${this.agentTypeMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AgentTypeMaster[]),
                catchError(this.sharedService.handleError))
    }

    getAgentTypeMaster(agentType : string): Observable<AgentTypeMaster> {
        return this.httpClient.get(`${this.agentTypeMasterUrl}/${agentType}`, {observe: 'response'})
            .pipe(map(response => response.body as AgentTypeMaster),
                catchError(this.sharedService.handleError))
    }

    getAgentTypeMastersCount(): Observable<number> {
        var url = `${this.agentTypeMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createAgentTypeMaster(agentTypeMaster : AgentTypeMaster): Observable<any> {
        let body = JSON.stringify(agentTypeMaster);
        return this.httpClient.post(this.agentTypeMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateAgentTypeMaster(agentTypeMaster : AgentTypeMaster, agentType : string): Observable<any> {
        let body = JSON.stringify(agentTypeMaster);
        return this.httpClient.put(`${this.agentTypeMasterUrl}/${agentType}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateAgentTypeMaster(agentTypeMaster : AgentTypeMaster, agentType : string): Observable<any> {
        let body = JSON.stringify(agentTypeMaster);
        return this.httpClient.patch(`${this.agentTypeMasterUrl}/${agentType}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteAgentTypeMaster(agentType : string): Observable<any> {
        return this.httpClient.delete(`${this.agentTypeMasterUrl}/${agentType}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}