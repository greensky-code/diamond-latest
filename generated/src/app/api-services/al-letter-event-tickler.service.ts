/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AlLetterEventTickler } from '../api-models/al-letter-event-tickler.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AlLetterEventTicklerService {

    private alLetterEventTicklerUrl: string = `${environment.apiUrl}/allettereventticklers`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAlLetterEventTicklers(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AlLetterEventTickler[]> {
        var url = `${this.alLetterEventTicklerUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AlLetterEventTickler[]),
                catchError(this.sharedService.handleError))
    }

    getAlLetterEventTickler(seqLetterEventId : number): Observable<AlLetterEventTickler> {
        return this.httpClient.get(`${this.alLetterEventTicklerUrl}/${seqLetterEventId}`, {observe: 'response'})
            .pipe(map(response => response.body as AlLetterEventTickler),
                catchError(this.sharedService.handleError))
    }

    getAlLetterEventTicklersCount(): Observable<number> {
        var url = `${this.alLetterEventTicklerUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqLetterEventId(seqLetterEventId : number): Observable<AlLetterEventTickler[]> {
        return this.httpClient.get(`${this.alLetterEventTicklerUrl}/find-by-seqlettereventid/${seqLetterEventId}`, {observe: 'response'})
            .pipe(map(response => response.body as AlLetterEventTickler),
                catchError(this.sharedService.handleError))
    }




    createAlLetterEventTickler(alLetterEventTickler : AlLetterEventTickler): Observable<any> {
        let body = JSON.stringify(alLetterEventTickler);
        return this.httpClient.post(this.alLetterEventTicklerUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateAlLetterEventTickler(alLetterEventTickler : AlLetterEventTickler, seqLetterEventId : number): Observable<any> {
        let body = JSON.stringify(alLetterEventTickler);
        return this.httpClient.put(`${this.alLetterEventTicklerUrl}/${seqLetterEventId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateAlLetterEventTickler(alLetterEventTickler : AlLetterEventTickler, seqLetterEventId : number): Observable<any> {
        let body = JSON.stringify(alLetterEventTickler);
        return this.httpClient.patch(`${this.alLetterEventTicklerUrl}/${seqLetterEventId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteAlLetterEventTickler(seqLetterEventId : number): Observable<any> {
        return this.httpClient.delete(`${this.alLetterEventTicklerUrl}/${seqLetterEventId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}