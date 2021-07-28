/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SecUserParamProfile } from '../api-models/sec-user-param-profile.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SecUserParamProfileService {

    private secUserParamProfileUrl: string = `${environment.apiUrl}/secuserparamprofiles`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSecUserParamProfiles(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SecUserParamProfile[]> {
        var url = `${this.secUserParamProfileUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SecUserParamProfile[]),
                catchError(this.sharedService.handleError))
    }

    getSecUserParamProfile(userId : string): Observable<SecUserParamProfile> {
        return this.httpClient.get(`${this.secUserParamProfileUrl}/${userId}`, {observe: 'response'})
            .pipe(map(response => response.body as SecUserParamProfile),
                catchError(this.sharedService.handleError))
    }

    getSecUserParamProfilesCount(): Observable<number> {
        var url = `${this.secUserParamProfileUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByUserId(userId : string): Observable<SecUserParamProfile[]> {
        return this.httpClient.get(`${this.secUserParamProfileUrl}/find-by-userid/${userId}`, {observe: 'response'})
            .pipe(map(response => response.body as SecUserParamProfile),
                catchError(this.sharedService.handleError))
    }




    createSecUserParamProfile(secUserParamProfile : SecUserParamProfile): Observable<any> {
        let body = JSON.stringify(secUserParamProfile);
        return this.httpClient.post(this.secUserParamProfileUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSecUserParamProfile(secUserParamProfile : SecUserParamProfile, userId : string): Observable<any> {
        let body = JSON.stringify(secUserParamProfile);
        return this.httpClient.put(`${this.secUserParamProfileUrl}/${userId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSecUserParamProfile(secUserParamProfile : SecUserParamProfile, userId : string): Observable<any> {
        let body = JSON.stringify(secUserParamProfile);
        return this.httpClient.patch(`${this.secUserParamProfileUrl}/${userId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSecUserParamProfile(userId : string): Observable<any> {
        return this.httpClient.delete(`${this.secUserParamProfileUrl}/${userId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}