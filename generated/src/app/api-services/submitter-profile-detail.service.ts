/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SubmitterProfileDetail } from '../api-models/submitter-profile-detail.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SubmitterProfileDetailService {

    private submitterProfileDetailUrl: string = `${environment.apiUrl}/submitterprofiledetails`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSubmitterProfileDetails(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SubmitterProfileDetail[]> {
        var url = `${this.submitterProfileDetailUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SubmitterProfileDetail[]),
                catchError(this.sharedService.handleError))
    }

    getSubmitterProfileDetail(submitterId : string): Observable<SubmitterProfileDetail> {
        return this.httpClient.get(`${this.submitterProfileDetailUrl}/${submitterId}`, {observe: 'response'})
            .pipe(map(response => response.body as SubmitterProfileDetail),
                catchError(this.sharedService.handleError))
    }

    getSubmitterProfileDetailsCount(): Observable<number> {
        var url = `${this.submitterProfileDetailUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySubmitterId(submitterId : string): Observable<SubmitterProfileDetail[]> {
        return this.httpClient.get(`${this.submitterProfileDetailUrl}/find-by-submitterid/${submitterId}`, {observe: 'response'})
            .pipe(map(response => response.body as SubmitterProfileDetail),
                catchError(this.sharedService.handleError))
    }




    createSubmitterProfileDetail(submitterProfileDetail : SubmitterProfileDetail): Observable<any> {
        let body = JSON.stringify(submitterProfileDetail);
        return this.httpClient.post(this.submitterProfileDetailUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSubmitterProfileDetail(submitterProfileDetail : SubmitterProfileDetail, submitterId : string): Observable<any> {
        let body = JSON.stringify(submitterProfileDetail);
        return this.httpClient.put(`${this.submitterProfileDetailUrl}/${submitterId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSubmitterProfileDetail(submitterProfileDetail : SubmitterProfileDetail, submitterId : string): Observable<any> {
        let body = JSON.stringify(submitterProfileDetail);
        return this.httpClient.patch(`${this.submitterProfileDetailUrl}/${submitterId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSubmitterProfileDetail(submitterId : string): Observable<any> {
        return this.httpClient.delete(`${this.submitterProfileDetailUrl}/${submitterId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}