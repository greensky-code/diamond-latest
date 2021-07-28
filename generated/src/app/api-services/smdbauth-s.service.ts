/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SmdbauthS } from '../api-models/smdbauth-s.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SmdbauthSService {

    private smdbauthSUrl: string = `${environment.apiUrl}/smdbauthss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSmdbauthSs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SmdbauthS[]> {
        var url = `${this.smdbauthSUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SmdbauthS[]),
                catchError(this.sharedService.handleError))
    }

    getSmdbauthS(namedobjectIdSequenceid : number): Observable<SmdbauthS> {
        return this.httpClient.get(`${this.smdbauthSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body as SmdbauthS),
                catchError(this.sharedService.handleError))
    }

    getSmdbauthSsCount(): Observable<number> {
        var url = `${this.smdbauthSUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSmdbauthS(smdbauthS : SmdbauthS): Observable<any> {
        let body = JSON.stringify(smdbauthS);
        return this.httpClient.post(this.smdbauthSUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSmdbauthS(smdbauthS : SmdbauthS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smdbauthS);
        return this.httpClient.put(`${this.smdbauthSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSmdbauthS(smdbauthS : SmdbauthS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smdbauthS);
        return this.httpClient.patch(`${this.smdbauthSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSmdbauthS(namedobjectIdSequenceid : number): Observable<any> {
        return this.httpClient.delete(`${this.smdbauthSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}