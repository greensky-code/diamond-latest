/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SubscriberIdChangeWork } from '../api-models/subscriber-id-change-work.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SubscriberIdChangeWorkService {

    private subscriberIdChangeWorkUrl: string = `${environment.apiUrl}/subscriberidchangeworks`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSubscriberIdChangeWorks(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SubscriberIdChangeWork[]> {
        var url = `${this.subscriberIdChangeWorkUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SubscriberIdChangeWork[]),
                catchError(this.sharedService.handleError))
    }

    getSubscriberIdChangeWork(seqSubsId : number): Observable<SubscriberIdChangeWork> {
        return this.httpClient.get(`${this.subscriberIdChangeWorkUrl}/${seqSubsId}`, {observe: 'response'})
            .pipe(map(response => response.body as SubscriberIdChangeWork),
                catchError(this.sharedService.handleError))
    }

    getSubscriberIdChangeWorksCount(): Observable<number> {
        var url = `${this.subscriberIdChangeWorkUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSubscriberIdChangeWork(subscriberIdChangeWork : SubscriberIdChangeWork): Observable<any> {
        let body = JSON.stringify(subscriberIdChangeWork);
        return this.httpClient.post(this.subscriberIdChangeWorkUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSubscriberIdChangeWork(subscriberIdChangeWork : SubscriberIdChangeWork, seqSubsId : number): Observable<any> {
        let body = JSON.stringify(subscriberIdChangeWork);
        return this.httpClient.put(`${this.subscriberIdChangeWorkUrl}/${seqSubsId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSubscriberIdChangeWork(subscriberIdChangeWork : SubscriberIdChangeWork, seqSubsId : number): Observable<any> {
        let body = JSON.stringify(subscriberIdChangeWork);
        return this.httpClient.patch(`${this.subscriberIdChangeWorkUrl}/${seqSubsId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSubscriberIdChangeWork(seqSubsId : number): Observable<any> {
        return this.httpClient.delete(`${this.subscriberIdChangeWorkUrl}/${seqSubsId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}