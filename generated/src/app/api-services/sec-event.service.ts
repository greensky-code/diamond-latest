/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SecEvent } from '../api-models/sec-event.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SecEventService {

    private secEventUrl: string = `${environment.apiUrl}/secevents`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSecEvents(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SecEvent[]> {
        var url = `${this.secEventUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SecEvent[]),
                catchError(this.sharedService.handleError))
    }

    getSecEvent(event : number): Observable<SecEvent> {
        return this.httpClient.get(`${this.secEventUrl}/${event}`, {observe: 'response'})
            .pipe(map(response => response.body as SecEvent),
                catchError(this.sharedService.handleError))
    }

    getSecEventsCount(): Observable<number> {
        var url = `${this.secEventUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSecEvent(secEvent : SecEvent): Observable<any> {
        let body = JSON.stringify(secEvent);
        return this.httpClient.post(this.secEventUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSecEvent(secEvent : SecEvent, event : number): Observable<any> {
        let body = JSON.stringify(secEvent);
        return this.httpClient.put(`${this.secEventUrl}/${event}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSecEvent(secEvent : SecEvent, event : number): Observable<any> {
        let body = JSON.stringify(secEvent);
        return this.httpClient.patch(`${this.secEventUrl}/${event}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSecEvent(event : number): Observable<any> {
        return this.httpClient.delete(`${this.secEventUrl}/${event}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}