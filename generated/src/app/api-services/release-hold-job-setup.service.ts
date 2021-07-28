/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ReleaseHoldJobSetup } from '../api-models/release-hold-job-setup.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ReleaseHoldJobSetupService {

    private releaseHoldJobSetupUrl: string = `${environment.apiUrl}/releaseholdjobsetups`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getReleaseHoldJobSetups(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ReleaseHoldJobSetup[]> {
        var url = `${this.releaseHoldJobSetupUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ReleaseHoldJobSetup[]),
                catchError(this.sharedService.handleError))
    }

    getReleaseHoldJobSetup(seqRhjobId : number): Observable<ReleaseHoldJobSetup> {
        return this.httpClient.get(`${this.releaseHoldJobSetupUrl}/${seqRhjobId}`, {observe: 'response'})
            .pipe(map(response => response.body as ReleaseHoldJobSetup),
                catchError(this.sharedService.handleError))
    }

    getReleaseHoldJobSetupsCount(): Observable<number> {
        var url = `${this.releaseHoldJobSetupUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createReleaseHoldJobSetup(releaseHoldJobSetup : ReleaseHoldJobSetup): Observable<any> {
        let body = JSON.stringify(releaseHoldJobSetup);
        return this.httpClient.post(this.releaseHoldJobSetupUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateReleaseHoldJobSetup(releaseHoldJobSetup : ReleaseHoldJobSetup, seqRhjobId : number): Observable<any> {
        let body = JSON.stringify(releaseHoldJobSetup);
        return this.httpClient.put(`${this.releaseHoldJobSetupUrl}/${seqRhjobId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateReleaseHoldJobSetup(releaseHoldJobSetup : ReleaseHoldJobSetup, seqRhjobId : number): Observable<any> {
        let body = JSON.stringify(releaseHoldJobSetup);
        return this.httpClient.patch(`${this.releaseHoldJobSetupUrl}/${seqRhjobId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteReleaseHoldJobSetup(seqRhjobId : number): Observable<any> {
        return this.httpClient.delete(`${this.releaseHoldJobSetupUrl}/${seqRhjobId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}