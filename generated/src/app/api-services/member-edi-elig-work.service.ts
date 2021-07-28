/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { MemberEdiEligWork } from '../api-models/member-edi-elig-work.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class MemberEdiEligWorkService {

    private memberEdiEligWorkUrl: string = `${environment.apiUrl}/memberedieligworks`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getMemberEdiEligWorks(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<MemberEdiEligWork[]> {
        var url = `${this.memberEdiEligWorkUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as MemberEdiEligWork[]),
                catchError(this.sharedService.handleError))
    }

    getMemberEdiEligWork(personNumber : string): Observable<MemberEdiEligWork> {
        return this.httpClient.get(`${this.memberEdiEligWorkUrl}/${personNumber}`, {observe: 'response'})
            .pipe(map(response => response.body as MemberEdiEligWork),
                catchError(this.sharedService.handleError))
    }

    getMemberEdiEligWorksCount(): Observable<number> {
        var url = `${this.memberEdiEligWorkUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createMemberEdiEligWork(memberEdiEligWork : MemberEdiEligWork): Observable<any> {
        let body = JSON.stringify(memberEdiEligWork);
        return this.httpClient.post(this.memberEdiEligWorkUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateMemberEdiEligWork(memberEdiEligWork : MemberEdiEligWork, personNumber : string): Observable<any> {
        let body = JSON.stringify(memberEdiEligWork);
        return this.httpClient.put(`${this.memberEdiEligWorkUrl}/${personNumber}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateMemberEdiEligWork(memberEdiEligWork : MemberEdiEligWork, personNumber : string): Observable<any> {
        let body = JSON.stringify(memberEdiEligWork);
        return this.httpClient.patch(`${this.memberEdiEligWorkUrl}/${personNumber}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteMemberEdiEligWork(personNumber : string): Observable<any> {
        return this.httpClient.delete(`${this.memberEdiEligWorkUrl}/${personNumber}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}