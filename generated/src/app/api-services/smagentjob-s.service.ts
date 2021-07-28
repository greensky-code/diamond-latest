/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SmagentjobS } from '../api-models/smagentjob-s.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SmagentjobSService {

    private smagentjobSUrl: string = `${environment.apiUrl}/smagentjobss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSmagentjobSs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SmagentjobS[]> {
        var url = `${this.smagentjobSUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SmagentjobS[]),
                catchError(this.sharedService.handleError))
    }

    getSmagentjobS(namedobjectIdSequenceid : number): Observable<SmagentjobS> {
        return this.httpClient.get(`${this.smagentjobSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body as SmagentjobS),
                catchError(this.sharedService.handleError))
    }

    getSmagentjobSsCount(): Observable<number> {
        var url = `${this.smagentjobSUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSmagentjobS(smagentjobS : SmagentjobS): Observable<any> {
        let body = JSON.stringify(smagentjobS);
        return this.httpClient.post(this.smagentjobSUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSmagentjobS(smagentjobS : SmagentjobS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smagentjobS);
        return this.httpClient.put(`${this.smagentjobSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSmagentjobS(smagentjobS : SmagentjobS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smagentjobS);
        return this.httpClient.patch(`${this.smagentjobSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSmagentjobS(namedobjectIdSequenceid : number): Observable<any> {
        return this.httpClient.delete(`${this.smagentjobSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}