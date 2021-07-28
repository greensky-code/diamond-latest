/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { MemberAddress } from '../api-models/member-address.model';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class MemberAddressService {

    private memberAddressUrl: string = `${environment.apiUrl}/memberaddresses`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient: HttpClient, private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getMemberAddresses(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<MemberAddress[]> {
        var url = `${this.memberAddressUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as MemberAddress[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getMemberAddress(seqMembId: number): Observable<MemberAddress[]> {
        return this.httpClient.get(`${this.memberAddressUrl}/${seqMembId}`, { observe: 'response' })
            .pipe(map(response => response.body as MemberAddress[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getMemberAddressesCount(): Observable<number> {
        var url = `${this.memberAddressUrl}/count`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findBySeqMembId(seqMembId: number): Observable<MemberAddress[]> {
        return this.httpClient.get(`${this.memberAddressUrl}/find-by-seqmembid/${seqMembId}`, { observe: 'response' })
            .pipe(map(response => response.body as MemberAddress[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }


    createMemberAddress(memberAddress: MemberAddress): Observable<any> {
        let body = JSON.stringify(memberAddress);
        return this.httpClient.post(this.memberAddressUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateMemberAddress(memberAddress: MemberAddress, seqMembId: number, addressType: string): Observable<any> {
        let body = JSON.stringify(memberAddress);
        return this.httpClient.put(`${this.memberAddressUrl}/${addressType}/${seqMembId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateMemberAddress(memberAddress: MemberAddress, seqMembId: number): Observable<any> {
        let body = JSON.stringify(memberAddress);
        return this.httpClient.patch(`${this.memberAddressUrl}/${seqMembId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteMemberAddress(seqMembId: number): Observable<any> {
        return this.httpClient.delete(`${this.memberAddressUrl}/${seqMembId}`, { observe: 'response' })
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
