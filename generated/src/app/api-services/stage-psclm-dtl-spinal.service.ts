/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { StagePsclmDtlSpinal } from '../api-models/stage-psclm-dtl-spinal.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class StagePsclmDtlSpinalService {

    private stagePsclmDtlSpinalUrl: string = `${environment.apiUrl}/stagepsclmdtlspinals`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getStagePsclmDtlSpinals(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<StagePsclmDtlSpinal[]> {
        var url = `${this.stagePsclmDtlSpinalUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as StagePsclmDtlSpinal[]),
                catchError(this.sharedService.handleError))
    }

    getStagePsclmDtlSpinal(batchId : string): Observable<StagePsclmDtlSpinal> {
        return this.httpClient.get(`${this.stagePsclmDtlSpinalUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StagePsclmDtlSpinal),
                catchError(this.sharedService.handleError))
    }

    getStagePsclmDtlSpinalsCount(): Observable<number> {
        var url = `${this.stagePsclmDtlSpinalUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createStagePsclmDtlSpinal(stagePsclmDtlSpinal : StagePsclmDtlSpinal): Observable<any> {
        let body = JSON.stringify(stagePsclmDtlSpinal);
        return this.httpClient.post(this.stagePsclmDtlSpinalUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateStagePsclmDtlSpinal(stagePsclmDtlSpinal : StagePsclmDtlSpinal, batchId : string): Observable<any> {
        let body = JSON.stringify(stagePsclmDtlSpinal);
        return this.httpClient.put(`${this.stagePsclmDtlSpinalUrl}/${batchId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateStagePsclmDtlSpinal(stagePsclmDtlSpinal : StagePsclmDtlSpinal, batchId : string): Observable<any> {
        let body = JSON.stringify(stagePsclmDtlSpinal);
        return this.httpClient.patch(`${this.stagePsclmDtlSpinalUrl}/${batchId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteStagePsclmDtlSpinal(batchId : string): Observable<any> {
        return this.httpClient.delete(`${this.stagePsclmDtlSpinalUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}