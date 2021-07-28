/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AuclsJobCriteria } from '../api-models/aucls-job-criteria.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuclsJobCriteriaService {

    private auclsJobCriteriaUrl: string = `${environment.apiUrl}/auclsjobcriterias`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAuclsJobCriterias(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AuclsJobCriteria[]> {
        var url = `${this.auclsJobCriteriaUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AuclsJobCriteria[]),
                catchError(this.sharedService.handleError))
    }

    getAuclsJobCriteria(seqAuclsJobId : string): Observable<AuclsJobCriteria> {
        return this.httpClient.get(`${this.auclsJobCriteriaUrl}/${seqAuclsJobId}`, {observe: 'response'})
            .pipe(map(response => response.body as AuclsJobCriteria),
                catchError(this.sharedService.handleError))
    }

    getAuclsJobCriteriasCount(): Observable<number> {
        var url = `${this.auclsJobCriteriaUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqAuclsJobId(seqAuclsJobId : string): Observable<AuclsJobCriteria[]> {
        return this.httpClient.get(`${this.auclsJobCriteriaUrl}/find-by-seqauclsjobid/${seqAuclsJobId}`, {observe: 'response'})
            .pipe(map(response => response.body as AuclsJobCriteria),
                catchError(this.sharedService.handleError))
    }




    createAuclsJobCriteria(auclsJobCriteria : AuclsJobCriteria): Observable<any> {
        let body = JSON.stringify(auclsJobCriteria);
        return this.httpClient.post(this.auclsJobCriteriaUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateAuclsJobCriteria(auclsJobCriteria : AuclsJobCriteria, seqAuclsJobId : string): Observable<any> {
        let body = JSON.stringify(auclsJobCriteria);
        return this.httpClient.put(`${this.auclsJobCriteriaUrl}/${seqAuclsJobId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateAuclsJobCriteria(auclsJobCriteria : AuclsJobCriteria, seqAuclsJobId : string): Observable<any> {
        let body = JSON.stringify(auclsJobCriteria);
        return this.httpClient.patch(`${this.auclsJobCriteriaUrl}/${seqAuclsJobId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteAuclsJobCriteria(seqAuclsJobId : string): Observable<any> {
        return this.httpClient.delete(`${this.auclsJobCriteriaUrl}/${seqAuclsJobId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}