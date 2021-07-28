/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SubscriberUpdateSetup } from '../api-models/subscriber-update-setup.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SubscriberUpdateSetupService {

    private subscriberUpdateSetupUrl: string = `${environment.apiUrl}/subscriberupdatesetups`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSubscriberUpdateSetups(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SubscriberUpdateSetup[]> {
        var url = `${this.subscriberUpdateSetupUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SubscriberUpdateSetup[]),
                catchError(this.sharedService.handleError))
    }

    getSubscriberUpdateSetup(seqSubscId : number): Observable<SubscriberUpdateSetup> {
        return this.httpClient.get(`${this.subscriberUpdateSetupUrl}/${seqSubscId}`, {observe: 'response'})
            .pipe(map(response => response.body as SubscriberUpdateSetup),
                catchError(this.sharedService.handleError))
    }

    getSubscriberUpdateSetupsCount(): Observable<number> {
        var url = `${this.subscriberUpdateSetupUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSubscriberUpdateSetup(subscriberUpdateSetup : SubscriberUpdateSetup): Observable<any> {
        let body = JSON.stringify(subscriberUpdateSetup);
        return this.httpClient.post(this.subscriberUpdateSetupUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSubscriberUpdateSetup(subscriberUpdateSetup : SubscriberUpdateSetup, seqSubscId : number): Observable<any> {
        let body = JSON.stringify(subscriberUpdateSetup);
        return this.httpClient.put(`${this.subscriberUpdateSetupUrl}/${seqSubscId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSubscriberUpdateSetup(subscriberUpdateSetup : SubscriberUpdateSetup, seqSubscId : number): Observable<any> {
        let body = JSON.stringify(subscriberUpdateSetup);
        return this.httpClient.patch(`${this.subscriberUpdateSetupUrl}/${seqSubscId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSubscriberUpdateSetup(seqSubscId : number): Observable<any> {
        return this.httpClient.delete(`${this.subscriberUpdateSetupUrl}/${seqSubscId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}