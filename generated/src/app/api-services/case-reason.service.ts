/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CaseReason } from '../api-models/case-reason.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CaseReasonService {

    private caseReasonUrl: string = `${environment.apiUrl}/casereasons`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCaseReasons(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CaseReason[]> {
        var url = `${this.caseReasonUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CaseReason[]),
                catchError(this.sharedService.handleError))
    }

    getCaseReason(seqCaseReasonId : number): Observable<CaseReason> {
        return this.httpClient.get(`${this.caseReasonUrl}/${seqCaseReasonId}`, {observe: 'response'})
            .pipe(map(response => response.body as CaseReason),
                catchError(this.sharedService.handleError))
    }

    getCaseReasonsCount(): Observable<number> {
        var url = `${this.caseReasonUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByContactToneCsCode(contactToneCsCode : string): Observable<CaseReason[]> {
        return this.httpClient.get(`${this.caseReasonUrl}/find-by-contacttonecscode/${contactToneCsCode}`, {observe: 'response'})
            .pipe(map(response => response.body as CaseReason),
                catchError(this.sharedService.handleError))
    }
    findBySeqCaseId(seqCaseId : number): Observable<CaseReason[]> {
        return this.httpClient.get(`${this.caseReasonUrl}/find-by-seqcaseid/${seqCaseId}`, {observe: 'response'})
            .pipe(map(response => response.body as CaseReason),
                catchError(this.sharedService.handleError))
    }
    findBySeqCallerId(seqCallerId : number): Observable<CaseReason[]> {
        return this.httpClient.get(`${this.caseReasonUrl}/find-by-seqcallerid/${seqCallerId}`, {observe: 'response'})
            .pipe(map(response => response.body as CaseReason),
                catchError(this.sharedService.handleError))
    }
    findByReasonCat1CsCode(reasonCat1CsCode : string): Observable<CaseReason[]> {
        return this.httpClient.get(`${this.caseReasonUrl}/find-by-reasoncat1cscode/${reasonCat1CsCode}`, {observe: 'response'})
            .pipe(map(response => response.body as CaseReason),
                catchError(this.sharedService.handleError))
    }
    findByReasonCsCode(reasonCsCode : string): Observable<CaseReason[]> {
        return this.httpClient.get(`${this.caseReasonUrl}/find-by-reasoncscode/${reasonCsCode}`, {observe: 'response'})
            .pipe(map(response => response.body as CaseReason),
                catchError(this.sharedService.handleError))
    }
    findByReasonCat2CsCode(reasonCat2CsCode : string): Observable<CaseReason[]> {
        return this.httpClient.get(`${this.caseReasonUrl}/find-by-reasoncat2cscode/${reasonCat2CsCode}`, {observe: 'response'})
            .pipe(map(response => response.body as CaseReason),
                catchError(this.sharedService.handleError))
    }




    createCaseReason(caseReason : CaseReason): Observable<any> {
        let body = JSON.stringify(caseReason);
        return this.httpClient.post(this.caseReasonUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCaseReason(caseReason : CaseReason, seqCaseReasonId : number): Observable<any> {
        let body = JSON.stringify(caseReason);
        return this.httpClient.put(`${this.caseReasonUrl}/${seqCaseReasonId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCaseReason(caseReason : CaseReason, seqCaseReasonId : number): Observable<any> {
        let body = JSON.stringify(caseReason);
        return this.httpClient.patch(`${this.caseReasonUrl}/${seqCaseReasonId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCaseReason(seqCaseReasonId : number): Observable<any> {
        return this.httpClient.delete(`${this.caseReasonUrl}/${seqCaseReasonId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}