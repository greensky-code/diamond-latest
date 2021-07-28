/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SmpAutoDiscoveryParms } from '../api-models/smp-auto-discovery-parms.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SmpAutoDiscoveryParmsService {

    private smpAutoDiscoveryParmsUrl: string = `${environment.apiUrl}/smpautodiscoveryparmss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSmpAutoDiscoveryParmss(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SmpAutoDiscoveryParms[]> {
        var url = `${this.smpAutoDiscoveryParmsUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SmpAutoDiscoveryParms[]),
                catchError(this.sharedService.handleError))
    }

    getSmpAutoDiscoveryParms(owner : string): Observable<SmpAutoDiscoveryParms> {
        return this.httpClient.get(`${this.smpAutoDiscoveryParmsUrl}/${owner}`, {observe: 'response'})
            .pipe(map(response => response.body as SmpAutoDiscoveryParms),
                catchError(this.sharedService.handleError))
    }

    getSmpAutoDiscoveryParmssCount(): Observable<number> {
        var url = `${this.smpAutoDiscoveryParmsUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSmpAutoDiscoveryParms(smpAutoDiscoveryParms : SmpAutoDiscoveryParms): Observable<any> {
        let body = JSON.stringify(smpAutoDiscoveryParms);
        return this.httpClient.post(this.smpAutoDiscoveryParmsUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSmpAutoDiscoveryParms(smpAutoDiscoveryParms : SmpAutoDiscoveryParms, owner : string): Observable<any> {
        let body = JSON.stringify(smpAutoDiscoveryParms);
        return this.httpClient.put(`${this.smpAutoDiscoveryParmsUrl}/${owner}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSmpAutoDiscoveryParms(smpAutoDiscoveryParms : SmpAutoDiscoveryParms, owner : string): Observable<any> {
        let body = JSON.stringify(smpAutoDiscoveryParms);
        return this.httpClient.patch(`${this.smpAutoDiscoveryParmsUrl}/${owner}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSmpAutoDiscoveryParms(owner : string): Observable<any> {
        return this.httpClient.delete(`${this.smpAutoDiscoveryParmsUrl}/${owner}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}