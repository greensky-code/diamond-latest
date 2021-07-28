/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { MemberMaster } from '../api-models/member-master.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class MemberMasterService {

    private memberMasterUrl: string = `${environment.apiUrl}/membermasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getMemberMasters(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<MemberMaster[]> {
        var url = `${this.memberMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as MemberMaster[]),
                catchError(this.sharedService.handleError))
    }

    getMemberMaster(seqMembId : number): Observable<MemberMaster> {
        return this.httpClient.get(`${this.memberMasterUrl}/${seqMembId}`, {observe: 'response'})
            .pipe(map(response => response.body as MemberMaster),
                catchError(this.sharedService.handleError))
    }

    getMemberMastersCount(): Observable<number> {
        var url = `${this.memberMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByContactTitle(contactTitle : string): Observable<MemberMaster[]> {
        return this.httpClient.get(`${this.memberMasterUrl}/find-by-contacttitle/${contactTitle}`, {observe: 'response'})
            .pipe(map(response => response.body as MemberMaster),
                catchError(this.sharedService.handleError))
    }
    findByHoldReason(holdReason : string): Observable<MemberMaster[]> {
        return this.httpClient.get(`${this.memberMasterUrl}/find-by-holdreason/${holdReason}`, {observe: 'response'})
            .pipe(map(response => response.body as MemberMaster),
                catchError(this.sharedService.handleError))
    }
    findByLanguageCode(languageCode : string): Observable<MemberMaster[]> {
        return this.httpClient.get(`${this.memberMasterUrl}/find-by-languagecode/${languageCode}`, {observe: 'response'})
            .pipe(map(response => response.body as MemberMaster),
                catchError(this.sharedService.handleError))
    }
    findBySeqSubsId(seqSubsId : number): Observable<MemberMaster[]> {
        return this.httpClient.get(`${this.memberMasterUrl}/find-by-seqsubsid/${seqSubsId}`, {observe: 'response'})
            .pipe(map(response => response.body as MemberMaster),
                catchError(this.sharedService.handleError))
    }
    findBySeqAltMembId(seqAltMembId : number): Observable<MemberMaster[]> {
        return this.httpClient.get(`${this.memberMasterUrl}/find-by-seqaltmembid/${seqAltMembId}`, {observe: 'response'})
            .pipe(map(response => response.body as MemberMaster),
                catchError(this.sharedService.handleError))
    }




    createMemberMaster(memberMaster : MemberMaster): Observable<any> {
        let body = JSON.stringify(memberMaster);
        return this.httpClient.post(this.memberMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateMemberMaster(memberMaster : MemberMaster, seqMembId : number): Observable<any> {
        let body = JSON.stringify(memberMaster);
        return this.httpClient.put(`${this.memberMasterUrl}/${seqMembId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateMemberMaster(memberMaster : MemberMaster, seqMembId : number): Observable<any> {
        let body = JSON.stringify(memberMaster);
        return this.httpClient.patch(`${this.memberMasterUrl}/${seqMembId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteMemberMaster(seqMembId : number): Observable<any> {
        return this.httpClient.delete(`${this.memberMasterUrl}/${seqMembId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}