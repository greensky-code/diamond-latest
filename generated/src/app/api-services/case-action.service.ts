/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CaseAction } from '../api-models/case-action.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CaseActionService {

    private caseActionUrl: string = `${environment.apiUrl}/caseactions`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCaseActions(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CaseAction[]> {
        var url = `${this.caseActionUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CaseAction[]),
                catchError(this.sharedService.handleError))
    }

    getCaseAction(seqCaseId : number): Observable<CaseAction> {
        return this.httpClient.get(`${this.caseActionUrl}/${seqCaseId}`, {observe: 'response'})
            .pipe(map(response => response.body as CaseAction),
                catchError(this.sharedService.handleError))
    }

    getCaseActionsCount(): Observable<number> {
        var url = `${this.caseActionUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqCaseReasonId(seqCaseReasonId : number): Observable<CaseAction[]> {
        return this.httpClient.get(`${this.caseActionUrl}/find-by-seqcasereasonid/${seqCaseReasonId}`, {observe: 'response'})
            .pipe(map(response => response.body as CaseAction),
                catchError(this.sharedService.handleError))
    }
    findBySeqCaseId(seqCaseId : number): Observable<CaseAction[]> {
        return this.httpClient.get(`${this.caseActionUrl}/find-by-seqcaseid/${seqCaseId}`, {observe: 'response'})
            .pipe(map(response => response.body as CaseAction),
                catchError(this.sharedService.handleError))
    }
    findByXrefTypeCsCode(xrefTypeCsCode : string): Observable<CaseAction[]> {
        return this.httpClient.get(`${this.caseActionUrl}/find-by-xreftypecscode/${xrefTypeCsCode}`, {observe: 'response'})
            .pipe(map(response => response.body as CaseAction),
                catchError(this.sharedService.handleError))
    }
    findByStatusCsCode(statusCsCode : string): Observable<CaseAction[]> {
        return this.httpClient.get(`${this.caseActionUrl}/find-by-statuscscode/${statusCsCode}`, {observe: 'response'})
            .pipe(map(response => response.body as CaseAction),
                catchError(this.sharedService.handleError))
    }
    findBySeqCallerId(seqCallerId : number): Observable<CaseAction[]> {
        return this.httpClient.get(`${this.caseActionUrl}/find-by-seqcallerid/${seqCallerId}`, {observe: 'response'})
            .pipe(map(response => response.body as CaseAction),
                catchError(this.sharedService.handleError))
    }
    findBySeqCallerId(seqCallerId : number): Observable<CaseAction[]> {
        return this.httpClient.get(`${this.caseActionUrl}/find-by-seqcallerid/${seqCallerId}`, {observe: 'response'})
            .pipe(map(response => response.body as CaseAction),
                catchError(this.sharedService.handleError))
    }
    findByRequestor(requestor : string): Observable<CaseAction[]> {
        return this.httpClient.get(`${this.caseActionUrl}/find-by-requestor/${requestor}`, {observe: 'response'})
            .pipe(map(response => response.body as CaseAction),
                catchError(this.sharedService.handleError))
    }
    findByResponseMethodCsCode(responseMethodCsCode : string): Observable<CaseAction[]> {
        return this.httpClient.get(`${this.caseActionUrl}/find-by-responsemethodcscode/${responseMethodCsCode}`, {observe: 'response'})
            .pipe(map(response => response.body as CaseAction),
                catchError(this.sharedService.handleError))
    }
    findByAssignedRep(assignedRep : string): Observable<CaseAction[]> {
        return this.httpClient.get(`${this.caseActionUrl}/find-by-assignedrep/${assignedRep}`, {observe: 'response'})
            .pipe(map(response => response.body as CaseAction),
                catchError(this.sharedService.handleError))
    }




    createCaseAction(caseAction : CaseAction): Observable<any> {
        let body = JSON.stringify(caseAction);
        return this.httpClient.post(this.caseActionUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCaseAction(caseAction : CaseAction, seqCaseId : number): Observable<any> {
        let body = JSON.stringify(caseAction);
        return this.httpClient.put(`${this.caseActionUrl}/${seqCaseId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCaseAction(caseAction : CaseAction, seqCaseId : number): Observable<any> {
        let body = JSON.stringify(caseAction);
        return this.httpClient.patch(`${this.caseActionUrl}/${seqCaseId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCaseAction(seqCaseId : number): Observable<any> {
        return this.httpClient.delete(`${this.caseActionUrl}/${seqCaseId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}