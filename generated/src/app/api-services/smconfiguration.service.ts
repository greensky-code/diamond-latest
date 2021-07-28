/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Smconfiguration } from '../api-models/smconfiguration.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SmconfigurationService {

    private smconfigurationUrl: string = `${environment.apiUrl}/smconfigurations`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSmconfigurations(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<Smconfiguration[]> {
        var url = `${this.smconfigurationUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as Smconfiguration[]),
                catchError(this.sharedService.handleError))
    }

    getSmconfiguration(attribute : string): Observable<Smconfiguration> {
        return this.httpClient.get(`${this.smconfigurationUrl}/${attribute}`, {observe: 'response'})
            .pipe(map(response => response.body as Smconfiguration),
                catchError(this.sharedService.handleError))
    }

    getSmconfigurationsCount(): Observable<number> {
        var url = `${this.smconfigurationUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSmconfiguration(smconfiguration : Smconfiguration): Observable<any> {
        let body = JSON.stringify(smconfiguration);
        return this.httpClient.post(this.smconfigurationUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSmconfiguration(smconfiguration : Smconfiguration, attribute : string): Observable<any> {
        let body = JSON.stringify(smconfiguration);
        return this.httpClient.put(`${this.smconfigurationUrl}/${attribute}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSmconfiguration(smconfiguration : Smconfiguration, attribute : string): Observable<any> {
        let body = JSON.stringify(smconfiguration);
        return this.httpClient.patch(`${this.smconfigurationUrl}/${attribute}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSmconfiguration(attribute : string): Observable<any> {
        return this.httpClient.delete(`${this.smconfigurationUrl}/${attribute}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}