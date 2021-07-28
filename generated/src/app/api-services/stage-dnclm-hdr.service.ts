/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { StageDnclmHdr } from '../api-models/stage-dnclm-hdr.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class StageDnclmHdrService {

    private stageDnclmHdrUrl: string = `${environment.apiUrl}/stagednclmhdrs`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getStageDnclmHdrs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<StageDnclmHdr[]> {
        var url = `${this.stageDnclmHdrUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as StageDnclmHdr[]),
                catchError(this.sharedService.handleError))
    }

    getStageDnclmHdr(batchId : string): Observable<StageDnclmHdr> {
        return this.httpClient.get(`${this.stageDnclmHdrUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StageDnclmHdr),
                catchError(this.sharedService.handleError))
    }

    getStageDnclmHdrsCount(): Observable<number> {
        var url = `${this.stageDnclmHdrUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByBatchId(batchId : string): Observable<StageDnclmHdr[]> {
        return this.httpClient.get(`${this.stageDnclmHdrUrl}/find-by-batchid/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StageDnclmHdr),
                catchError(this.sharedService.handleError))
    }




    createStageDnclmHdr(stageDnclmHdr : StageDnclmHdr): Observable<any> {
        let body = JSON.stringify(stageDnclmHdr);
        return this.httpClient.post(this.stageDnclmHdrUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateStageDnclmHdr(stageDnclmHdr : StageDnclmHdr, batchId : string): Observable<any> {
        let body = JSON.stringify(stageDnclmHdr);
        return this.httpClient.put(`${this.stageDnclmHdrUrl}/${batchId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateStageDnclmHdr(stageDnclmHdr : StageDnclmHdr, batchId : string): Observable<any> {
        let body = JSON.stringify(stageDnclmHdr);
        return this.httpClient.patch(`${this.stageDnclmHdrUrl}/${batchId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteStageDnclmHdr(batchId : string): Observable<any> {
        return this.httpClient.delete(`${this.stageDnclmHdrUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}