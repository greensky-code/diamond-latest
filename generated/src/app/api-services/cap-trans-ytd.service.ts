/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CapTransYtd } from '../api-models/cap-trans-ytd.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CapTransYtdService {

    private capTransYtdUrl: string = `${environment.apiUrl}/captransytds`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCapTransYtds(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CapTransYtd[]> {
        var url = `${this.capTransYtdUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CapTransYtd[]),
                catchError(this.sharedService.handleError))
    }

    getCapTransYtd(seqCapTransYtd : number): Observable<CapTransYtd> {
        return this.httpClient.get(`${this.capTransYtdUrl}/${seqCapTransYtd}`, {observe: 'response'})
            .pipe(map(response => response.body as CapTransYtd),
                catchError(this.sharedService.handleError))
    }

    getCapTransYtdsCount(): Observable<number> {
        var url = `${this.capTransYtdUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCapTransYtd(capTransYtd : CapTransYtd): Observable<any> {
        let body = JSON.stringify(capTransYtd);
        return this.httpClient.post(this.capTransYtdUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCapTransYtd(capTransYtd : CapTransYtd, seqCapTransYtd : number): Observable<any> {
        let body = JSON.stringify(capTransYtd);
        return this.httpClient.put(`${this.capTransYtdUrl}/${seqCapTransYtd}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCapTransYtd(capTransYtd : CapTransYtd, seqCapTransYtd : number): Observable<any> {
        let body = JSON.stringify(capTransYtd);
        return this.httpClient.patch(`${this.capTransYtdUrl}/${seqCapTransYtd}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCapTransYtd(seqCapTransYtd : number): Observable<any> {
        return this.httpClient.delete(`${this.capTransYtdUrl}/${seqCapTransYtd}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}