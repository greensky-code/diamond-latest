/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CapEntityIbnr } from '../api-models/cap-entity-ibnr.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CapEntityIbnrService {

    private capEntityIbnrUrl: string = `${environment.apiUrl}/capentityibnrs`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCapEntityIbnrs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CapEntityIbnr[]> {
        var url = `${this.capEntityIbnrUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CapEntityIbnr[]),
                catchError(this.sharedService.handleError))
    }

    getCapEntityIbnr(seqCapEntityIbnr : number): Observable<CapEntityIbnr> {
        return this.httpClient.get(`${this.capEntityIbnrUrl}/${seqCapEntityIbnr}`, {observe: 'response'})
            .pipe(map(response => response.body as CapEntityIbnr),
                catchError(this.sharedService.handleError))
    }

    getCapEntityIbnrsCount(): Observable<number> {
        var url = `${this.capEntityIbnrUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCapEntityIbnr(capEntityIbnr : CapEntityIbnr): Observable<any> {
        let body = JSON.stringify(capEntityIbnr);
        return this.httpClient.post(this.capEntityIbnrUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCapEntityIbnr(capEntityIbnr : CapEntityIbnr, seqCapEntityIbnr : number): Observable<any> {
        let body = JSON.stringify(capEntityIbnr);
        return this.httpClient.put(`${this.capEntityIbnrUrl}/${seqCapEntityIbnr}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCapEntityIbnr(capEntityIbnr : CapEntityIbnr, seqCapEntityIbnr : number): Observable<any> {
        let body = JSON.stringify(capEntityIbnr);
        return this.httpClient.patch(`${this.capEntityIbnrUrl}/${seqCapEntityIbnr}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCapEntityIbnr(seqCapEntityIbnr : number): Observable<any> {
        return this.httpClient.delete(`${this.capEntityIbnrUrl}/${seqCapEntityIbnr}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}