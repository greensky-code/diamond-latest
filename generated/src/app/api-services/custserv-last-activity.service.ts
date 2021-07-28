/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CustservLastActivity } from '../api-models/custserv-last-activity.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CustservLastActivityService {

    private custservLastActivityUrl: string = `${environment.apiUrl}/custservlastactivitys`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCustservLastActivitys(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CustservLastActivity[]> {
        var url = `${this.custservLastActivityUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CustservLastActivity[]),
                catchError(this.sharedService.handleError))
    }

    getCustservLastActivity(seqMembId : number): Observable<CustservLastActivity> {
        return this.httpClient.get(`${this.custservLastActivityUrl}/${seqMembId}`, {observe: 'response'})
            .pipe(map(response => response.body as CustservLastActivity),
                catchError(this.sharedService.handleError))
    }

    getCustservLastActivitysCount(): Observable<number> {
        var url = `${this.custservLastActivityUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqMembId(seqMembId : number): Observable<CustservLastActivity[]> {
        return this.httpClient.get(`${this.custservLastActivityUrl}/find-by-seqmembid/${seqMembId}`, {observe: 'response'})
            .pipe(map(response => response.body as CustservLastActivity),
                catchError(this.sharedService.handleError))
    }




    createCustservLastActivity(custservLastActivity : CustservLastActivity): Observable<any> {
        let body = JSON.stringify(custservLastActivity);
        return this.httpClient.post(this.custservLastActivityUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCustservLastActivity(custservLastActivity : CustservLastActivity, seqMembId : number): Observable<any> {
        let body = JSON.stringify(custservLastActivity);
        return this.httpClient.put(`${this.custservLastActivityUrl}/${seqMembId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCustservLastActivity(custservLastActivity : CustservLastActivity, seqMembId : number): Observable<any> {
        let body = JSON.stringify(custservLastActivity);
        return this.httpClient.patch(`${this.custservLastActivityUrl}/${seqMembId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCustservLastActivity(seqMembId : number): Observable<any> {
        return this.httpClient.delete(`${this.custservLastActivityUrl}/${seqMembId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}