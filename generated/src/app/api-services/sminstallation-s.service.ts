/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SminstallationS } from '../api-models/sminstallation-s.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SminstallationSService {

    private sminstallationSUrl: string = `${environment.apiUrl}/sminstallationss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSminstallationSs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SminstallationS[]> {
        var url = `${this.sminstallationSUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SminstallationS[]),
                catchError(this.sharedService.handleError))
    }

    getSminstallationS(namedobjectIdSequenceid : number): Observable<SminstallationS> {
        return this.httpClient.get(`${this.sminstallationSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body as SminstallationS),
                catchError(this.sharedService.handleError))
    }

    getSminstallationSsCount(): Observable<number> {
        var url = `${this.sminstallationSUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSminstallationS(sminstallationS : SminstallationS): Observable<any> {
        let body = JSON.stringify(sminstallationS);
        return this.httpClient.post(this.sminstallationSUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSminstallationS(sminstallationS : SminstallationS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(sminstallationS);
        return this.httpClient.put(`${this.sminstallationSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSminstallationS(sminstallationS : SminstallationS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(sminstallationS);
        return this.httpClient.patch(`${this.sminstallationSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSminstallationS(namedobjectIdSequenceid : number): Observable<any> {
        return this.httpClient.delete(`${this.sminstallationSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}