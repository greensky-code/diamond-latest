/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { StagePremPayHeaderSupport } from '../api-models/stage-prem-pay-header-support.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class StagePremPayHeaderSupportService {

    private stagePremPayHeaderSupportUrl: string = `${environment.apiUrl}/stageprempayheadersupports`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getStagePremPayHeaderSupports(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<StagePremPayHeaderSupport[]> {
        var url = `${this.stagePremPayHeaderSupportUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as StagePremPayHeaderSupport[]),
                catchError(this.sharedService.handleError))
    }

    getStagePremPayHeaderSupport(batchId : string): Observable<StagePremPayHeaderSupport> {
        return this.httpClient.get(`${this.stagePremPayHeaderSupportUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StagePremPayHeaderSupport),
                catchError(this.sharedService.handleError))
    }

    getStagePremPayHeaderSupportsCount(): Observable<number> {
        var url = `${this.stagePremPayHeaderSupportUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createStagePremPayHeaderSupport(stagePremPayHeaderSupport : StagePremPayHeaderSupport): Observable<any> {
        let body = JSON.stringify(stagePremPayHeaderSupport);
        return this.httpClient.post(this.stagePremPayHeaderSupportUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateStagePremPayHeaderSupport(stagePremPayHeaderSupport : StagePremPayHeaderSupport, batchId : string): Observable<any> {
        let body = JSON.stringify(stagePremPayHeaderSupport);
        return this.httpClient.put(`${this.stagePremPayHeaderSupportUrl}/${batchId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateStagePremPayHeaderSupport(stagePremPayHeaderSupport : StagePremPayHeaderSupport, batchId : string): Observable<any> {
        let body = JSON.stringify(stagePremPayHeaderSupport);
        return this.httpClient.patch(`${this.stagePremPayHeaderSupportUrl}/${batchId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteStagePremPayHeaderSupport(batchId : string): Observable<any> {
        return this.httpClient.delete(`${this.stagePremPayHeaderSupportUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}