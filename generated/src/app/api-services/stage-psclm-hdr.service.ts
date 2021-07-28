/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { StagePsclmHdr } from '../api-models/stage-psclm-hdr.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class StagePsclmHdrService {

    private stagePsclmHdrUrl: string = `${environment.apiUrl}/stagepsclmhdrs`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getStagePsclmHdrs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<StagePsclmHdr[]> {
        var url = `${this.stagePsclmHdrUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as StagePsclmHdr[]),
                catchError(this.sharedService.handleError))
    }

    getStagePsclmHdr(batchId : string): Observable<StagePsclmHdr> {
        return this.httpClient.get(`${this.stagePsclmHdrUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StagePsclmHdr),
                catchError(this.sharedService.handleError))
    }

    getStagePsclmHdrsCount(): Observable<number> {
        var url = `${this.stagePsclmHdrUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByBatchId(batchId : string): Observable<StagePsclmHdr[]> {
        return this.httpClient.get(`${this.stagePsclmHdrUrl}/find-by-batchid/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StagePsclmHdr),
                catchError(this.sharedService.handleError))
    }




    createStagePsclmHdr(stagePsclmHdr : StagePsclmHdr): Observable<any> {
        let body = JSON.stringify(stagePsclmHdr);
        return this.httpClient.post(this.stagePsclmHdrUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateStagePsclmHdr(stagePsclmHdr : StagePsclmHdr, batchId : string): Observable<any> {
        let body = JSON.stringify(stagePsclmHdr);
        return this.httpClient.put(`${this.stagePsclmHdrUrl}/${batchId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateStagePsclmHdr(stagePsclmHdr : StagePsclmHdr, batchId : string): Observable<any> {
        let body = JSON.stringify(stagePsclmHdr);
        return this.httpClient.patch(`${this.stagePsclmHdrUrl}/${batchId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteStagePsclmHdr(batchId : string): Observable<any> {
        return this.httpClient.delete(`${this.stagePsclmHdrUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}