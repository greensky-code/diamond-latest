/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { StagePsclmDtlSup } from '../api-models/stage-psclm-dtl-sup.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class StagePsclmDtlSupService {

    private stagePsclmDtlSupUrl: string = `${environment.apiUrl}/stagepsclmdtlsups`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getStagePsclmDtlSups(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<StagePsclmDtlSup[]> {
        var url = `${this.stagePsclmDtlSupUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as StagePsclmDtlSup[]),
                catchError(this.sharedService.handleError))
    }

    getStagePsclmDtlSup(batchId : string): Observable<StagePsclmDtlSup> {
        return this.httpClient.get(`${this.stagePsclmDtlSupUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StagePsclmDtlSup),
                catchError(this.sharedService.handleError))
    }

    getStagePsclmDtlSupsCount(): Observable<number> {
        var url = `${this.stagePsclmDtlSupUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createStagePsclmDtlSup(stagePsclmDtlSup : StagePsclmDtlSup): Observable<any> {
        let body = JSON.stringify(stagePsclmDtlSup);
        return this.httpClient.post(this.stagePsclmDtlSupUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateStagePsclmDtlSup(stagePsclmDtlSup : StagePsclmDtlSup, batchId : string): Observable<any> {
        let body = JSON.stringify(stagePsclmDtlSup);
        return this.httpClient.put(`${this.stagePsclmDtlSupUrl}/${batchId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateStagePsclmDtlSup(stagePsclmDtlSup : StagePsclmDtlSup, batchId : string): Observable<any> {
        let body = JSON.stringify(stagePsclmDtlSup);
        return this.httpClient.patch(`${this.stagePsclmDtlSupUrl}/${batchId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteStagePsclmDtlSup(batchId : string): Observable<any> {
        return this.httpClient.delete(`${this.stagePsclmDtlSupUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}