/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { MemberContact } from '../api-models/member-contact.model';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
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
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getMemberContact(seqMembId : number): Observable<MemberContact> {
        return this.httpClient.get(`${this.memberContactUrl}/${seqMembId}`, {observe: 'response'})
            .pipe(map(response => response.body as MemberContact),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getMemberContactsCount(): Observable<number> {
        var url = `${this.memberContactUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findBySeqMembId(seqMembId : number): Observable<MemberContact[]> {
        return this.httpClient.get(`${this.memberContactUrl}/find-by-seqmembid/${seqMembId}`, {observe: 'response'})
            .pipe(map(response => response.body as MemberContact),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    createMemberContact(memberContact : MemberContact): Observable<any> {
        let body = JSON.stringify(memberContact);
        return this.httpClient.post(this.memberContactUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateMemberContact(memberContact : MemberContact, seqMembId : number): Observable<any> {
        let body = JSON.stringify(memberContact);
        return this.httpClient.put(`${this.memberContactUrl}/${seqMembId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateMemberContact(memberContact : MemberContact, seqMembId : number): Observable<any> {
        let body = JSON.stringify(memberContact);
        return this.httpClient.patch(`${this.memberContactUrl}/${seqMembId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteMemberContact(seqMembId : number): Observable<any> {
        return this.httpClient.delete(`${this.memberContactUrl}/${seqMembId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    addUpdateContact(groupContactPerson: MemberContact[]): Observable<any> {
        let body = JSON.stringify(groupContactPerson);
        const url = `${this.memberContactUrl}/updateMemberContactRecords`
        return this.httpClient.post(url, body, {headers: this.contentHeaders})
        .pipe(map(response => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
