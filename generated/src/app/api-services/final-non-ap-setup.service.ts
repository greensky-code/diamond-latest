/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { FinalNonApSetup } from '../api-models/final-non-ap-setup.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class FinalNonApSetupService {

    private finalNonApSetupUrl: string = `${environment.apiUrl}/finalnonapsetups`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getFinalNonApSetups(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<FinalNonApSetup[]> {
        var url = `${this.finalNonApSetupUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as FinalNonApSetup[]),
                catchError(this.sharedService.handleError))
    }

    getFinalNonApSetup(jobId : string): Observable<FinalNonApSetup> {
        return this.httpClient.get(`${this.finalNonApSetupUrl}/${jobId}`, {observe: 'response'})
            .pipe(map(response => response.body as FinalNonApSetup),
                catchError(this.sharedService.handleError))
    }

    getFinalNonApSetupsCount(): Observable<number> {
        var url = `${this.finalNonApSetupUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createFinalNonApSetup(finalNonApSetup : FinalNonApSetup): Observable<any> {
        let body = JSON.stringify(finalNonApSetup);
        return this.httpClient.post(this.finalNonApSetupUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateFinalNonApSetup(finalNonApSetup : FinalNonApSetup, jobId : string): Observable<any> {
        let body = JSON.stringify(finalNonApSetup);
        return this.httpClient.put(`${this.finalNonApSetupUrl}/${jobId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateFinalNonApSetup(finalNonApSetup : FinalNonApSetup, jobId : string): Observable<any> {
        let body = JSON.stringify(finalNonApSetup);
        return this.httpClient.patch(`${this.finalNonApSetupUrl}/${jobId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteFinalNonApSetup(jobId : string): Observable<any> {
        return this.httpClient.delete(`${this.finalNonApSetupUrl}/${jobId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}