/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SmparalleloperationS } from '../api-models/smparalleloperation-s.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SmparalleloperationSService {

    private smparalleloperationSUrl: string = `${environment.apiUrl}/smparalleloperationss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSmparalleloperationSs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SmparalleloperationS[]> {
        var url = `${this.smparalleloperationSUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SmparalleloperationS[]),
                catchError(this.sharedService.handleError))
    }

    getSmparalleloperationS(namedobjectIdSequenceid : number): Observable<SmparalleloperationS> {
        return this.httpClient.get(`${this.smparalleloperationSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body as SmparalleloperationS),
                catchError(this.sharedService.handleError))
    }

    getSmparalleloperationSsCount(): Observable<number> {
        var url = `${this.smparalleloperationSUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSmparalleloperationS(smparalleloperationS : SmparalleloperationS): Observable<any> {
        let body = JSON.stringify(smparalleloperationS);
        return this.httpClient.post(this.smparalleloperationSUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSmparalleloperationS(smparalleloperationS : SmparalleloperationS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smparalleloperationS);
        return this.httpClient.put(`${this.smparalleloperationSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSmparalleloperationS(smparalleloperationS : SmparalleloperationS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smparalleloperationS);
        return this.httpClient.patch(`${this.smparalleloperationSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSmparalleloperationS(namedobjectIdSequenceid : number): Observable<any> {
        return this.httpClient.delete(`${this.smparalleloperationSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}