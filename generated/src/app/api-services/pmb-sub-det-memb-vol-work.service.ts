/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PmbSubDetMembVolWork } from '../api-models/pmb-sub-det-memb-vol-work.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PmbSubDetMembVolWorkService {

    private pmbSubDetMembVolWorkUrl: string = `${environment.apiUrl}/pmbsubdetmembvolworks`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPmbSubDetMembVolWorks(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PmbSubDetMembVolWork[]> {
        var url = `${this.pmbSubDetMembVolWorkUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PmbSubDetMembVolWork[]),
                catchError(this.sharedService.handleError))
    }

    getPmbSubDetMembVolWork(seqGpbilId : number): Observable<PmbSubDetMembVolWork> {
        return this.httpClient.get(`${this.pmbSubDetMembVolWorkUrl}/${seqGpbilId}`, {observe: 'response'})
            .pipe(map(response => response.body as PmbSubDetMembVolWork),
                catchError(this.sharedService.handleError))
    }

    getPmbSubDetMembVolWorksCount(): Observable<number> {
        var url = `${this.pmbSubDetMembVolWorkUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createPmbSubDetMembVolWork(pmbSubDetMembVolWork : PmbSubDetMembVolWork): Observable<any> {
        let body = JSON.stringify(pmbSubDetMembVolWork);
        return this.httpClient.post(this.pmbSubDetMembVolWorkUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updatePmbSubDetMembVolWork(pmbSubDetMembVolWork : PmbSubDetMembVolWork, seqGpbilId : number): Observable<any> {
        let body = JSON.stringify(pmbSubDetMembVolWork);
        return this.httpClient.put(`${this.pmbSubDetMembVolWorkUrl}/${seqGpbilId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdatePmbSubDetMembVolWork(pmbSubDetMembVolWork : PmbSubDetMembVolWork, seqGpbilId : number): Observable<any> {
        let body = JSON.stringify(pmbSubDetMembVolWork);
        return this.httpClient.patch(`${this.pmbSubDetMembVolWorkUrl}/${seqGpbilId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deletePmbSubDetMembVolWork(seqGpbilId : number): Observable<any> {
        return this.httpClient.delete(`${this.pmbSubDetMembVolWorkUrl}/${seqGpbilId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}