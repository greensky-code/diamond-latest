/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { StageAuthSecOpin } from '../api-models/stage-auth-sec-opin.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class StageAuthSecOpinService {

    private stageAuthSecOpinUrl: string = `${environment.apiUrl}/stageauthsecopins`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getStageAuthSecOpins(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<StageAuthSecOpin[]> {
        var url = `${this.stageAuthSecOpinUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as StageAuthSecOpin[]),
                catchError(this.sharedService.handleError))
    }

    getStageAuthSecOpin(batchId : string): Observable<StageAuthSecOpin> {
        return this.httpClient.get(`${this.stageAuthSecOpinUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StageAuthSecOpin),
                catchError(this.sharedService.handleError))
    }

    getStageAuthSecOpinsCount(): Observable<number> {
        var url = `${this.stageAuthSecOpinUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createStageAuthSecOpin(stageAuthSecOpin : StageAuthSecOpin): Observable<any> {
        let body = JSON.stringify(stageAuthSecOpin);
        return this.httpClient.post(this.stageAuthSecOpinUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateStageAuthSecOpin(stageAuthSecOpin : StageAuthSecOpin, batchId : string): Observable<any> {
        let body = JSON.stringify(stageAuthSecOpin);
        return this.httpClient.put(`${this.stageAuthSecOpinUrl}/${batchId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateStageAuthSecOpin(stageAuthSecOpin : StageAuthSecOpin, batchId : string): Observable<any> {
        let body = JSON.stringify(stageAuthSecOpin);
        return this.httpClient.patch(`${this.stageAuthSecOpinUrl}/${batchId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteStageAuthSecOpin(batchId : string): Observable<any> {
        return this.httpClient.delete(`${this.stageAuthSecOpinUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}