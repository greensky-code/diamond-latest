/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AgentAddressContact } from '../api-models/agent-address-contact.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AgentAddressContactService {

    private agentAddressContactUrl: string = `${environment.apiUrl}/agentaddresscontacts`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAgentAddressContacts(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AgentAddressContact[]> {
        var url = `${this.agentAddressContactUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AgentAddressContact[]),
                catchError(this.sharedService.handleError))
    }

    getAgentAddressContact(seqAgentContact : number): Observable<AgentAddressContact> {
        return this.httpClient.get(`${this.agentAddressContactUrl}/${seqAgentContact}`, {observe: 'response'})
            .pipe(map(response => response.body as AgentAddressContact),
                catchError(this.sharedService.handleError))
    }

    getAgentAddressContactsCount(): Observable<number> {
        var url = `${this.agentAddressContactUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createAgentAddressContact(agentAddressContact : AgentAddressContact): Observable<any> {
        let body = JSON.stringify(agentAddressContact);
        return this.httpClient.post(this.agentAddressContactUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateAgentAddressContact(agentAddressContact : AgentAddressContact, seqAgentContact : number): Observable<any> {
        let body = JSON.stringify(agentAddressContact);
        return this.httpClient.put(`${this.agentAddressContactUrl}/${seqAgentContact}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateAgentAddressContact(agentAddressContact : AgentAddressContact, seqAgentContact : number): Observable<any> {
        let body = JSON.stringify(agentAddressContact);
        return this.httpClient.patch(`${this.agentAddressContactUrl}/${seqAgentContact}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteAgentAddressContact(seqAgentContact : number): Observable<any> {
        return this.httpClient.delete(`${this.agentAddressContactUrl}/${seqAgentContact}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}