/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { MemberMasterUd } from '../api-models/member-master-ud.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class MemberMasterUdService {

    private memberMasterUdUrl: string = `${environment.apiUrl}/membermasteruds`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getMemberMasterUds(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<MemberMasterUd[]> {
        var url = `${this.memberMasterUdUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as MemberMasterUd[]),
                catchError(this.sharedService.handleError))
    }

    getMemberMasterUd(seqMembId : number): Observable<MemberMasterUd> {
        return this.httpClient.get(`${this.memberMasterUdUrl}/${seqMembId}`, {observe: 'response'})
            .pipe(map(response => response.body as MemberMasterUd),
                catchError(this.sharedService.handleError))
    }

    getMemberMasterUdsCount(): Observable<number> {
        var url = `${this.memberMasterUdUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createMemberMasterUd(memberMasterUd : MemberMasterUd): Observable<any> {
        let body = JSON.stringify(memberMasterUd);
        return this.httpClient.post(this.memberMasterUdUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateMemberMasterUd(memberMasterUd : MemberMasterUd, seqMembId : number): Observable<any> {
        let body = JSON.stringify(memberMasterUd);
        return this.httpClient.put(`${this.memberMasterUdUrl}/${seqMembId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateMemberMasterUd(memberMasterUd : MemberMasterUd, seqMembId : number): Observable<any> {
        let body = JSON.stringify(memberMasterUd);
        return this.httpClient.patch(`${this.memberMasterUdUrl}/${seqMembId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteMemberMasterUd(seqMembId : number): Observable<any> {
        return this.httpClient.delete(`${this.memberMasterUdUrl}/${seqMembId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}