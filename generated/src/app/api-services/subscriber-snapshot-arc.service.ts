/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SubscriberSnapshotArc } from '../api-models/subscriber-snapshot-arc.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SubscriberSnapshotArcService {

    private subscriberSnapshotArcUrl: string = `${environment.apiUrl}/subscribersnapshotarcs`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSubscriberSnapshotArcs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SubscriberSnapshotArc[]> {
        var url = `${this.subscriberSnapshotArcUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SubscriberSnapshotArc[]),
                catchError(this.sharedService.handleError))
    }

    getSubscriberSnapshotArc(seqSubsId : number): Observable<SubscriberSnapshotArc> {
        return this.httpClient.get(`${this.subscriberSnapshotArcUrl}/${seqSubsId}`, {observe: 'response'})
            .pipe(map(response => response.body as SubscriberSnapshotArc),
                catchError(this.sharedService.handleError))
    }

    getSubscriberSnapshotArcsCount(): Observable<number> {
        var url = `${this.subscriberSnapshotArcUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSubscriberSnapshotArc(subscriberSnapshotArc : SubscriberSnapshotArc): Observable<any> {
        let body = JSON.stringify(subscriberSnapshotArc);
        return this.httpClient.post(this.subscriberSnapshotArcUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSubscriberSnapshotArc(subscriberSnapshotArc : SubscriberSnapshotArc, seqSubsId : number): Observable<any> {
        let body = JSON.stringify(subscriberSnapshotArc);
        return this.httpClient.put(`${this.subscriberSnapshotArcUrl}/${seqSubsId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSubscriberSnapshotArc(subscriberSnapshotArc : SubscriberSnapshotArc, seqSubsId : number): Observable<any> {
        let body = JSON.stringify(subscriberSnapshotArc);
        return this.httpClient.patch(`${this.subscriberSnapshotArcUrl}/${seqSubsId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSubscriberSnapshotArc(seqSubsId : number): Observable<any> {
        return this.httpClient.delete(`${this.subscriberSnapshotArcUrl}/${seqSubsId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}