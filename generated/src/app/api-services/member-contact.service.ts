/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { MemberContact } from '../api-models/member-contact.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class MemberContactService {

    private memberContactUrl: string = `${environment.apiUrl}/membercontacts`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getMemberContacts(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<MemberContact[]> {
        var url = `${this.memberContactUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as MemberContact[]),
                catchError(this.sharedService.handleError))
    }

    getMemberContact(seqMembId : number): Observable<MemberContact> {
        return this.httpClient.get(`${this.memberContactUrl}/${seqMembId}`, {observe: 'response'})
            .pipe(map(response => response.body as MemberContact),
                catchError(this.sharedService.handleError))
    }

    getMemberContactsCount(): Observable<number> {
        var url = `${this.memberContactUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqMembId(seqMembId : number): Observable<MemberContact[]> {
        return this.httpClient.get(`${this.memberContactUrl}/find-by-seqmembid/${seqMembId}`, {observe: 'response'})
            .pipe(map(response => response.body as MemberContact),
                catchError(this.sharedService.handleError))
    }




    createMemberContact(memberContact : MemberContact): Observable<any> {
        let body = JSON.stringify(memberContact);
        return this.httpClient.post(this.memberContactUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateMemberContact(memberContact : MemberContact, seqMembId : number): Observable<any> {
        let body = JSON.stringify(memberContact);
        return this.httpClient.put(`${this.memberContactUrl}/${seqMembId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateMemberContact(memberContact : MemberContact, seqMembId : number): Observable<any> {
        let body = JSON.stringify(memberContact);
        return this.httpClient.patch(`${this.memberContactUrl}/${seqMembId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteMemberContact(seqMembId : number): Observable<any> {
        return this.httpClient.delete(`${this.memberContactUrl}/${seqMembId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}