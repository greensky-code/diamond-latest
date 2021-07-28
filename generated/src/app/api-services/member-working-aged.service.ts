/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { MemberWorkingAged } from '../api-models/member-working-aged.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class MemberWorkingAgedService {

    private memberWorkingAgedUrl: string = `${environment.apiUrl}/memberworkingageds`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getMemberWorkingAgeds(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<MemberWorkingAged[]> {
        var url = `${this.memberWorkingAgedUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as MemberWorkingAged[]),
                catchError(this.sharedService.handleError))
    }

    getMemberWorkingAged(seqMembId : number): Observable<MemberWorkingAged> {
        return this.httpClient.get(`${this.memberWorkingAgedUrl}/${seqMembId}`, {observe: 'response'})
            .pipe(map(response => response.body as MemberWorkingAged),
                catchError(this.sharedService.handleError))
    }

    getMemberWorkingAgedsCount(): Observable<number> {
        var url = `${this.memberWorkingAgedUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqMembId(seqMembId : number): Observable<MemberWorkingAged[]> {
        return this.httpClient.get(`${this.memberWorkingAgedUrl}/find-by-seqmembid/${seqMembId}`, {observe: 'response'})
            .pipe(map(response => response.body as MemberWorkingAged),
                catchError(this.sharedService.handleError))
    }




    createMemberWorkingAged(memberWorkingAged : MemberWorkingAged): Observable<any> {
        let body = JSON.stringify(memberWorkingAged);
        return this.httpClient.post(this.memberWorkingAgedUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateMemberWorkingAged(memberWorkingAged : MemberWorkingAged, seqMembId : number): Observable<any> {
        let body = JSON.stringify(memberWorkingAged);
        return this.httpClient.put(`${this.memberWorkingAgedUrl}/${seqMembId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateMemberWorkingAged(memberWorkingAged : MemberWorkingAged, seqMembId : number): Observable<any> {
        let body = JSON.stringify(memberWorkingAged);
        return this.httpClient.patch(`${this.memberWorkingAgedUrl}/${seqMembId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteMemberWorkingAged(seqMembId : number): Observable<any> {
        return this.httpClient.delete(`${this.memberWorkingAgedUrl}/${seqMembId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}