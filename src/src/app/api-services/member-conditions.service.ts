/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { MemberConditions } from '../api-models/member-conditions.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class MemberConditionsService {

    private memberConditionsUrl: string = `${environment.apiUrl}/memberconditionss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getMemberConditionss(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<MemberConditions[]> {
        var url = `${this.memberConditionsUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as MemberConditions[]),
                catchError(this.sharedService.handleError))
    }

    getMemberConditions(seqMembId : number): Observable<MemberConditions[]> {
        return this.httpClient.get(`${this.memberConditionsUrl}/find-by-seqmembid/${seqMembId}`, {observe: 'response'})
            .pipe(map(response => response.body as MemberConditions[]),
                catchError(this.sharedService.handleError))
    }

    getMemberConditionssCount(): Observable<number> {
        var url = `${this.memberConditionsUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createMemberConditions(memberConditions : MemberConditions): Observable<any> {
        let body = JSON.stringify(memberConditions);
        return this.httpClient.post(this.memberConditionsUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateMemberConditions(memberConditions : MemberConditions, seqMembId : number): Observable<any> {
        let body = JSON.stringify(memberConditions);
        return this.httpClient.put(`${this.memberConditionsUrl}/${seqMembId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateMemberConditions(memberConditions : MemberConditions, seqMembId : number): Observable<any> {
        let body = JSON.stringify(memberConditions);
        return this.httpClient.patch(`${this.memberConditionsUrl}/${seqMembId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteMemberConditions(seqMembId : number): Observable<any> {
        return this.httpClient.delete(`${this.memberConditionsUrl}/${seqMembId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}