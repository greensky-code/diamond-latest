/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SmpAdParms } from '../api-models/smp-ad-parms.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SmpAdParmsService {

    private smpAdParmsUrl: string = `${environment.apiUrl}/smpadparmss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSmpAdParmss(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SmpAdParms[]> {
        var url = `${this.smpAdParmsUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SmpAdParms[]),
                catchError(this.sharedService.handleError))
    }

    getSmpAdParms(owner : string): Observable<SmpAdParms> {
        return this.httpClient.get(`${this.smpAdParmsUrl}/${owner}`, {observe: 'response'})
            .pipe(map(response => response.body as SmpAdParms),
                catchError(this.sharedService.handleError))
    }

    getSmpAdParmssCount(): Observable<number> {
        var url = `${this.smpAdParmsUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSmpAdParms(smpAdParms : SmpAdParms): Observable<any> {
        let body = JSON.stringify(smpAdParms);
        return this.httpClient.post(this.smpAdParmsUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSmpAdParms(smpAdParms : SmpAdParms, owner : string): Observable<any> {
        let body = JSON.stringify(smpAdParms);
        return this.httpClient.put(`${this.smpAdParmsUrl}/${owner}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSmpAdParms(smpAdParms : SmpAdParms, owner : string): Observable<any> {
        let body = JSON.stringify(smpAdParms);
        return this.httpClient.patch(`${this.smpAdParmsUrl}/${owner}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSmpAdParms(owner : string): Observable<any> {
        return this.httpClient.delete(`${this.smpAdParmsUrl}/${owner}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}