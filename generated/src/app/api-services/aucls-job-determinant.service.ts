/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AuclsJobDeterminant } from '../api-models/aucls-job-determinant.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuclsJobDeterminantService {

    private auclsJobDeterminantUrl: string = `${environment.apiUrl}/auclsjobdeterminants`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAuclsJobDeterminants(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AuclsJobDeterminant[]> {
        var url = `${this.auclsJobDeterminantUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AuclsJobDeterminant[]),
                catchError(this.sharedService.handleError))
    }

    getAuclsJobDeterminant(seqAuclsJobId : string): Observable<AuclsJobDeterminant> {
        return this.httpClient.get(`${this.auclsJobDeterminantUrl}/${seqAuclsJobId}`, {observe: 'response'})
            .pipe(map(response => response.body as AuclsJobDeterminant),
                catchError(this.sharedService.handleError))
    }

    getAuclsJobDeterminantsCount(): Observable<number> {
        var url = `${this.auclsJobDeterminantUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqAuclsJobId(seqAuclsJobId : string): Observable<AuclsJobDeterminant[]> {
        return this.httpClient.get(`${this.auclsJobDeterminantUrl}/find-by-seqauclsjobid/${seqAuclsJobId}`, {observe: 'response'})
            .pipe(map(response => response.body as AuclsJobDeterminant),
                catchError(this.sharedService.handleError))
    }




    createAuclsJobDeterminant(auclsJobDeterminant : AuclsJobDeterminant): Observable<any> {
        let body = JSON.stringify(auclsJobDeterminant);
        return this.httpClient.post(this.auclsJobDeterminantUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateAuclsJobDeterminant(auclsJobDeterminant : AuclsJobDeterminant, seqAuclsJobId : string): Observable<any> {
        let body = JSON.stringify(auclsJobDeterminant);
        return this.httpClient.put(`${this.auclsJobDeterminantUrl}/${seqAuclsJobId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateAuclsJobDeterminant(auclsJobDeterminant : AuclsJobDeterminant, seqAuclsJobId : string): Observable<any> {
        let body = JSON.stringify(auclsJobDeterminant);
        return this.httpClient.patch(`${this.auclsJobDeterminantUrl}/${seqAuclsJobId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteAuclsJobDeterminant(seqAuclsJobId : string): Observable<any> {
        return this.httpClient.delete(`${this.auclsJobDeterminantUrl}/${seqAuclsJobId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}