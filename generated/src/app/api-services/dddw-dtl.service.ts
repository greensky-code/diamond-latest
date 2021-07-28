/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { DddwDtl } from '../api-models/dddw-dtl.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class DddwDtlService {

    private dddwDtlUrl: string = `${environment.apiUrl}/dddwdtls`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getDddwDtls(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<DddwDtl[]> {
        var url = `${this.dddwDtlUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as DddwDtl[]),
                catchError(this.sharedService.handleError))
    }

    getDddwDtl(dwName : string): Observable<DddwDtl> {
        return this.httpClient.get(`${this.dddwDtlUrl}/${dwName}`, {observe: 'response'})
            .pipe(map(response => response.body as DddwDtl),
                catchError(this.sharedService.handleError))
    }

    getDddwDtlsCount(): Observable<number> {
        var url = `${this.dddwDtlUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createDddwDtl(dddwDtl : DddwDtl): Observable<any> {
        let body = JSON.stringify(dddwDtl);
        return this.httpClient.post(this.dddwDtlUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateDddwDtl(dddwDtl : DddwDtl, dwName : string): Observable<any> {
        let body = JSON.stringify(dddwDtl);
        return this.httpClient.put(`${this.dddwDtlUrl}/${dwName}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateDddwDtl(dddwDtl : DddwDtl, dwName : string): Observable<any> {
        let body = JSON.stringify(dddwDtl);
        return this.httpClient.patch(`${this.dddwDtlUrl}/${dwName}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteDddwDtl(dwName : string): Observable<any> {
        return this.httpClient.delete(`${this.dddwDtlUrl}/${dwName}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}
