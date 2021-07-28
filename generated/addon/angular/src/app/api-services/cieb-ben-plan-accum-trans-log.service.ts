/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebBenPlanAccumTransLog } from '../api-models/cieb-ben-plan-accum-trans-log.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class CiebBenPlanAccumTransLogService {

    private ciebBenPlanAccumTransLogUrl: string = `${environment.apiUrl}/ciebbenplanaccumtranslogs`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCiebBenPlanAccumTransLogs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CiebBenPlanAccumTransLog[]> {
        var url = `${this.ciebBenPlanAccumTransLogUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebBenPlanAccumTransLog[]),
                catchError(this.sharedService.handleError))
    }

    getCiebBenPlanAccumTransLog(seqPlanTransId : number): Observable<CiebBenPlanAccumTransLog> {
        return this.httpClient.get(`${this.ciebBenPlanAccumTransLogUrl}/${seqPlanTransId}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebBenPlanAccumTransLog),
                catchError(this.sharedService.handleError))
    }

    getCiebBenPlanAccumTransLogsCount(): Observable<number> {
        var url = `${this.ciebBenPlanAccumTransLogUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCiebBenPlanAccumTransLog(ciebBenPlanAccumTransLog : CiebBenPlanAccumTransLog): Observable<any> {
        let body = JSON.stringify(ciebBenPlanAccumTransLog);
        return this.httpClient.post(this.ciebBenPlanAccumTransLogUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCiebBenPlanAccumTransLog(ciebBenPlanAccumTransLog : CiebBenPlanAccumTransLog, seqPlanTransId : number): Observable<any> {
        let body = JSON.stringify(ciebBenPlanAccumTransLog);
        return this.httpClient.put(`${this.ciebBenPlanAccumTransLogUrl}/${seqPlanTransId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCiebBenPlanAccumTransLog(ciebBenPlanAccumTransLog : CiebBenPlanAccumTransLog, seqPlanTransId : number): Observable<any> {
        let body = JSON.stringify(ciebBenPlanAccumTransLog);
        return this.httpClient.patch(`${this.ciebBenPlanAccumTransLogUrl}/${seqPlanTransId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCiebBenPlanAccumTransLog(seqPlanTransId : number): Observable<any> {
        return this.httpClient.delete(`${this.ciebBenPlanAccumTransLogUrl}/${seqPlanTransId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}