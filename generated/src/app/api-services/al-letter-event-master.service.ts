/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AlLetterEventMaster } from '../api-models/al-letter-event-master.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AlLetterEventMasterService {

    private alLetterEventMasterUrl: string = `${environment.apiUrl}/allettereventmasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAlLetterEventMasters(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AlLetterEventMaster[]> {
        var url = `${this.alLetterEventMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AlLetterEventMaster[]),
                catchError(this.sharedService.handleError))
    }

    getAlLetterEventMaster(letterEventId : string): Observable<AlLetterEventMaster> {
        return this.httpClient.get(`${this.alLetterEventMasterUrl}/${letterEventId}`, {observe: 'response'})
            .pipe(map(response => response.body as AlLetterEventMaster),
                catchError(this.sharedService.handleError))
    }

    getAlLetterEventMastersCount(): Observable<number> {
        var url = `${this.alLetterEventMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createAlLetterEventMaster(alLetterEventMaster : AlLetterEventMaster): Observable<any> {
        let body = JSON.stringify(alLetterEventMaster);
        return this.httpClient.post(this.alLetterEventMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateAlLetterEventMaster(alLetterEventMaster : AlLetterEventMaster, letterEventId : string): Observable<any> {
        let body = JSON.stringify(alLetterEventMaster);
        return this.httpClient.put(`${this.alLetterEventMasterUrl}/${letterEventId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateAlLetterEventMaster(alLetterEventMaster : AlLetterEventMaster, letterEventId : string): Observable<any> {
        let body = JSON.stringify(alLetterEventMaster);
        return this.httpClient.patch(`${this.alLetterEventMasterUrl}/${letterEventId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteAlLetterEventMaster(letterEventId : string): Observable<any> {
        return this.httpClient.delete(`${this.alLetterEventMasterUrl}/${letterEventId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}