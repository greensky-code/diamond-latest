/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SmscheduleS } from '../api-models/smschedule-s.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SmscheduleSService {

    private smscheduleSUrl: string = `${environment.apiUrl}/smscheduless`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSmscheduleSs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SmscheduleS[]> {
        var url = `${this.smscheduleSUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SmscheduleS[]),
                catchError(this.sharedService.handleError))
    }

    getSmscheduleS(namedobjectIdSequenceid : number): Observable<SmscheduleS> {
        return this.httpClient.get(`${this.smscheduleSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body as SmscheduleS),
                catchError(this.sharedService.handleError))
    }

    getSmscheduleSsCount(): Observable<number> {
        var url = `${this.smscheduleSUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSmscheduleS(smscheduleS : SmscheduleS): Observable<any> {
        let body = JSON.stringify(smscheduleS);
        return this.httpClient.post(this.smscheduleSUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSmscheduleS(smscheduleS : SmscheduleS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smscheduleS);
        return this.httpClient.put(`${this.smscheduleSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSmscheduleS(smscheduleS : SmscheduleS, namedobjectIdSequenceid : number): Observable<any> {
        let body = JSON.stringify(smscheduleS);
        return this.httpClient.patch(`${this.smscheduleSUrl}/${namedobjectIdSequenceid}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSmscheduleS(namedobjectIdSequenceid : number): Observable<any> {
        return this.httpClient.delete(`${this.smscheduleSUrl}/${namedobjectIdSequenceid}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}