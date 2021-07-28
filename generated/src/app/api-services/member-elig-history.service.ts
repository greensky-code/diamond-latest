/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { MemberEligHistory } from '../api-models/member-elig-history.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class MemberEligHistoryService {

    private memberEligHistoryUrl: string = `${environment.apiUrl}/memberelighistorys`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getMemberEligHistorys(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<MemberEligHistory[]> {
        var url = `${this.memberEligHistoryUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as MemberEligHistory[]),
                catchError(this.sharedService.handleError))
    }

    getMemberEligHistory(seqMembId : number): Observable<MemberEligHistory> {
        return this.httpClient.get(`${this.memberEligHistoryUrl}/${seqMembId}`, {observe: 'response'})
            .pipe(map(response => response.body as MemberEligHistory),
                catchError(this.sharedService.handleError))
    }

    getMemberEligHistorysCount(): Observable<number> {
        var url = `${this.memberEligHistoryUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createMemberEligHistory(memberEligHistory : MemberEligHistory): Observable<any> {
        let body = JSON.stringify(memberEligHistory);
        return this.httpClient.post(this.memberEligHistoryUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateMemberEligHistory(memberEligHistory : MemberEligHistory, seqMembId : number): Observable<any> {
        let body = JSON.stringify(memberEligHistory);
        return this.httpClient.put(`${this.memberEligHistoryUrl}/${seqMembId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateMemberEligHistory(memberEligHistory : MemberEligHistory, seqMembId : number): Observable<any> {
        let body = JSON.stringify(memberEligHistory);
        return this.httpClient.patch(`${this.memberEligHistoryUrl}/${seqMembId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteMemberEligHistory(seqMembId : number): Observable<any> {
        return this.httpClient.delete(`${this.memberEligHistoryUrl}/${seqMembId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}