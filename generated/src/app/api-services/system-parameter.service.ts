/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SystemParameter } from '../api-models/system-parameter.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SystemParameterService {

    private systemParameterUrl: string = `${environment.apiUrl}/systemparameters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSystemParameters(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SystemParameter[]> {
        var url = `${this.systemParameterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SystemParameter[]),
                catchError(this.sharedService.handleError))
    }

    getSystemParameter(parameterId : string): Observable<SystemParameter> {
        return this.httpClient.get(`${this.systemParameterUrl}/${parameterId}`, {observe: 'response'})
            .pipe(map(response => response.body as SystemParameter),
                catchError(this.sharedService.handleError))
    }

    getSystemParametersCount(): Observable<number> {
        var url = `${this.systemParameterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSystemParameter(systemParameter : SystemParameter): Observable<any> {
        let body = JSON.stringify(systemParameter);
        return this.httpClient.post(this.systemParameterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSystemParameter(systemParameter : SystemParameter, parameterId : string): Observable<any> {
        let body = JSON.stringify(systemParameter);
        return this.httpClient.put(`${this.systemParameterUrl}/${parameterId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSystemParameter(systemParameter : SystemParameter, parameterId : string): Observable<any> {
        let body = JSON.stringify(systemParameter);
        return this.httpClient.patch(`${this.systemParameterUrl}/${parameterId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSystemParameter(parameterId : string): Observable<any> {
        return this.httpClient.delete(`${this.systemParameterUrl}/${parameterId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}