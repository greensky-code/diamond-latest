/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SubmitterProfileMaster } from '../api-models/submitter-profile-master.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SubmitterProfileMasterService {

    private submitterProfileMasterUrl: string = `${environment.apiUrl}/submitterprofilemasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSubmitterProfileMasters(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SubmitterProfileMaster[]> {
        var url = `${this.submitterProfileMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SubmitterProfileMaster[]),
                catchError(this.sharedService.handleError))
    }

    getSubmitterProfileMaster(submitterId : string): Observable<SubmitterProfileMaster> {
        return this.httpClient.get(`${this.submitterProfileMasterUrl}/${submitterId}`, {observe: 'response'})
            .pipe(map(response => response.body as SubmitterProfileMaster),
                catchError(this.sharedService.handleError))
    }

    getSubmitterProfileMastersCount(): Observable<number> {
        var url = `${this.submitterProfileMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByContactTitle(contactTitle : string): Observable<SubmitterProfileMaster[]> {
        return this.httpClient.get(`${this.submitterProfileMasterUrl}/find-by-contacttitle/${contactTitle}`, {observe: 'response'})
            .pipe(map(response => response.body as SubmitterProfileMaster),
                catchError(this.sharedService.handleError))
    }




    createSubmitterProfileMaster(submitterProfileMaster : SubmitterProfileMaster): Observable<any> {
        let body = JSON.stringify(submitterProfileMaster);
        return this.httpClient.post(this.submitterProfileMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSubmitterProfileMaster(submitterProfileMaster : SubmitterProfileMaster, submitterId : string): Observable<any> {
        let body = JSON.stringify(submitterProfileMaster);
        return this.httpClient.put(`${this.submitterProfileMasterUrl}/${submitterId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSubmitterProfileMaster(submitterProfileMaster : SubmitterProfileMaster, submitterId : string): Observable<any> {
        let body = JSON.stringify(submitterProfileMaster);
        return this.httpClient.patch(`${this.submitterProfileMasterUrl}/${submitterId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSubmitterProfileMaster(submitterId : string): Observable<any> {
        return this.httpClient.delete(`${this.submitterProfileMasterUrl}/${submitterId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}