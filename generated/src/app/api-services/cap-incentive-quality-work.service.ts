/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CapIncentiveQualityWork } from '../api-models/cap-incentive-quality-work.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CapIncentiveQualityWorkService {

    private capIncentiveQualityWorkUrl: string = `${environment.apiUrl}/capincentivequalityworks`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCapIncentiveQualityWorks(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CapIncentiveQualityWork[]> {
        var url = `${this.capIncentiveQualityWorkUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CapIncentiveQualityWork[]),
                catchError(this.sharedService.handleError))
    }

    getCapIncentiveQualityWork(seqCapIncentQltyWork : number): Observable<CapIncentiveQualityWork> {
        return this.httpClient.get(`${this.capIncentiveQualityWorkUrl}/${seqCapIncentQltyWork}`, {observe: 'response'})
            .pipe(map(response => response.body as CapIncentiveQualityWork),
                catchError(this.sharedService.handleError))
    }

    getCapIncentiveQualityWorksCount(): Observable<number> {
        var url = `${this.capIncentiveQualityWorkUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqQualityPgm(seqQualityPgm : number): Observable<CapIncentiveQualityWork[]> {
        return this.httpClient.get(`${this.capIncentiveQualityWorkUrl}/find-by-seqqualitypgm/${seqQualityPgm}`, {observe: 'response'})
            .pipe(map(response => response.body as CapIncentiveQualityWork),
                catchError(this.sharedService.handleError))
    }
    findBySeqIncentiveRule(seqIncentiveRule : number): Observable<CapIncentiveQualityWork[]> {
        return this.httpClient.get(`${this.capIncentiveQualityWorkUrl}/find-by-seqincentiverule/${seqIncentiveRule}`, {observe: 'response'})
            .pipe(map(response => response.body as CapIncentiveQualityWork),
                catchError(this.sharedService.handleError))
    }




    createCapIncentiveQualityWork(capIncentiveQualityWork : CapIncentiveQualityWork): Observable<any> {
        let body = JSON.stringify(capIncentiveQualityWork);
        return this.httpClient.post(this.capIncentiveQualityWorkUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCapIncentiveQualityWork(capIncentiveQualityWork : CapIncentiveQualityWork, seqCapIncentQltyWork : number): Observable<any> {
        let body = JSON.stringify(capIncentiveQualityWork);
        return this.httpClient.put(`${this.capIncentiveQualityWorkUrl}/${seqCapIncentQltyWork}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCapIncentiveQualityWork(capIncentiveQualityWork : CapIncentiveQualityWork, seqCapIncentQltyWork : number): Observable<any> {
        let body = JSON.stringify(capIncentiveQualityWork);
        return this.httpClient.patch(`${this.capIncentiveQualityWorkUrl}/${seqCapIncentQltyWork}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCapIncentiveQualityWork(seqCapIncentQltyWork : number): Observable<any> {
        return this.httpClient.delete(`${this.capIncentiveQualityWorkUrl}/${seqCapIncentQltyWork}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}