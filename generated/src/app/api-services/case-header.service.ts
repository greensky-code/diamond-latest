/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CaseHeader } from '../api-models/case-header.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CaseHeaderService {

    private caseHeaderUrl: string = `${environment.apiUrl}/caseheaders`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCaseHeaders(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CaseHeader[]> {
        var url = `${this.caseHeaderUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CaseHeader[]),
                catchError(this.sharedService.handleError))
    }

    getCaseHeader(seqCaseId : number): Observable<CaseHeader> {
        return this.httpClient.get(`${this.caseHeaderUrl}/${seqCaseId}`, {observe: 'response'})
            .pipe(map(response => response.body as CaseHeader),
                catchError(this.sharedService.handleError))
    }

    getCaseHeadersCount(): Observable<number> {
        var url = `${this.caseHeaderUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByStatusCsCode(statusCsCode : string): Observable<CaseHeader[]> {
        return this.httpClient.get(`${this.caseHeaderUrl}/find-by-statuscscode/${statusCsCode}`, {observe: 'response'})
            .pipe(map(response => response.body as CaseHeader),
                catchError(this.sharedService.handleError))
    }
    findByAssignedRep(assignedRep : string): Observable<CaseHeader[]> {
        return this.httpClient.get(`${this.caseHeaderUrl}/find-by-assignedrep/${assignedRep}`, {observe: 'response'})
            .pipe(map(response => response.body as CaseHeader),
                catchError(this.sharedService.handleError))
    }
    findByPhone2DesignCsCode(phone2DesignCsCode : string): Observable<CaseHeader[]> {
        return this.httpClient.get(`${this.caseHeaderUrl}/find-by-phone2designcscode/${phone2DesignCsCode}`, {observe: 'response'})
            .pipe(map(response => response.body as CaseHeader),
                catchError(this.sharedService.handleError))
    }
    findByPhone1DesignCsCode(phone1DesignCsCode : string): Observable<CaseHeader[]> {
        return this.httpClient.get(`${this.caseHeaderUrl}/find-by-phone1designcscode/${phone1DesignCsCode}`, {observe: 'response'})
            .pipe(map(response => response.body as CaseHeader),
                catchError(this.sharedService.handleError))
    }
    findByCustomerTypeCsCode(customerTypeCsCode : string): Observable<CaseHeader[]> {
        return this.httpClient.get(`${this.caseHeaderUrl}/find-by-customertypecscode/${customerTypeCsCode}`, {observe: 'response'})
            .pipe(map(response => response.body as CaseHeader),
                catchError(this.sharedService.handleError))
    }




    createCaseHeader(caseHeader : CaseHeader): Observable<any> {
        let body = JSON.stringify(caseHeader);
        return this.httpClient.post(this.caseHeaderUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCaseHeader(caseHeader : CaseHeader, seqCaseId : number): Observable<any> {
        let body = JSON.stringify(caseHeader);
        return this.httpClient.put(`${this.caseHeaderUrl}/${seqCaseId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCaseHeader(caseHeader : CaseHeader, seqCaseId : number): Observable<any> {
        let body = JSON.stringify(caseHeader);
        return this.httpClient.patch(`${this.caseHeaderUrl}/${seqCaseId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCaseHeader(seqCaseId : number): Observable<any> {
        return this.httpClient.delete(`${this.caseHeaderUrl}/${seqCaseId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}