/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SmdatabaseS } from '../api-models/smdatabase-s.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SmdatabaseSService {

    private smdatabaseSUrl: string = `${environment.apiUrl}/smdatabasess`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSmdatabaseSs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SmdatabaseS[]> {
        var url = `${this.smdatabaseSUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SmdatabaseS[]),
                catchError(this.sharedService.handleError))
    }

    getSmdatabaseS(namedobjectIdSequenceid : number): Observable<SmdatabaseS> {
        return this.httpClient.get(`${this.smdatabaseSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body as SmdatabaseS),
                catchError(this.sharedService.handleError))
    }

    getSmdatabaseSsCount(): Observable<number> {
        var url = `${this.smdatabaseSUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSmdatabaseS(smdatabaseS : SmdatabaseS): Observable<any> {
        let body = JSON.stringify(smdatabaseS);
        return this.httpClient.post(this.smdatabaseSUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSmdatabaseS(smdatabaseS : SmdatabaseS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smdatabaseS);
        return this.httpClient.put(`${this.smdatabaseSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSmdatabaseS(smdatabaseS : SmdatabaseS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smdatabaseS);
        return this.httpClient.patch(`${this.smdatabaseSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSmdatabaseS(namedobjectIdSequenceid : number): Observable<any> {
        return this.httpClient.delete(`${this.smdatabaseSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}