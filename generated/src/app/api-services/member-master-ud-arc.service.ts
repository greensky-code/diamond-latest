/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { MemberMasterUdArc } from '../api-models/member-master-ud-arc.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class MemberMasterUdArcService {

    private memberMasterUdArcUrl: string = `${environment.apiUrl}/membermasterudarcs`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getMemberMasterUdArcs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<MemberMasterUdArc[]> {
        var url = `${this.memberMasterUdArcUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as MemberMasterUdArc[]),
                catchError(this.sharedService.handleError))
    }

    getMemberMasterUdArc(seqMembId : number): Observable<MemberMasterUdArc> {
        return this.httpClient.get(`${this.memberMasterUdArcUrl}/${seqMembId}`, {observe: 'response'})
            .pipe(map(response => response.body as MemberMasterUdArc),
                catchError(this.sharedService.handleError))
    }

    getMemberMasterUdArcsCount(): Observable<number> {
        var url = `${this.memberMasterUdArcUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createMemberMasterUdArc(memberMasterUdArc : MemberMasterUdArc): Observable<any> {
        let body = JSON.stringify(memberMasterUdArc);
        return this.httpClient.post(this.memberMasterUdArcUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateMemberMasterUdArc(memberMasterUdArc : MemberMasterUdArc, seqMembId : number): Observable<any> {
        let body = JSON.stringify(memberMasterUdArc);
        return this.httpClient.put(`${this.memberMasterUdArcUrl}/${seqMembId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateMemberMasterUdArc(memberMasterUdArc : MemberMasterUdArc, seqMembId : number): Observable<any> {
        let body = JSON.stringify(memberMasterUdArc);
        return this.httpClient.patch(`${this.memberMasterUdArcUrl}/${seqMembId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteMemberMasterUdArc(seqMembId : number): Observable<any> {
        return this.httpClient.delete(`${this.memberMasterUdArcUrl}/${seqMembId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}