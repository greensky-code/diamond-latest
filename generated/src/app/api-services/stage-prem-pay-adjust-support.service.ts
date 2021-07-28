/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { StagePremPayAdjustSupport } from '../api-models/stage-prem-pay-adjust-support.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class StagePremPayAdjustSupportService {

    private stagePremPayAdjustSupportUrl: string = `${environment.apiUrl}/stageprempayadjustsupports`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getStagePremPayAdjustSupports(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<StagePremPayAdjustSupport[]> {
        var url = `${this.stagePremPayAdjustSupportUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as StagePremPayAdjustSupport[]),
                catchError(this.sharedService.handleError))
    }

    getStagePremPayAdjustSupport(batchId : string): Observable<StagePremPayAdjustSupport> {
        return this.httpClient.get(`${this.stagePremPayAdjustSupportUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StagePremPayAdjustSupport),
                catchError(this.sharedService.handleError))
    }

    getStagePremPayAdjustSupportsCount(): Observable<number> {
        var url = `${this.stagePremPayAdjustSupportUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createStagePremPayAdjustSupport(stagePremPayAdjustSupport : StagePremPayAdjustSupport): Observable<any> {
        let body = JSON.stringify(stagePremPayAdjustSupport);
        return this.httpClient.post(this.stagePremPayAdjustSupportUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateStagePremPayAdjustSupport(stagePremPayAdjustSupport : StagePremPayAdjustSupport, batchId : string): Observable<any> {
        let body = JSON.stringify(stagePremPayAdjustSupport);
        return this.httpClient.put(`${this.stagePremPayAdjustSupportUrl}/${batchId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateStagePremPayAdjustSupport(stagePremPayAdjustSupport : StagePremPayAdjustSupport, batchId : string): Observable<any> {
        let body = JSON.stringify(stagePremPayAdjustSupport);
        return this.httpClient.patch(`${this.stagePremPayAdjustSupportUrl}/${batchId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteStagePremPayAdjustSupport(batchId : string): Observable<any> {
        return this.httpClient.delete(`${this.stagePremPayAdjustSupportUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}