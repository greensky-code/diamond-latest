/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { GroupStateMandate } from '../api-models/group-state-mandate.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class GroupStateMandateService {

    private groupStateMandateUrl: string = `${environment.apiUrl}/groupstatemandates`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getGroupStateMandates(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<GroupStateMandate[]> {
        var url = `${this.groupStateMandateUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as GroupStateMandate[]),
                catchError(this.sharedService.handleError))
    }

    getGroupStateMandate(seqGpstatId : number): Observable<GroupStateMandate> {
        return this.httpClient.get(`${this.groupStateMandateUrl}/${seqGpstatId}`, {observe: 'response'})
            .pipe(map(response => response.body as GroupStateMandate),
                catchError(this.sharedService.handleError))
    }

    getGroupStateMandatesCount(): Observable<number> {
        var url = `${this.groupStateMandateUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createGroupStateMandate(groupStateMandate : GroupStateMandate): Observable<any> {
        let body = JSON.stringify(groupStateMandate);
        return this.httpClient.post(this.groupStateMandateUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateGroupStateMandate(groupStateMandate : GroupStateMandate, seqGpstatId : number): Observable<any> {
        let body = JSON.stringify(groupStateMandate);
        return this.httpClient.put(`${this.groupStateMandateUrl}/${seqGpstatId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateGroupStateMandate(groupStateMandate : GroupStateMandate, seqGpstatId : number): Observable<any> {
        let body = JSON.stringify(groupStateMandate);
        return this.httpClient.patch(`${this.groupStateMandateUrl}/${seqGpstatId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteGroupStateMandate(seqGpstatId : number): Observable<any> {
        return this.httpClient.delete(`${this.groupStateMandateUrl}/${seqGpstatId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}