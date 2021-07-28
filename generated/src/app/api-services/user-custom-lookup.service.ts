/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { UserCustomLookup } from '../api-models/user-custom-lookup.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class UserCustomLookupService {

    private userCustomLookupUrl: string = `${environment.apiUrl}/usercustomlookups`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getUserCustomLookups(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<UserCustomLookup[]> {
        var url = `${this.userCustomLookupUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as UserCustomLookup[]),
                catchError(this.sharedService.handleError))
    }

    getUserCustomLookup(userId : string): Observable<UserCustomLookup> {
        return this.httpClient.get(`${this.userCustomLookupUrl}/${userId}`, {observe: 'response'})
            .pipe(map(response => response.body as UserCustomLookup),
                catchError(this.sharedService.handleError))
    }

    getUserCustomLookupsCount(): Observable<number> {
        var url = `${this.userCustomLookupUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createUserCustomLookup(userCustomLookup : UserCustomLookup): Observable<any> {
        let body = JSON.stringify(userCustomLookup);
        return this.httpClient.post(this.userCustomLookupUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateUserCustomLookup(userCustomLookup : UserCustomLookup, userId : string): Observable<any> {
        let body = JSON.stringify(userCustomLookup);
        return this.httpClient.put(`${this.userCustomLookupUrl}/${userId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateUserCustomLookup(userCustomLookup : UserCustomLookup, userId : string): Observable<any> {
        let body = JSON.stringify(userCustomLookup);
        return this.httpClient.patch(`${this.userCustomLookupUrl}/${userId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteUserCustomLookup(userId : string): Observable<any> {
        return this.httpClient.delete(`${this.userCustomLookupUrl}/${userId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}