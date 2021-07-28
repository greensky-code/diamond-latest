/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CaseCaller } from '../api-models/case-caller.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CaseCallerService {

    private caseCallerUrl: string = `${environment.apiUrl}/casecallers`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCaseCallers(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CaseCaller[]> {
        var url = `${this.caseCallerUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CaseCaller[]),
                catchError(this.sharedService.handleError))
    }

    getCaseCaller(seqCallerId : number): Observable<CaseCaller> {
        return this.httpClient.get(`${this.caseCallerUrl}/${seqCallerId}`, {observe: 'response'})
            .pipe(map(response => response.body as CaseCaller),
                catchError(this.sharedService.handleError))
    }

    getCaseCallersCount(): Observable<number> {
        var url = `${this.caseCallerUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqCaseId(seqCaseId : number): Observable<CaseCaller[]> {
        return this.httpClient.get(`${this.caseCallerUrl}/find-by-seqcaseid/${seqCaseId}`, {observe: 'response'})
            .pipe(map(response => response.body as CaseCaller),
                catchError(this.sharedService.handleError))
    }
    findByPhone2DesignCsCode(phone2DesignCsCode : string): Observable<CaseCaller[]> {
        return this.httpClient.get(`${this.caseCallerUrl}/find-by-phone2designcscode/${phone2DesignCsCode}`, {observe: 'response'})
            .pipe(map(response => response.body as CaseCaller),
                catchError(this.sharedService.handleError))
    }
    findByPhone1DesignCsCode(phone1DesignCsCode : string): Observable<CaseCaller[]> {
        return this.httpClient.get(`${this.caseCallerUrl}/find-by-phone1designcscode/${phone1DesignCsCode}`, {observe: 'response'})
            .pipe(map(response => response.body as CaseCaller),
                catchError(this.sharedService.handleError))
    }
    findByContactMethodCsCode(contactMethodCsCode : string): Observable<CaseCaller[]> {
        return this.httpClient.get(`${this.caseCallerUrl}/find-by-contactmethodcscode/${contactMethodCsCode}`, {observe: 'response'})
            .pipe(map(response => response.body as CaseCaller),
                catchError(this.sharedService.handleError))
    }
    findByCallerTypeCsCode(callerTypeCsCode : string): Observable<CaseCaller[]> {
        return this.httpClient.get(`${this.caseCallerUrl}/find-by-callertypecscode/${callerTypeCsCode}`, {observe: 'response'})
            .pipe(map(response => response.body as CaseCaller),
                catchError(this.sharedService.handleError))
    }
    findByRelationCsCode(relationCsCode : string): Observable<CaseCaller[]> {
        return this.httpClient.get(`${this.caseCallerUrl}/find-by-relationcscode/${relationCsCode}`, {observe: 'response'})
            .pipe(map(response => response.body as CaseCaller),
                catchError(this.sharedService.handleError))
    }




    createCaseCaller(caseCaller : CaseCaller): Observable<any> {
        let body = JSON.stringify(caseCaller);
        return this.httpClient.post(this.caseCallerUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCaseCaller(caseCaller : CaseCaller, seqCallerId : number): Observable<any> {
        let body = JSON.stringify(caseCaller);
        return this.httpClient.put(`${this.caseCallerUrl}/${seqCallerId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCaseCaller(caseCaller : CaseCaller, seqCallerId : number): Observable<any> {
        let body = JSON.stringify(caseCaller);
        return this.httpClient.patch(`${this.caseCallerUrl}/${seqCallerId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCaseCaller(seqCallerId : number): Observable<any> {
        return this.httpClient.delete(`${this.caseCallerUrl}/${seqCallerId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}