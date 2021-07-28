/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { StageDnclmToothHist } from '../api-models/stage-dnclm-tooth-hist.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class StageDnclmToothHistService {

    private stageDnclmToothHistUrl: string = `${environment.apiUrl}/stagednclmtoothhists`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getStageDnclmToothHists(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<StageDnclmToothHist[]> {
        var url = `${this.stageDnclmToothHistUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as StageDnclmToothHist[]),
                catchError(this.sharedService.handleError))
    }

    getStageDnclmToothHist(batchId : string): Observable<StageDnclmToothHist> {
        return this.httpClient.get(`${this.stageDnclmToothHistUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StageDnclmToothHist),
                catchError(this.sharedService.handleError))
    }

    getStageDnclmToothHistsCount(): Observable<number> {
        var url = `${this.stageDnclmToothHistUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createStageDnclmToothHist(stageDnclmToothHist : StageDnclmToothHist): Observable<any> {
        let body = JSON.stringify(stageDnclmToothHist);
        return this.httpClient.post(this.stageDnclmToothHistUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateStageDnclmToothHist(stageDnclmToothHist : StageDnclmToothHist, batchId : string): Observable<any> {
        let body = JSON.stringify(stageDnclmToothHist);
        return this.httpClient.put(`${this.stageDnclmToothHistUrl}/${batchId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateStageDnclmToothHist(stageDnclmToothHist : StageDnclmToothHist, batchId : string): Observable<any> {
        let body = JSON.stringify(stageDnclmToothHist);
        return this.httpClient.patch(`${this.stageDnclmToothHistUrl}/${batchId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteStageDnclmToothHist(batchId : string): Observable<any> {
        return this.httpClient.delete(`${this.stageDnclmToothHistUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}