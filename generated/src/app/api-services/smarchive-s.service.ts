/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SmarchiveS } from '../api-models/smarchive-s.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SmarchiveSService {

    private smarchiveSUrl: string = `${environment.apiUrl}/smarchivess`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSmarchiveSs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SmarchiveS[]> {
        var url = `${this.smarchiveSUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SmarchiveS[]),
                catchError(this.sharedService.handleError))
    }

    getSmarchiveS(namedobjectIdSequenceid : number): Observable<SmarchiveS> {
        return this.httpClient.get(`${this.smarchiveSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body as SmarchiveS),
                catchError(this.sharedService.handleError))
    }

    getSmarchiveSsCount(): Observable<number> {
        var url = `${this.smarchiveSUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSmarchiveS(smarchiveS : SmarchiveS): Observable<any> {
        let body = JSON.stringify(smarchiveS);
        return this.httpClient.post(this.smarchiveSUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSmarchiveS(smarchiveS : SmarchiveS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smarchiveS);
        return this.httpClient.put(`${this.smarchiveSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSmarchiveS(smarchiveS : SmarchiveS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smarchiveS);
        return this.httpClient.patch(`${this.smarchiveSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSmarchiveS(namedobjectIdSequenceid : number): Observable<any> {
        return this.httpClient.delete(`${this.smarchiveSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}