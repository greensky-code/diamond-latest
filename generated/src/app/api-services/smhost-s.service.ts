/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SmhostS } from '../api-models/smhost-s.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SmhostSService {

    private smhostSUrl: string = `${environment.apiUrl}/smhostss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSmhostSs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SmhostS[]> {
        var url = `${this.smhostSUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SmhostS[]),
                catchError(this.sharedService.handleError))
    }

    getSmhostS(namedobjectIdSequenceid : number): Observable<SmhostS> {
        return this.httpClient.get(`${this.smhostSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body as SmhostS),
                catchError(this.sharedService.handleError))
    }

    getSmhostSsCount(): Observable<number> {
        var url = `${this.smhostSUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSmhostS(smhostS : SmhostS): Observable<any> {
        let body = JSON.stringify(smhostS);
        return this.httpClient.post(this.smhostSUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSmhostS(smhostS : SmhostS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smhostS);
        return this.httpClient.put(`${this.smhostSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSmhostS(smhostS : SmhostS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smhostS);
        return this.httpClient.patch(`${this.smhostSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSmhostS(namedobjectIdSequenceid : number): Observable<any> {
        return this.httpClient.delete(`${this.smhostSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}