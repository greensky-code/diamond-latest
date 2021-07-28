/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { StagePsclmDtl } from '../api-models/stage-psclm-dtl.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class StagePsclmDtlService {

    private stagePsclmDtlUrl: string = `${environment.apiUrl}/stagepsclmdtls`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getStagePsclmDtls(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<StagePsclmDtl[]> {
        var url = `${this.stagePsclmDtlUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as StagePsclmDtl[]),
                catchError(this.sharedService.handleError))
    }

    getStagePsclmDtl(batchId : string): Observable<StagePsclmDtl> {
        return this.httpClient.get(`${this.stagePsclmDtlUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StagePsclmDtl),
                catchError(this.sharedService.handleError))
    }

    getStagePsclmDtlsCount(): Observable<number> {
        var url = `${this.stagePsclmDtlUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createStagePsclmDtl(stagePsclmDtl : StagePsclmDtl): Observable<any> {
        let body = JSON.stringify(stagePsclmDtl);
        return this.httpClient.post(this.stagePsclmDtlUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateStagePsclmDtl(stagePsclmDtl : StagePsclmDtl, batchId : string): Observable<any> {
        let body = JSON.stringify(stagePsclmDtl);
        return this.httpClient.put(`${this.stagePsclmDtlUrl}/${batchId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateStagePsclmDtl(stagePsclmDtl : StagePsclmDtl, batchId : string): Observable<any> {
        let body = JSON.stringify(stagePsclmDtl);
        return this.httpClient.patch(`${this.stagePsclmDtlUrl}/${batchId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteStagePsclmDtl(batchId : string): Observable<any> {
        return this.httpClient.delete(`${this.stagePsclmDtlUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}