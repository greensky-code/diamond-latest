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
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getAuthTypeMaster(seqAuthType : number): Observable<AuthTypeMaster> {
        return this.httpClient.get(`${this.authTypeMasterUrl}/${seqAuthType}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthTypeMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getAuthTypeMastersCount(): Observable<number> {
        var url = `${this.authTypeMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }





    createAuthTypeMaster(authTypeMaster : AuthTypeMaster): Observable<any> {
        let body = JSON.stringify(authTypeMaster);
        return this.httpClient.post(this.authTypeMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateAuthTypeMaster(authTypeMaster : AuthTypeMaster, seqAuthType : number): Observable<any> {
        let body = JSON.stringify(authTypeMaster);
        return this.httpClient.put(`${this.authTypeMasterUrl}/${seqAuthType}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateAuthTypeMaster(authTypeMaster : AuthTypeMaster, seqAuthType : number): Observable<any> {
        let body = JSON.stringify(authTypeMaster);
        return this.httpClient.patch(`${this.authTypeMasterUrl}/${seqAuthType}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteAuthTypeMaster(seqAuthType : number): Observable<any> {
        return this.httpClient.delete(`${this.authTypeMasterUrl}/${seqAuthType}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getDropdownData(): Observable<any> {
        return this.httpClient.get(`${this.authTypeMasterUrl}/drop-downs`, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
