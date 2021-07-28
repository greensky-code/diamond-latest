/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SmpServiceGroupDefn } from '../api-models/smp-service-group-defn.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SmpServiceGroupDefnService {

    private smpServiceGroupDefnUrl: string = `${environment.apiUrl}/smpservicegroupdefns`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSmpServiceGroupDefns(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SmpServiceGroupDefn[]> {
        var url = `${this.smpServiceGroupDefnUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SmpServiceGroupDefn[]),
                catchError(this.sharedService.handleError))
    }

    getSmpServiceGroupDefn(owner : string): Observable<SmpServiceGroupDefn> {
        return this.httpClient.get(`${this.smpServiceGroupDefnUrl}/${owner}`, {observe: 'response'})
            .pipe(map(response => response.body as SmpServiceGroupDefn),
                catchError(this.sharedService.handleError))
    }

    getSmpServiceGroupDefnsCount(): Observable<number> {
        var url = `${this.smpServiceGroupDefnUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSmpServiceGroupDefn(smpServiceGroupDefn : SmpServiceGroupDefn): Observable<any> {
        let body = JSON.stringify(smpServiceGroupDefn);
        return this.httpClient.post(this.smpServiceGroupDefnUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSmpServiceGroupDefn(smpServiceGroupDefn : SmpServiceGroupDefn, owner : string): Observable<any> {
        let body = JSON.stringify(smpServiceGroupDefn);
        return this.httpClient.put(`${this.smpServiceGroupDefnUrl}/${owner}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSmpServiceGroupDefn(smpServiceGroupDefn : SmpServiceGroupDefn, owner : string): Observable<any> {
        let body = JSON.stringify(smpServiceGroupDefn);
        return this.httpClient.patch(`${this.smpServiceGroupDefnUrl}/${owner}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSmpServiceGroupDefn(owner : string): Observable<any> {
        return this.httpClient.delete(`${this.smpServiceGroupDefnUrl}/${owner}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}