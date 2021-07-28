/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CheckClearVoidSetup } from '../api-models/check-clear-void-setup.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class CheckClearVoidSetupService {

    private checkClearVoidSetupUrl: string = `${environment.apiUrl}/checkclearvoidsetups`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCheckClearVoidSetups(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CheckClearVoidSetup[]> {
        var url = `${this.checkClearVoidSetupUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CheckClearVoidSetup[]),
                catchError(this.sharedService.handleError))
    }

    getCheckClearVoidSetup(jobId : string): Observable<CheckClearVoidSetup> {
        return this.httpClient.get(`${this.checkClearVoidSetupUrl}/${jobId}`, {observe: 'response'})
            .pipe(map(response => response.body as CheckClearVoidSetup),
                catchError(this.sharedService.handleError))
    }

    getCheckClearVoidSetupsCount(): Observable<number> {
        var url = `${this.checkClearVoidSetupUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCheckClearVoidSetup(checkClearVoidSetup : CheckClearVoidSetup): Observable<any> {
        let body = JSON.stringify(checkClearVoidSetup);
        return this.httpClient.post(this.checkClearVoidSetupUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCheckClearVoidSetup(checkClearVoidSetup : CheckClearVoidSetup, jobId : string): Observable<any> {
        let body = JSON.stringify(checkClearVoidSetup);
        return this.httpClient.put(`${this.checkClearVoidSetupUrl}/${jobId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCheckClearVoidSetup(checkClearVoidSetup : CheckClearVoidSetup, jobId : string): Observable<any> {
        let body = JSON.stringify(checkClearVoidSetup);
        return this.httpClient.patch(`${this.checkClearVoidSetupUrl}/${jobId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCheckClearVoidSetup(jobId : string): Observable<any> {
        return this.httpClient.delete(`${this.checkClearVoidSetupUrl}/${jobId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}