/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { StageDnclmHdrSup } from '../api-models/stage-dnclm-hdr-sup.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class StageDnclmHdrSupService {

    private stageDnclmHdrSupUrl: string = `${environment.apiUrl}/stagednclmhdrsups`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getStageDnclmHdrSups(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<StageDnclmHdrSup[]> {
        var url = `${this.stageDnclmHdrSupUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as StageDnclmHdrSup[]),
                catchError(this.sharedService.handleError))
    }

    getStageDnclmHdrSup(batchId : string): Observable<StageDnclmHdrSup> {
        return this.httpClient.get(`${this.stageDnclmHdrSupUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StageDnclmHdrSup),
                catchError(this.sharedService.handleError))
    }

    getStageDnclmHdrSupsCount(): Observable<number> {
        var url = `${this.stageDnclmHdrSupUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createStageDnclmHdrSup(stageDnclmHdrSup : StageDnclmHdrSup): Observable<any> {
        let body = JSON.stringify(stageDnclmHdrSup);
        return this.httpClient.post(this.stageDnclmHdrSupUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateStageDnclmHdrSup(stageDnclmHdrSup : StageDnclmHdrSup, batchId : string): Observable<any> {
        let body = JSON.stringify(stageDnclmHdrSup);
        return this.httpClient.put(`${this.stageDnclmHdrSupUrl}/${batchId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateStageDnclmHdrSup(stageDnclmHdrSup : StageDnclmHdrSup, batchId : string): Observable<any> {
        let body = JSON.stringify(stageDnclmHdrSup);
        return this.httpClient.patch(`${this.stageDnclmHdrSupUrl}/${batchId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteStageDnclmHdrSup(batchId : string): Observable<any> {
        return this.httpClient.delete(`${this.stageDnclmHdrSupUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}