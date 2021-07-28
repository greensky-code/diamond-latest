/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SmfolderS } from '../api-models/smfolder-s.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SmfolderSService {

    private smfolderSUrl: string = `${environment.apiUrl}/smfolderss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSmfolderSs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SmfolderS[]> {
        var url = `${this.smfolderSUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SmfolderS[]),
                catchError(this.sharedService.handleError))
    }

    getSmfolderS(namedobjectIdSequenceid : number): Observable<SmfolderS> {
        return this.httpClient.get(`${this.smfolderSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body as SmfolderS),
                catchError(this.sharedService.handleError))
    }

    getSmfolderSsCount(): Observable<number> {
        var url = `${this.smfolderSUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSmfolderS(smfolderS : SmfolderS): Observable<any> {
        let body = JSON.stringify(smfolderS);
        return this.httpClient.post(this.smfolderSUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSmfolderS(smfolderS : SmfolderS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smfolderS);
        return this.httpClient.put(`${this.smfolderSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSmfolderS(smfolderS : SmfolderS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smfolderS);
        return this.httpClient.patch(`${this.smfolderSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSmfolderS(namedobjectIdSequenceid : number): Observable<any> {
        return this.httpClient.delete(`${this.smfolderSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}