/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Smmownerlinks } from '../api-models/smmownerlinks.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SmmownerlinksService {

    private smmownerlinksUrl: string = `${environment.apiUrl}/smmownerlinkss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSmmownerlinkss(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<Smmownerlinks[]> {
        var url = `${this.smmownerlinksUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as Smmownerlinks[]),
                catchError(this.sharedService.handleError))
    }

    getSmmownerlinks(mownerid : number): Observable<Smmownerlinks> {
        return this.httpClient.get(`${this.smmownerlinksUrl}/${mownerid}`, {observe: 'response'})
            .pipe(map(response => response.body as Smmownerlinks),
                catchError(this.sharedService.handleError))
    }

    getSmmownerlinkssCount(): Observable<number> {
        var url = `${this.smmownerlinksUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSmmownerlinks(smmownerlinks : Smmownerlinks): Observable<any> {
        let body = JSON.stringify(smmownerlinks);
        return this.httpClient.post(this.smmownerlinksUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSmmownerlinks(smmownerlinks : Smmownerlinks, mownerid : number): Observable<any> {
        let body = JSON.stringify(smmownerlinks);
        return this.httpClient.put(`${this.smmownerlinksUrl}/${mownerid}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSmmownerlinks(smmownerlinks : Smmownerlinks, mownerid : number): Observable<any> {
        let body = JSON.stringify(smmownerlinks);
        return this.httpClient.patch(`${this.smmownerlinksUrl}/${mownerid}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSmmownerlinks(mownerid : number): Observable<any> {
        return this.httpClient.delete(`${this.smmownerlinksUrl}/${mownerid}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}