/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AuthTypeDetail } from '../api-models/auth-type-detail.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuthTypeDetailService {

    private authTypeDetailUrl: string = `${environment.apiUrl}/authtypedetails`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAuthTypeDetails(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AuthTypeDetail[]> {
        var url = `${this.authTypeDetailUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AuthTypeDetail[]),
                catchError(this.sharedService.handleError))
    }

    getAuthTypeDetail(seqAuthType : number): Observable<AuthTypeDetail> {
        return this.httpClient.get(`${this.authTypeDetailUrl}/${seqAuthType}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthTypeDetail),
                catchError(this.sharedService.handleError))
    }

    getAuthTypeDetailsCount(): Observable<number> {
        var url = `${this.authTypeDetailUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqAuthType(seqAuthType : number): Observable<AuthTypeDetail[]> {
        return this.httpClient.get(`${this.authTypeDetailUrl}/find-by-seqauthtype/${seqAuthType}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthTypeDetail),
                catchError(this.sharedService.handleError))
    }




    createAuthTypeDetail(authTypeDetail : AuthTypeDetail): Observable<any> {
        let body = JSON.stringify(authTypeDetail);
        return this.httpClient.post(this.authTypeDetailUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateAuthTypeDetail(authTypeDetail : AuthTypeDetail, seqAuthType : number): Observable<any> {
        let body = JSON.stringify(authTypeDetail);
        return this.httpClient.put(`${this.authTypeDetailUrl}/${seqAuthType}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateAuthTypeDetail(authTypeDetail : AuthTypeDetail, seqAuthType : number): Observable<any> {
        let body = JSON.stringify(authTypeDetail);
        return this.httpClient.patch(`${this.authTypeDetailUrl}/${seqAuthType}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteAuthTypeDetail(seqAuthType : number): Observable<any> {
        return this.httpClient.delete(`${this.authTypeDetailUrl}/${seqAuthType}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}