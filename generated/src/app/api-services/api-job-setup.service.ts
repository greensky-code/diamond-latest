/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ApiJobSetup } from '../api-models/api-job-setup.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ApiJobSetupService {

    private apiJobSetupUrl: string = `${environment.apiUrl}/apijobsetups`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getApiJobSetups(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ApiJobSetup[]> {
        var url = `${this.apiJobSetupUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ApiJobSetup[]),
                catchError(this.sharedService.handleError))
    }

    getApiJobSetup(seqJobId : number): Observable<ApiJobSetup> {
        return this.httpClient.get(`${this.apiJobSetupUrl}/${seqJobId}`, {observe: 'response'})
            .pipe(map(response => response.body as ApiJobSetup),
                catchError(this.sharedService.handleError))
    }

    getApiJobSetupsCount(): Observable<number> {
        var url = `${this.apiJobSetupUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createApiJobSetup(apiJobSetup : ApiJobSetup): Observable<any> {
        let body = JSON.stringify(apiJobSetup);
        return this.httpClient.post(this.apiJobSetupUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateApiJobSetup(apiJobSetup : ApiJobSetup, seqJobId : number): Observable<any> {
        let body = JSON.stringify(apiJobSetup);
        return this.httpClient.put(`${this.apiJobSetupUrl}/${seqJobId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateApiJobSetup(apiJobSetup : ApiJobSetup, seqJobId : number): Observable<any> {
        let body = JSON.stringify(apiJobSetup);
        return this.httpClient.patch(`${this.apiJobSetupUrl}/${seqJobId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteApiJobSetup(seqJobId : number): Observable<any> {
        return this.httpClient.delete(`${this.apiJobSetupUrl}/${seqJobId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}