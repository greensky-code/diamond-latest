/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { MemberEligHistoryEdi } from '../api-models/member-elig-history-edi.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class MemberEligHistoryEdiService {

    private memberEligHistoryEdiUrl: string = `${environment.apiUrl}/memberelighistoryedis`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getMemberEligHistoryEdis(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<MemberEligHistoryEdi[]> {
        var url = `${this.memberEligHistoryEdiUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as MemberEligHistoryEdi[]),
                catchError(this.sharedService.handleError))
    }

    getMemberEligHistoryEdi(transactionSetId : string): Observable<MemberEligHistoryEdi> {
        return this.httpClient.get(`${this.memberEligHistoryEdiUrl}/${transactionSetId}`, {observe: 'response'})
            .pipe(map(response => response.body as MemberEligHistoryEdi),
                catchError(this.sharedService.handleError))
    }

    getMemberEligHistoryEdisCount(): Observable<number> {
        var url = `${this.memberEligHistoryEdiUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createMemberEligHistoryEdi(memberEligHistoryEdi : MemberEligHistoryEdi): Observable<any> {
        let body = JSON.stringify(memberEligHistoryEdi);
        return this.httpClient.post(this.memberEligHistoryEdiUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateMemberEligHistoryEdi(memberEligHistoryEdi : MemberEligHistoryEdi, transactionSetId : string): Observable<any> {
        let body = JSON.stringify(memberEligHistoryEdi);
        return this.httpClient.put(`${this.memberEligHistoryEdiUrl}/${transactionSetId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateMemberEligHistoryEdi(memberEligHistoryEdi : MemberEligHistoryEdi, transactionSetId : string): Observable<any> {
        let body = JSON.stringify(memberEligHistoryEdi);
        return this.httpClient.patch(`${this.memberEligHistoryEdiUrl}/${transactionSetId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteMemberEligHistoryEdi(transactionSetId : string): Observable<any> {
        return this.httpClient.delete(`${this.memberEligHistoryEdiUrl}/${transactionSetId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}