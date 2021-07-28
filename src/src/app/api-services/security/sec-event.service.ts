/* Copyright (c) 2020 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {catchError, map} from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {SharedService} from "../../shared/services/shared.service";
import {SecEvent} from "../../api-models/security/sec-event.model";

@Injectable({
    providedIn: "root"
})
export class SecEventService {

    private secEventUrl: string = `${environment.apiUrl}/secevents`;
    private contentHeaders = new HttpHeaders();

    constructor(private httpClient: HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSecEvents(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<SecEvent[]> {
        var url = `${this.secEventUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SecEvent[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getSecEvent(event: number): Observable<SecEvent> {
        return this.httpClient.get(`${this.secEventUrl}/${event}`, {observe: 'response'})
            .pipe(map(response => response.body as SecEvent),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getSecEventsCount(): Observable<number> {
        var url = `${this.secEventUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }


    createSecEvent(secEvent: SecEvent): Observable<any> {
        let body = JSON.stringify(secEvent);
        return this.httpClient.post(this.secEventUrl, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateSecEvent(secEvent: SecEvent, event: number): Observable<any> {
        let body = JSON.stringify(secEvent);
        return this.httpClient.put(`${this.secEventUrl}/${event}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateSecEvent(secEvent: SecEvent, event: number): Observable<any> {
        let body = JSON.stringify(secEvent);
        return this.httpClient.patch(`${this.secEventUrl}/${event}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteSecEvent(event: number): Observable<any> {
        return this.httpClient.delete(`${this.secEventUrl}/${event}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
