/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SubscIdChangeJobSetup } from '../api-models/subsc-id-change-job-setup.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SubscIdChangeJobSetupService {

    private subscIdChangeJobSetupUrl: string = `${environment.apiUrl}/subscidchangejobsetups`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSubscIdChangeJobSetups(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SubscIdChangeJobSetup[]> {
        var url = `${this.subscIdChangeJobSetupUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SubscIdChangeJobSetup[]),
                catchError(this.sharedService.handleError))
    }

    getSubscIdChangeJobSetup(seqSubidId : number): Observable<SubscIdChangeJobSetup> {
        return this.httpClient.get(`${this.subscIdChangeJobSetupUrl}/${seqSubidId}`, {observe: 'response'})
            .pipe(map(response => response.body as SubscIdChangeJobSetup),
                catchError(this.sharedService.handleError))
    }

    getSubscIdChangeJobSetupsCount(): Observable<number> {
        var url = `${this.subscIdChangeJobSetupUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSubscIdChangeJobSetup(subscIdChangeJobSetup : SubscIdChangeJobSetup): Observable<any> {
        let body = JSON.stringify(subscIdChangeJobSetup);
        return this.httpClient.post(this.subscIdChangeJobSetupUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSubscIdChangeJobSetup(subscIdChangeJobSetup : SubscIdChangeJobSetup, seqSubidId : number): Observable<any> {
        let body = JSON.stringify(subscIdChangeJobSetup);
        return this.httpClient.put(`${this.subscIdChangeJobSetupUrl}/${seqSubidId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSubscIdChangeJobSetup(subscIdChangeJobSetup : SubscIdChangeJobSetup, seqSubidId : number): Observable<any> {
        let body = JSON.stringify(subscIdChangeJobSetup);
        return this.httpClient.patch(`${this.subscIdChangeJobSetupUrl}/${seqSubidId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSubscIdChangeJobSetup(seqSubidId : number): Observable<any> {
        return this.httpClient.delete(`${this.subscIdChangeJobSetupUrl}/${seqSubidId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}