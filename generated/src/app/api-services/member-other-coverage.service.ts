/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { MemberOtherCoverage } from '../api-models/member-other-coverage.model'
import { environment } from '../../environments/environment'
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class MemberOtherCoverageService {

    private memberOtherCoverageUrl: string = `${environment.apiUrl}/memberothercoverages`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getMemberOtherCoverages(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<MemberOtherCoverage[]> {
        var url = `${this.memberOtherCoverageUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as MemberOtherCoverage[]),
                catchError(this.sharedService.handleError))
    }

    getMemberOtherCoverage(seqMembOthCov : number): Observable<MemberOtherCoverage> {
        return this.httpClient.get(`${this.memberOtherCoverageUrl}/${seqMembOthCov}`, {observe: 'response'})
            .pipe(map(response => response.body as MemberOtherCoverage),
                catchError(this.sharedService.handleError))
    }

    getMemberOtherCoveragesCount(): Observable<number> {
        var url = `${this.memberOtherCoverageUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByDiagnosisCode(diagnosisCode : string): Observable<MemberOtherCoverage[]> {
        return this.httpClient.get(`${this.memberOtherCoverageUrl}/find-by-diagnosiscode/${diagnosisCode}`, {observe: 'response'})
            .pipe(map(response => response.body as MemberOtherCoverage),
                catchError(this.sharedService.handleError))
    }
    findByCarrierCode(carrierCode : string): Observable<MemberOtherCoverage[]> {
        return this.httpClient.get(`${this.memberOtherCoverageUrl}/find-by-carriercode/${carrierCode}`, {observe: 'response'})
            .pipe(map(response => response.body as MemberOtherCoverage),
                catchError(this.sharedService.handleError))
    }
    findBySeqMembId(seqMembId : number): Observable<MemberOtherCoverage[]> {
        return this.httpClient.get(`${this.memberOtherCoverageUrl}/find-by-seqmembid/${seqMembId}`, {observe: 'response'})
            .pipe(map(response => response.body as MemberOtherCoverage),
                catchError(this.sharedService.handleError))
    }
    findByTermReason(termReason : string): Observable<MemberOtherCoverage[]> {
        return this.httpClient.get(`${this.memberOtherCoverageUrl}/find-by-termreason/${termReason}`, {observe: 'response'})
            .pipe(map(response => response.body as MemberOtherCoverage),
                catchError(this.sharedService.handleError))
    }




    createMemberOtherCoverage(memberOtherCoverage : MemberOtherCoverage): Observable<any> {
        let body = JSON.stringify(memberOtherCoverage);
        return this.httpClient.post(this.memberOtherCoverageUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateMemberOtherCoverage(memberOtherCoverage : MemberOtherCoverage, seqMembOthCov : number): Observable<any> {
        let body = JSON.stringify(memberOtherCoverage);
        return this.httpClient.put(`${this.memberOtherCoverageUrl}/${seqMembOthCov}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateMemberOtherCoverage(memberOtherCoverage : MemberOtherCoverage, seqMembOthCov : number): Observable<any> {
        let body = JSON.stringify(memberOtherCoverage);
        return this.httpClient.patch(`${this.memberOtherCoverageUrl}/${seqMembOthCov}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteMemberOtherCoverage(seqMembOthCov : number): Observable<any> {
        return this.httpClient.delete(`${this.memberOtherCoverageUrl}/${seqMembOthCov}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}
