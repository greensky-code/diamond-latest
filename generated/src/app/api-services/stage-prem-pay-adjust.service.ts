/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { StagePremPayAdjust } from '../api-models/stage-prem-pay-adjust.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class StagePremPayAdjustService {

    private stagePremPayAdjustUrl: string = `${environment.apiUrl}/stageprempayadjusts`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getStagePremPayAdjusts(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<StagePremPayAdjust[]> {
        var url = `${this.stagePremPayAdjustUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as StagePremPayAdjust[]),
                catchError(this.sharedService.handleError))
    }

    getStagePremPayAdjust(batchId : string): Observable<StagePremPayAdjust> {
        return this.httpClient.get(`${this.stagePremPayAdjustUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StagePremPayAdjust),
                catchError(this.sharedService.handleError))
    }

    getStagePremPayAdjustsCount(): Observable<number> {
        var url = `${this.stagePremPayAdjustUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByBatchId(batchId : string): Observable<StagePremPayAdjust[]> {
        return this.httpClient.get(`${this.stagePremPayAdjustUrl}/find-by-batchid/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StagePremPayAdjust),
                catchError(this.sharedService.handleError))
    }




    createStagePremPayAdjust(stagePremPayAdjust : StagePremPayAdjust): Observable<any> {
        let body = JSON.stringify(stagePremPayAdjust);
        return this.httpClient.post(this.stagePremPayAdjustUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateStagePremPayAdjust(stagePremPayAdjust : StagePremPayAdjust, batchId : string): Observable<any> {
        let body = JSON.stringify(stagePremPayAdjust);
        return this.httpClient.put(`${this.stagePremPayAdjustUrl}/${batchId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateStagePremPayAdjust(stagePremPayAdjust : StagePremPayAdjust, batchId : string): Observable<any> {
        let body = JSON.stringify(stagePremPayAdjust);
        return this.httpClient.patch(`${this.stagePremPayAdjustUrl}/${batchId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteStagePremPayAdjust(batchId : string): Observable<any> {
        return this.httpClient.delete(`${this.stagePremPayAdjustUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}