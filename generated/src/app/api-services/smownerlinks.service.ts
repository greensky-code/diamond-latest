/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Smownerlinks } from '../api-models/smownerlinks.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SmownerlinksService {

    private smownerlinksUrl: string = `${environment.apiUrl}/smownerlinkss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSmownerlinkss(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<Smownerlinks[]> {
        var url = `${this.smownerlinksUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as Smownerlinks[]),
                catchError(this.sharedService.handleError))
    }

    getSmownerlinks(ownerid : number): Observable<Smownerlinks> {
        return this.httpClient.get(`${this.smownerlinksUrl}/${ownerid}`, {observe: 'response'})
            .pipe(map(response => response.body as Smownerlinks),
                catchError(this.sharedService.handleError))
    }

    getSmownerlinkssCount(): Observable<number> {
        var url = `${this.smownerlinksUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSmownerlinks(smownerlinks : Smownerlinks): Observable<any> {
        let body = JSON.stringify(smownerlinks);
        return this.httpClient.post(this.smownerlinksUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSmownerlinks(smownerlinks : Smownerlinks, ownerid : number): Observable<any> {
        let body = JSON.stringify(smownerlinks);
        return this.httpClient.put(`${this.smownerlinksUrl}/${ownerid}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSmownerlinks(smownerlinks : Smownerlinks, ownerid : number): Observable<any> {
        let body = JSON.stringify(smownerlinks);
        return this.httpClient.patch(`${this.smownerlinksUrl}/${ownerid}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSmownerlinks(ownerid : number): Observable<any> {
        return this.httpClient.delete(`${this.smownerlinksUrl}/${ownerid}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}