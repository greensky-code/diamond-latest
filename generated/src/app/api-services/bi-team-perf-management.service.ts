/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { BiTeamPerfManagement } from '../api-models/bi-team-perf-management.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class BiTeamPerfManagementService {

    private biTeamPerfManagementUrl: string = `${environment.apiUrl}/biteamperfmanagements`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getBiTeamPerfManagements(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<BiTeamPerfManagement[]> {
        var url = `${this.biTeamPerfManagementUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as BiTeamPerfManagement[]),
                catchError(this.sharedService.handleError))
    }

    getBiTeamPerfManagement(issueId : number): Observable<BiTeamPerfManagement> {
        return this.httpClient.get(`${this.biTeamPerfManagementUrl}/${issueId}`, {observe: 'response'})
            .pipe(map(response => response.body as BiTeamPerfManagement),
                catchError(this.sharedService.handleError))
    }

    getBiTeamPerfManagementsCount(): Observable<number> {
        var url = `${this.biTeamPerfManagementUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createBiTeamPerfManagement(biTeamPerfManagement : BiTeamPerfManagement): Observable<any> {
        let body = JSON.stringify(biTeamPerfManagement);
        return this.httpClient.post(this.biTeamPerfManagementUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateBiTeamPerfManagement(biTeamPerfManagement : BiTeamPerfManagement, issueId : number): Observable<any> {
        let body = JSON.stringify(biTeamPerfManagement);
        return this.httpClient.put(`${this.biTeamPerfManagementUrl}/${issueId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateBiTeamPerfManagement(biTeamPerfManagement : BiTeamPerfManagement, issueId : number): Observable<any> {
        let body = JSON.stringify(biTeamPerfManagement);
        return this.httpClient.patch(`${this.biTeamPerfManagementUrl}/${issueId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteBiTeamPerfManagement(issueId : number): Observable<any> {
        return this.httpClient.delete(`${this.biTeamPerfManagementUrl}/${issueId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}