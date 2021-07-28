/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AuditPurgeJob } from '../api-models/audit-purge-job.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuditPurgeJobService {

    private auditPurgeJobUrl: string = `${environment.apiUrl}/auditpurgejobs`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAuditPurgeJobs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AuditPurgeJob[]> {
        var url = `${this.auditPurgeJobUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AuditPurgeJob[]),
                catchError(this.sharedService.handleError))
    }

    getAuditPurgeJob(seqAudpuId : number): Observable<AuditPurgeJob> {
        return this.httpClient.get(`${this.auditPurgeJobUrl}/${seqAudpuId}`, {observe: 'response'})
            .pipe(map(response => response.body as AuditPurgeJob),
                catchError(this.sharedService.handleError))
    }

    getAuditPurgeJobsCount(): Observable<number> {
        var url = `${this.auditPurgeJobUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createAuditPurgeJob(auditPurgeJob : AuditPurgeJob): Observable<any> {
        let body = JSON.stringify(auditPurgeJob);
        return this.httpClient.post(this.auditPurgeJobUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateAuditPurgeJob(auditPurgeJob : AuditPurgeJob, seqAudpuId : number): Observable<any> {
        let body = JSON.stringify(auditPurgeJob);
        return this.httpClient.put(`${this.auditPurgeJobUrl}/${seqAudpuId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateAuditPurgeJob(auditPurgeJob : AuditPurgeJob, seqAudpuId : number): Observable<any> {
        let body = JSON.stringify(auditPurgeJob);
        return this.httpClient.patch(`${this.auditPurgeJobUrl}/${seqAudpuId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteAuditPurgeJob(seqAudpuId : number): Observable<any> {
        return this.httpClient.delete(`${this.auditPurgeJobUrl}/${seqAudpuId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}