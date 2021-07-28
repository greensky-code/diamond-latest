/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AgentAddress } from '../api-models/agent-address.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AgentAddressService {

    private agentAddressUrl: string = `${environment.apiUrl}/agentaddresses`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAgentAddresses(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AgentAddress[]> {
        var url = `${this.agentAddressUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AgentAddress[]),
                catchError(this.sharedService.handleError))
    }

    getAgentAddress(seqAgentAddress : number): Observable<AgentAddress> {
        return this.httpClient.get(`${this.agentAddressUrl}/${seqAgentAddress}`, {observe: 'response'})
            .pipe(map(response => response.body as AgentAddress),
                catchError(this.sharedService.handleError))
    }

    getAgentAddressesCount(): Observable<number> {
        var url = `${this.agentAddressUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createAgentAddress(agentAddress : AgentAddress): Observable<any> {
        let body = JSON.stringify(agentAddress);
        return this.httpClient.post(this.agentAddressUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateAgentAddress(agentAddress : AgentAddress, seqAgentAddress : number): Observable<any> {
        let body = JSON.stringify(agentAddress);
        return this.httpClient.put(`${this.agentAddressUrl}/${seqAgentAddress}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateAgentAddress(agentAddress : AgentAddress, seqAgentAddress : number): Observable<any> {
        let body = JSON.stringify(agentAddress);
        return this.httpClient.patch(`${this.agentAddressUrl}/${seqAgentAddress}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteAgentAddress(seqAgentAddress : number): Observable<any> {
        return this.httpClient.delete(`${this.agentAddressUrl}/${seqAgentAddress}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}