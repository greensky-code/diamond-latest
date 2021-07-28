/* Copyright (c) 2020 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {catchError, map} from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {SharedService} from "../../shared/services/shared.service";
import {SecUserParamProfile} from "../../api-models/security/sec-user-param-profile.model";

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
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getSecUserParamProfile(userId : string): Observable<SecUserParamProfile> {
        return this.httpClient.get(`${this.secUserParamProfileUrl}/${userId}`, {observe: 'response'})
            .pipe(map(response => response.body as SecUserParamProfile),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getSecUserParamProfilesCount(): Observable<number> {
        var url = `${this.secUserParamProfileUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByUserId(userId : string): Observable<SecUserParamProfile[]> {
        return this.httpClient.get(`${this.secUserParamProfileUrl}/find-by-userid/${userId}`, {observe: 'response'})
            .pipe(map(response => response.body as SecUserParamProfile),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }




    createSecUserParamProfile(secUserParamProfile : SecUserParamProfile): Observable<any> {
        let body = JSON.stringify(secUserParamProfile);
        return this.httpClient.post(this.secUserParamProfileUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateSecUserParamProfile(secUserParamProfile : SecUserParamProfile, userId : string): Observable<any> {
        let body = JSON.stringify(secUserParamProfile);
        return this.httpClient.put(`${this.secUserParamProfileUrl}/${userId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateSecUserParamProfile(secUserParamProfile : SecUserParamProfile, userId : string): Observable<any> {
        let body = JSON.stringify(secUserParamProfile);
        return this.httpClient.patch(`${this.secUserParamProfileUrl}/${userId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteSecUserParamProfile(userId : string): Observable<any> {
        return this.httpClient.delete(`${this.secUserParamProfileUrl}/${userId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
