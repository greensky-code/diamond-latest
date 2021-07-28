/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SystemCodeType } from '../api-models/system-code-type.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SystemCodeTypeService {

    private systemCodeTypeUrl: string = `${environment.apiUrl}/systemcodetypes`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSystemCodeTypes(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SystemCodeType[]> {
        var url = `${this.systemCodeTypeUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SystemCodeType[]),
                catchError(this.sharedService.handleError))
    }

    getSystemCodeType(systemCodeType : string): Observable<SystemCodeType> {
        return this.httpClient.get(`${this.systemCodeTypeUrl}/${systemCodeType}`, {observe: 'response'})
            .pipe(map(response => response.body as SystemCodeType),
                catchError(this.sharedService.handleError))
    }

    getSystemCodeTypesCount(): Observable<number> {
        var url = `${this.systemCodeTypeUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSystemCodeType(systemCodeType : SystemCodeType): Observable<any> {
        let body = JSON.stringify(systemCodeType);
        return this.httpClient.post(this.systemCodeTypeUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSystemCodeType(systemCodeType : SystemCodeType, systemCodeType : string): Observable<any> {
        let body = JSON.stringify(systemCodeType);
        return this.httpClient.put(`${this.systemCodeTypeUrl}/${systemCodeType}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSystemCodeType(systemCodeType : SystemCodeType, systemCodeType : string): Observable<any> {
        let body = JSON.stringify(systemCodeType);
        return this.httpClient.patch(`${this.systemCodeTypeUrl}/${systemCodeType}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSystemCodeType(systemCodeType : string): Observable<any> {
        return this.httpClient.delete(`${this.systemCodeTypeUrl}/${systemCodeType}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}