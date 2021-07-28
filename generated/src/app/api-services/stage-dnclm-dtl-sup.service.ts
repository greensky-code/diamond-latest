/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { StageDnclmDtlSup } from '../api-models/stage-dnclm-dtl-sup.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class StageDnclmDtlSupService {

    private stageDnclmDtlSupUrl: string = `${environment.apiUrl}/stagednclmdtlsups`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getStageDnclmDtlSups(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<StageDnclmDtlSup[]> {
        var url = `${this.stageDnclmDtlSupUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as StageDnclmDtlSup[]),
                catchError(this.sharedService.handleError))
    }

    getStageDnclmDtlSup(batchId : string): Observable<StageDnclmDtlSup> {
        return this.httpClient.get(`${this.stageDnclmDtlSupUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StageDnclmDtlSup),
                catchError(this.sharedService.handleError))
    }

    getStageDnclmDtlSupsCount(): Observable<number> {
        var url = `${this.stageDnclmDtlSupUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createStageDnclmDtlSup(stageDnclmDtlSup : StageDnclmDtlSup): Observable<any> {
        let body = JSON.stringify(stageDnclmDtlSup);
        return this.httpClient.post(this.stageDnclmDtlSupUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateStageDnclmDtlSup(stageDnclmDtlSup : StageDnclmDtlSup, batchId : string): Observable<any> {
        let body = JSON.stringify(stageDnclmDtlSup);
        return this.httpClient.put(`${this.stageDnclmDtlSupUrl}/${batchId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateStageDnclmDtlSup(stageDnclmDtlSup : StageDnclmDtlSup, batchId : string): Observable<any> {
        let body = JSON.stringify(stageDnclmDtlSup);
        return this.httpClient.patch(`${this.stageDnclmDtlSupUrl}/${batchId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteStageDnclmDtlSup(batchId : string): Observable<any> {
        return this.httpClient.delete(`${this.stageDnclmDtlSupUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}