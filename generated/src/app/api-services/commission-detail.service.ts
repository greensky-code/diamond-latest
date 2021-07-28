/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CommissionDetail } from '../api-models/commission-detail.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CommissionDetailService {

    private commissionDetailUrl: string = `${environment.apiUrl}/commissiondetails`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCommissionDetails(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CommissionDetail[]> {
        var url = `${this.commissionDetailUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CommissionDetail[]),
                catchError(this.sharedService.handleError))
    }

    getCommissionDetail(seqCommissionId : number): Observable<CommissionDetail> {
        return this.httpClient.get(`${this.commissionDetailUrl}/${seqCommissionId}`, {observe: 'response'})
            .pipe(map(response => response.body as CommissionDetail),
                catchError(this.sharedService.handleError))
    }

    getCommissionDetailsCount(): Observable<number> {
        var url = `${this.commissionDetailUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqAgentId(seqAgentId : number): Observable<CommissionDetail[]> {
        return this.httpClient.get(`${this.commissionDetailUrl}/find-by-seqagentid/${seqAgentId}`, {observe: 'response'})
            .pipe(map(response => response.body as CommissionDetail),
                catchError(this.sharedService.handleError))
    }
    findByAgentSalesType(agentSalesType : string): Observable<CommissionDetail[]> {
        return this.httpClient.get(`${this.commissionDetailUrl}/find-by-agentsalestype/${agentSalesType}`, {observe: 'response'})
            .pipe(map(response => response.body as CommissionDetail),
                catchError(this.sharedService.handleError))
    }
    findBySeqGroupId(seqGroupId : number): Observable<CommissionDetail[]> {
        return this.httpClient.get(`${this.commissionDetailUrl}/find-by-seqgroupid/${seqGroupId}`, {observe: 'response'})
            .pipe(map(response => response.body as CommissionDetail),
                catchError(this.sharedService.handleError))
    }
    findBySeqVendAddress(seqVendAddress : number): Observable<CommissionDetail[]> {
        return this.httpClient.get(`${this.commissionDetailUrl}/find-by-seqvendaddress/${seqVendAddress}`, {observe: 'response'})
            .pipe(map(response => response.body as CommissionDetail),
                catchError(this.sharedService.handleError))
    }
    findBySeqVendId(seqVendId : number): Observable<CommissionDetail[]> {
        return this.httpClient.get(`${this.commissionDetailUrl}/find-by-seqvendid/${seqVendId}`, {observe: 'response'})
            .pipe(map(response => response.body as CommissionDetail),
                catchError(this.sharedService.handleError))
    }




    createCommissionDetail(commissionDetail : CommissionDetail): Observable<any> {
        let body = JSON.stringify(commissionDetail);
        return this.httpClient.post(this.commissionDetailUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCommissionDetail(commissionDetail : CommissionDetail, seqCommissionId : number): Observable<any> {
        let body = JSON.stringify(commissionDetail);
        return this.httpClient.put(`${this.commissionDetailUrl}/${seqCommissionId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCommissionDetail(commissionDetail : CommissionDetail, seqCommissionId : number): Observable<any> {
        let body = JSON.stringify(commissionDetail);
        return this.httpClient.patch(`${this.commissionDetailUrl}/${seqCommissionId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCommissionDetail(seqCommissionId : number): Observable<any> {
        return this.httpClient.delete(`${this.commissionDetailUrl}/${seqCommissionId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}