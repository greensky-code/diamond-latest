/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SubscriberSnapshot } from '../api-models/subscriber-snapshot.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SubscriberSnapshotService {

    private subscriberSnapshotUrl: string = `${environment.apiUrl}/subscribersnapshots`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSubscriberSnapshots(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SubscriberSnapshot[]> {
        var url = `${this.subscriberSnapshotUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SubscriberSnapshot[]),
                catchError(this.sharedService.handleError))
    }

    getSubscriberSnapshot(seqSubsId : number): Observable<SubscriberSnapshot> {
        return this.httpClient.get(`${this.subscriberSnapshotUrl}/${seqSubsId}`, {observe: 'response'})
            .pipe(map(response => response.body as SubscriberSnapshot),
                catchError(this.sharedService.handleError))
    }

    getSubscriberSnapshotsCount(): Observable<number> {
        var url = `${this.subscriberSnapshotUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSubscriberSnapshot(subscriberSnapshot : SubscriberSnapshot): Observable<any> {
        let body = JSON.stringify(subscriberSnapshot);
        return this.httpClient.post(this.subscriberSnapshotUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSubscriberSnapshot(subscriberSnapshot : SubscriberSnapshot, seqSubsId : number): Observable<any> {
        let body = JSON.stringify(subscriberSnapshot);
        return this.httpClient.put(`${this.subscriberSnapshotUrl}/${seqSubsId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSubscriberSnapshot(subscriberSnapshot : SubscriberSnapshot, seqSubsId : number): Observable<any> {
        let body = JSON.stringify(subscriberSnapshot);
        return this.httpClient.patch(`${this.subscriberSnapshotUrl}/${seqSubsId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSubscriberSnapshot(seqSubsId : number): Observable<any> {
        return this.httpClient.delete(`${this.subscriberSnapshotUrl}/${seqSubsId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}