/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { MemberContactArc } from '../api-models/member-contact-arc.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class MemberContactArcService {

    private memberContactArcUrl: string = `${environment.apiUrl}/membercontactarcs`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getMemberContactArcs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<MemberContactArc[]> {
        var url = `${this.memberContactArcUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as MemberContactArc[]),
                catchError(this.sharedService.handleError))
    }

    getMemberContactArc(seqMembId : number): Observable<MemberContactArc> {
        return this.httpClient.get(`${this.memberContactArcUrl}/${seqMembId}`, {observe: 'response'})
            .pipe(map(response => response.body as MemberContactArc),
                catchError(this.sharedService.handleError))
    }

    getMemberContactArcsCount(): Observable<number> {
        var url = `${this.memberContactArcUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createMemberContactArc(memberContactArc : MemberContactArc): Observable<any> {
        let body = JSON.stringify(memberContactArc);
        return this.httpClient.post(this.memberContactArcUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateMemberContactArc(memberContactArc : MemberContactArc, seqMembId : number): Observable<any> {
        let body = JSON.stringify(memberContactArc);
        return this.httpClient.put(`${this.memberContactArcUrl}/${seqMembId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateMemberContactArc(memberContactArc : MemberContactArc, seqMembId : number): Observable<any> {
        let body = JSON.stringify(memberContactArc);
        return this.httpClient.patch(`${this.memberContactArcUrl}/${seqMembId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteMemberContactArc(seqMembId : number): Observable<any> {
        return this.httpClient.delete(`${this.memberContactArcUrl}/${seqMembId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}