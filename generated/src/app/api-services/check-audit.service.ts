/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CheckAudit } from '../api-models/check-audit.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CheckAuditService {

    private checkAuditUrl: string = `${environment.apiUrl}/checkaudits`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCheckAudits(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CheckAudit[]> {
        var url = `${this.checkAuditUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CheckAudit[]),
                catchError(this.sharedService.handleError))
    }

    getCheckAudit(bankAccountCode : string): Observable<CheckAudit> {
        return this.httpClient.get(`${this.checkAuditUrl}/${bankAccountCode}`, {observe: 'response'})
            .pipe(map(response => response.body as CheckAudit),
                catchError(this.sharedService.handleError))
    }

    getCheckAuditsCount(): Observable<number> {
        var url = `${this.checkAuditUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCheckAudit(checkAudit : CheckAudit): Observable<any> {
        let body = JSON.stringify(checkAudit);
        return this.httpClient.post(this.checkAuditUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCheckAudit(checkAudit : CheckAudit, bankAccountCode : string): Observable<any> {
        let body = JSON.stringify(checkAudit);
        return this.httpClient.put(`${this.checkAuditUrl}/${bankAccountCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCheckAudit(checkAudit : CheckAudit, bankAccountCode : string): Observable<any> {
        let body = JSON.stringify(checkAudit);
        return this.httpClient.patch(`${this.checkAuditUrl}/${bankAccountCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCheckAudit(bankAccountCode : string): Observable<any> {
        return this.httpClient.delete(`${this.checkAuditUrl}/${bankAccountCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}