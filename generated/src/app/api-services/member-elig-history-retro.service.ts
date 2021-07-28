/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { MemberEligHistoryRetro } from '../api-models/member-elig-history-retro.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class MemberEligHistoryRetroService {

    private memberEligHistoryRetroUrl: string = `${environment.apiUrl}/memberelighistoryretroes`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getMemberEligHistoryRetroes(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<MemberEligHistoryRetro[]> {
        var url = `${this.memberEligHistoryRetroUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as MemberEligHistoryRetro[]),
                catchError(this.sharedService.handleError))
    }

    getMemberEligHistoryRetro(seqEligHistRetro : number): Observable<MemberEligHistoryRetro> {
        return this.httpClient.get(`${this.memberEligHistoryRetroUrl}/${seqEligHistRetro}`, {observe: 'response'})
            .pipe(map(response => response.body as MemberEligHistoryRetro),
                catchError(this.sharedService.handleError))
    }

    getMemberEligHistoryRetroesCount(): Observable<number> {
        var url = `${this.memberEligHistoryRetroUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createMemberEligHistoryRetro(memberEligHistoryRetro : MemberEligHistoryRetro): Observable<any> {
        let body = JSON.stringify(memberEligHistoryRetro);
        return this.httpClient.post(this.memberEligHistoryRetroUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateMemberEligHistoryRetro(memberEligHistoryRetro : MemberEligHistoryRetro, seqEligHistRetro : number): Observable<any> {
        let body = JSON.stringify(memberEligHistoryRetro);
        return this.httpClient.put(`${this.memberEligHistoryRetroUrl}/${seqEligHistRetro}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateMemberEligHistoryRetro(memberEligHistoryRetro : MemberEligHistoryRetro, seqEligHistRetro : number): Observable<any> {
        let body = JSON.stringify(memberEligHistoryRetro);
        return this.httpClient.patch(`${this.memberEligHistoryRetroUrl}/${seqEligHistRetro}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteMemberEligHistoryRetro(seqEligHistRetro : number): Observable<any> {
        return this.httpClient.delete(`${this.memberEligHistoryRetroUrl}/${seqEligHistRetro}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}