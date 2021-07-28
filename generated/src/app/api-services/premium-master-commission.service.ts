/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PremiumMasterCommission } from '../api-models/premium-master-commission.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PremiumMasterCommissionService {

    private premiumMasterCommissionUrl: string = `${environment.apiUrl}/premiummastercommissions`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPremiumMasterCommissions(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PremiumMasterCommission[]> {
        var url = `${this.premiumMasterCommissionUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PremiumMasterCommission[]),
                catchError(this.sharedService.handleError))
    }

    getPremiumMasterCommission(seqPremCommissionId : number): Observable<PremiumMasterCommission> {
        return this.httpClient.get(`${this.premiumMasterCommissionUrl}/${seqPremCommissionId}`, {observe: 'response'})
            .pipe(map(response => response.body as PremiumMasterCommission),
                catchError(this.sharedService.handleError))
    }

    getPremiumMasterCommissionsCount(): Observable<number> {
        var url = `${this.premiumMasterCommissionUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqAgentId(seqAgentId : number): Observable<PremiumMasterCommission[]> {
        return this.httpClient.get(`${this.premiumMasterCommissionUrl}/find-by-seqagentid/${seqAgentId}`, {observe: 'response'})
            .pipe(map(response => response.body as PremiumMasterCommission),
                catchError(this.sharedService.handleError))
    }
    findByAgentSalesType(agentSalesType : string): Observable<PremiumMasterCommission[]> {
        return this.httpClient.get(`${this.premiumMasterCommissionUrl}/find-by-agentsalestype/${agentSalesType}`, {observe: 'response'})
            .pipe(map(response => response.body as PremiumMasterCommission),
                catchError(this.sharedService.handleError))
    }
    findBySeqVendAddress(seqVendAddress : number): Observable<PremiumMasterCommission[]> {
        return this.httpClient.get(`${this.premiumMasterCommissionUrl}/find-by-seqvendaddress/${seqVendAddress}`, {observe: 'response'})
            .pipe(map(response => response.body as PremiumMasterCommission),
                catchError(this.sharedService.handleError))
    }
    findBySeqVendId(seqVendId : number): Observable<PremiumMasterCommission[]> {
        return this.httpClient.get(`${this.premiumMasterCommissionUrl}/find-by-seqvendid/${seqVendId}`, {observe: 'response'})
            .pipe(map(response => response.body as PremiumMasterCommission),
                catchError(this.sharedService.handleError))
    }
    findByAgentSalesType(agentSalesType : string): Observable<PremiumMasterCommission[]> {
        return this.httpClient.get(`${this.premiumMasterCommissionUrl}/find-by-agentsalestype/${agentSalesType}`, {observe: 'response'})
            .pipe(map(response => response.body as PremiumMasterCommission),
                catchError(this.sharedService.handleError))
    }




    createPremiumMasterCommission(premiumMasterCommission : PremiumMasterCommission): Observable<any> {
        let body = JSON.stringify(premiumMasterCommission);
        return this.httpClient.post(this.premiumMasterCommissionUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updatePremiumMasterCommission(premiumMasterCommission : PremiumMasterCommission, seqPremCommissionId : number): Observable<any> {
        let body = JSON.stringify(premiumMasterCommission);
        return this.httpClient.put(`${this.premiumMasterCommissionUrl}/${seqPremCommissionId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdatePremiumMasterCommission(premiumMasterCommission : PremiumMasterCommission, seqPremCommissionId : number): Observable<any> {
        let body = JSON.stringify(premiumMasterCommission);
        return this.httpClient.patch(`${this.premiumMasterCommissionUrl}/${seqPremCommissionId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deletePremiumMasterCommission(seqPremCommissionId : number): Observable<any> {
        return this.httpClient.delete(`${this.premiumMasterCommissionUrl}/${seqPremCommissionId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}