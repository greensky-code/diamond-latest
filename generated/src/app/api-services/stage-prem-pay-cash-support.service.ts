/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { StagePremPayCashSupport } from '../api-models/stage-prem-pay-cash-support.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class StagePremPayCashSupportService {

    private stagePremPayCashSupportUrl: string = `${environment.apiUrl}/stageprempaycashsupports`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getStagePremPayCashSupports(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<StagePremPayCashSupport[]> {
        var url = `${this.stagePremPayCashSupportUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as StagePremPayCashSupport[]),
                catchError(this.sharedService.handleError))
    }

    getStagePremPayCashSupport(batchId : string): Observable<StagePremPayCashSupport> {
        return this.httpClient.get(`${this.stagePremPayCashSupportUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StagePremPayCashSupport),
                catchError(this.sharedService.handleError))
    }

    getStagePremPayCashSupportsCount(): Observable<number> {
        var url = `${this.stagePremPayCashSupportUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createStagePremPayCashSupport(stagePremPayCashSupport : StagePremPayCashSupport): Observable<any> {
        let body = JSON.stringify(stagePremPayCashSupport);
        return this.httpClient.post(this.stagePremPayCashSupportUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateStagePremPayCashSupport(stagePremPayCashSupport : StagePremPayCashSupport, batchId : string): Observable<any> {
        let body = JSON.stringify(stagePremPayCashSupport);
        return this.httpClient.put(`${this.stagePremPayCashSupportUrl}/${batchId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateStagePremPayCashSupport(stagePremPayCashSupport : StagePremPayCashSupport, batchId : string): Observable<any> {
        let body = JSON.stringify(stagePremPayCashSupport);
        return this.httpClient.patch(`${this.stagePremPayCashSupportUrl}/${batchId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteStagePremPayCashSupport(batchId : string): Observable<any> {
        return this.httpClient.delete(`${this.stagePremPayCashSupportUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}