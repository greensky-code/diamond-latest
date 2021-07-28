/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AuthTypeMaster } from '../api-models/auth-type-master.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuthTypeMasterService {

    private authTypeMasterUrl: string = `${environment.apiUrl}/authtypemasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAuthTypeMasters(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AuthTypeMaster[]> {
        var url = `${this.authTypeMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AuthTypeMaster[]),
                catchError(this.sharedService.handleError))
    }

    getAuthTypeMaster(seqAuthType : number): Observable<AuthTypeMaster> {
        return this.httpClient.get(`${this.authTypeMasterUrl}/${seqAuthType}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthTypeMaster),
                catchError(this.sharedService.handleError))
    }

    getAuthTypeMastersCount(): Observable<number> {
        var url = `${this.authTypeMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createAuthTypeMaster(authTypeMaster : AuthTypeMaster): Observable<any> {
        let body = JSON.stringify(authTypeMaster);
        return this.httpClient.post(this.authTypeMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateAuthTypeMaster(authTypeMaster : AuthTypeMaster, seqAuthType : number): Observable<any> {
        let body = JSON.stringify(authTypeMaster);
        return this.httpClient.put(`${this.authTypeMasterUrl}/${seqAuthType}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateAuthTypeMaster(authTypeMaster : AuthTypeMaster, seqAuthType : number): Observable<any> {
        let body = JSON.stringify(authTypeMaster);
        return this.httpClient.patch(`${this.authTypeMasterUrl}/${seqAuthType}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteAuthTypeMaster(seqAuthType : number): Observable<any> {
        return this.httpClient.delete(`${this.authTypeMasterUrl}/${seqAuthType}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}