/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { MemberMasterEdi } from '../api-models/member-master-edi.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class MemberMasterEdiService {

    private memberMasterEdiUrl: string = `${environment.apiUrl}/membermasteredis`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getMemberMasterEdis(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<MemberMasterEdi[]> {
        var url = `${this.memberMasterEdiUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as MemberMasterEdi[]),
                catchError(this.sharedService.handleError))
    }

    getMemberMasterEdi(transactionSetId : string): Observable<MemberMasterEdi> {
        return this.httpClient.get(`${this.memberMasterEdiUrl}/${transactionSetId}`, {observe: 'response'})
            .pipe(map(response => response.body as MemberMasterEdi),
                catchError(this.sharedService.handleError))
    }

    getMemberMasterEdisCount(): Observable<number> {
        var url = `${this.memberMasterEdiUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createMemberMasterEdi(memberMasterEdi : MemberMasterEdi): Observable<any> {
        let body = JSON.stringify(memberMasterEdi);
        return this.httpClient.post(this.memberMasterEdiUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateMemberMasterEdi(memberMasterEdi : MemberMasterEdi, transactionSetId : string): Observable<any> {
        let body = JSON.stringify(memberMasterEdi);
        return this.httpClient.put(`${this.memberMasterEdiUrl}/${transactionSetId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateMemberMasterEdi(memberMasterEdi : MemberMasterEdi, transactionSetId : string): Observable<any> {
        let body = JSON.stringify(memberMasterEdi);
        return this.httpClient.patch(`${this.memberMasterEdiUrl}/${transactionSetId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteMemberMasterEdi(transactionSetId : string): Observable<any> {
        return this.httpClient.delete(`${this.memberMasterEdiUrl}/${transactionSetId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}