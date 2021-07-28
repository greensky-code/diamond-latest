/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SmpackageS } from '../api-models/smpackage-s.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SmpackageSService {

    private smpackageSUrl: string = `${environment.apiUrl}/smpackagess`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSmpackageSs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SmpackageS[]> {
        var url = `${this.smpackageSUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SmpackageS[]),
                catchError(this.sharedService.handleError))
    }

    getSmpackageS(namedobjectIdSequenceid : number): Observable<SmpackageS> {
        return this.httpClient.get(`${this.smpackageSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body as SmpackageS),
                catchError(this.sharedService.handleError))
    }

    getSmpackageSsCount(): Observable<number> {
        var url = `${this.smpackageSUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSmpackageS(smpackageS : SmpackageS): Observable<any> {
        let body = JSON.stringify(smpackageS);
        return this.httpClient.post(this.smpackageSUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSmpackageS(smpackageS : SmpackageS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smpackageS);
        return this.httpClient.put(`${this.smpackageSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSmpackageS(smpackageS : SmpackageS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smpackageS);
        return this.httpClient.patch(`${this.smpackageSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSmpackageS(namedobjectIdSequenceid : number): Observable<any> {
        return this.httpClient.delete(`${this.smpackageSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}