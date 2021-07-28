/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CheckAuditWork } from '../api-models/check-audit-work.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CheckAuditWorkService {

    private checkAuditWorkUrl: string = `${environment.apiUrl}/checkauditworks`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCheckAuditWorks(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CheckAuditWork[]> {
        var url = `${this.checkAuditWorkUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CheckAuditWork[]),
                catchError(this.sharedService.handleError))
    }

    getCheckAuditWork(seqCvsupId : number): Observable<CheckAuditWork> {
        return this.httpClient.get(`${this.checkAuditWorkUrl}/${seqCvsupId}`, {observe: 'response'})
            .pipe(map(response => response.body as CheckAuditWork),
                catchError(this.sharedService.handleError))
    }

    getCheckAuditWorksCount(): Observable<number> {
        var url = `${this.checkAuditWorkUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCheckAuditWork(checkAuditWork : CheckAuditWork): Observable<any> {
        let body = JSON.stringify(checkAuditWork);
        return this.httpClient.post(this.checkAuditWorkUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCheckAuditWork(checkAuditWork : CheckAuditWork, seqCvsupId : number): Observable<any> {
        let body = JSON.stringify(checkAuditWork);
        return this.httpClient.put(`${this.checkAuditWorkUrl}/${seqCvsupId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCheckAuditWork(checkAuditWork : CheckAuditWork, seqCvsupId : number): Observable<any> {
        let body = JSON.stringify(checkAuditWork);
        return this.httpClient.patch(`${this.checkAuditWorkUrl}/${seqCvsupId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCheckAuditWork(seqCvsupId : number): Observable<any> {
        return this.httpClient.delete(`${this.checkAuditWorkUrl}/${seqCvsupId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}