/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SmpJob } from '../api-models/smp-job.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SmpJobService {

    private smpJobUrl: string = `${environment.apiUrl}/smpjobs`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSmpJobs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SmpJob[]> {
        var url = `${this.smpJobUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SmpJob[]),
                catchError(this.sharedService.handleError))
    }

    getSmpJob(id : number): Observable<SmpJob> {
        return this.httpClient.get(`${this.smpJobUrl}/${id}`, {observe: 'response'})
            .pipe(map(response => response.body as SmpJob),
                catchError(this.sharedService.handleError))
    }

    getSmpJobsCount(): Observable<number> {
        var url = `${this.smpJobUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSmpJob(smpJob : SmpJob): Observable<any> {
        let body = JSON.stringify(smpJob);
        return this.httpClient.post(this.smpJobUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSmpJob(smpJob : SmpJob, id : number): Observable<any> {
        let body = JSON.stringify(smpJob);
        return this.httpClient.put(`${this.smpJobUrl}/${id}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSmpJob(smpJob : SmpJob, id : number): Observable<any> {
        let body = JSON.stringify(smpJob);
        return this.httpClient.patch(`${this.smpJobUrl}/${id}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSmpJob(id : number): Observable<any> {
        return this.httpClient.delete(`${this.smpJobUrl}/${id}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}