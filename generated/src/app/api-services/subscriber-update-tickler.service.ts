/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SubscriberUpdateTickler } from '../api-models/subscriber-update-tickler.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SubscriberUpdateTicklerService {

    private subscriberUpdateTicklerUrl: string = `${environment.apiUrl}/subscriberupdateticklers`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSubscriberUpdateTicklers(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SubscriberUpdateTickler[]> {
        var url = `${this.subscriberUpdateTicklerUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SubscriberUpdateTickler[]),
                catchError(this.sharedService.handleError))
    }

    getSubscriberUpdateTickler(seqSubsId : number): Observable<SubscriberUpdateTickler> {
        return this.httpClient.get(`${this.subscriberUpdateTicklerUrl}/${seqSubsId}`, {observe: 'response'})
            .pipe(map(response => response.body as SubscriberUpdateTickler),
                catchError(this.sharedService.handleError))
    }

    getSubscriberUpdateTicklersCount(): Observable<number> {
        var url = `${this.subscriberUpdateTicklerUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSubscriberUpdateTickler(subscriberUpdateTickler : SubscriberUpdateTickler): Observable<any> {
        let body = JSON.stringify(subscriberUpdateTickler);
        return this.httpClient.post(this.subscriberUpdateTicklerUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSubscriberUpdateTickler(subscriberUpdateTickler : SubscriberUpdateTickler, seqSubsId : number): Observable<any> {
        let body = JSON.stringify(subscriberUpdateTickler);
        return this.httpClient.put(`${this.subscriberUpdateTicklerUrl}/${seqSubsId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSubscriberUpdateTickler(subscriberUpdateTickler : SubscriberUpdateTickler, seqSubsId : number): Observable<any> {
        let body = JSON.stringify(subscriberUpdateTickler);
        return this.httpClient.patch(`${this.subscriberUpdateTicklerUrl}/${seqSubsId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSubscriberUpdateTickler(seqSubsId : number): Observable<any> {
        return this.httpClient.delete(`${this.subscriberUpdateTicklerUrl}/${seqSubsId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}