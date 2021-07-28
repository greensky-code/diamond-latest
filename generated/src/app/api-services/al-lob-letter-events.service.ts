/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AlLobLetterEvents } from '../api-models/al-lob-letter-events.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AlLobLetterEventsService {

    private alLobLetterEventsUrl: string = `${environment.apiUrl}/alloblettereventss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAlLobLetterEventss(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AlLobLetterEvents[]> {
        var url = `${this.alLobLetterEventsUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AlLobLetterEvents[]),
                catchError(this.sharedService.handleError))
    }

    getAlLobLetterEvents(lineOfBusiness : string): Observable<AlLobLetterEvents> {
        return this.httpClient.get(`${this.alLobLetterEventsUrl}/${lineOfBusiness}`, {observe: 'response'})
            .pipe(map(response => response.body as AlLobLetterEvents),
                catchError(this.sharedService.handleError))
    }

    getAlLobLetterEventssCount(): Observable<number> {
        var url = `${this.alLobLetterEventsUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByLineOfBusiness(lineOfBusiness : string): Observable<AlLobLetterEvents[]> {
        return this.httpClient.get(`${this.alLobLetterEventsUrl}/find-by-lineofbusiness/${lineOfBusiness}`, {observe: 'response'})
            .pipe(map(response => response.body as AlLobLetterEvents),
                catchError(this.sharedService.handleError))
    }
    findByLetterEventId(letterEventId : string): Observable<AlLobLetterEvents[]> {
        return this.httpClient.get(`${this.alLobLetterEventsUrl}/find-by-lettereventid/${letterEventId}`, {observe: 'response'})
            .pipe(map(response => response.body as AlLobLetterEvents),
                catchError(this.sharedService.handleError))
    }




    createAlLobLetterEvents(alLobLetterEvents : AlLobLetterEvents): Observable<any> {
        let body = JSON.stringify(alLobLetterEvents);
        return this.httpClient.post(this.alLobLetterEventsUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateAlLobLetterEvents(alLobLetterEvents : AlLobLetterEvents, lineOfBusiness : string): Observable<any> {
        let body = JSON.stringify(alLobLetterEvents);
        return this.httpClient.put(`${this.alLobLetterEventsUrl}/${lineOfBusiness}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateAlLobLetterEvents(alLobLetterEvents : AlLobLetterEvents, lineOfBusiness : string): Observable<any> {
        let body = JSON.stringify(alLobLetterEvents);
        return this.httpClient.patch(`${this.alLobLetterEventsUrl}/${lineOfBusiness}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteAlLobLetterEvents(lineOfBusiness : string): Observable<any> {
        return this.httpClient.delete(`${this.alLobLetterEventsUrl}/${lineOfBusiness}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}