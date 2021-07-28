/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { StagePsclmDtlMeas } from '../api-models/stage-psclm-dtl-meas.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class StagePsclmDtlMeasService {

    private stagePsclmDtlMeasUrl: string = `${environment.apiUrl}/stagepsclmdtlmeass`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getStagePsclmDtlMeass(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<StagePsclmDtlMeas[]> {
        var url = `${this.stagePsclmDtlMeasUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as StagePsclmDtlMeas[]),
                catchError(this.sharedService.handleError))
    }

    getStagePsclmDtlMeas(batchId : string): Observable<StagePsclmDtlMeas> {
        return this.httpClient.get(`${this.stagePsclmDtlMeasUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StagePsclmDtlMeas),
                catchError(this.sharedService.handleError))
    }

    getStagePsclmDtlMeassCount(): Observable<number> {
        var url = `${this.stagePsclmDtlMeasUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createStagePsclmDtlMeas(stagePsclmDtlMeas : StagePsclmDtlMeas): Observable<any> {
        let body = JSON.stringify(stagePsclmDtlMeas);
        return this.httpClient.post(this.stagePsclmDtlMeasUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateStagePsclmDtlMeas(stagePsclmDtlMeas : StagePsclmDtlMeas, batchId : string): Observable<any> {
        let body = JSON.stringify(stagePsclmDtlMeas);
        return this.httpClient.put(`${this.stagePsclmDtlMeasUrl}/${batchId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateStagePsclmDtlMeas(stagePsclmDtlMeas : StagePsclmDtlMeas, batchId : string): Observable<any> {
        let body = JSON.stringify(stagePsclmDtlMeas);
        return this.httpClient.patch(`${this.stagePsclmDtlMeasUrl}/${batchId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteStagePsclmDtlMeas(batchId : string): Observable<any> {
        return this.httpClient.delete(`${this.stagePsclmDtlMeasUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}