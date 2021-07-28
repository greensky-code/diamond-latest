/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SystemParameter } from '../api-models/system-parameter.model';
import { environment } from '../../environments/environment';
import { SharedService } from '../shared/services/shared.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class SystemParameterService {

    private systemParameterUrl: string = `${environment.apiUrl}/systemparameters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient: HttpClient, private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSystemParameters(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<SystemParameter[]> {
        var url = `${this.systemParameterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as SystemParameter[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    getSystemParameter(parameterId: string): Observable<SystemParameter> {
        return this.httpClient.get(`${this.systemParameterUrl}/${parameterId}`, { observe: 'response' })
            .pipe(map(response => response.body as SystemParameter),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getSystemParametersCount(): Observable<number> {
        var url = `${this.systemParameterUrl}/count`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    createSystemParameter(systemParameter: SystemParameter): Observable<any> {
        let body = JSON.stringify(systemParameter);
        return this.httpClient.post(this.systemParameterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateSystemParameter(systemParameter: SystemParameter, parameterId: string): Observable<any> {
        let body = JSON.stringify(systemParameter);
        return this.httpClient.put(`${this.systemParameterUrl}/${parameterId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateSystemParameter(systemParameter: SystemParameter, parameterId: string): Observable<any> {
        let body = JSON.stringify(systemParameter);
        return this.httpClient.patch(`${this.systemParameterUrl}/${parameterId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteSystemParameter(parameterId: string): Observable<any> {
        return this.httpClient.delete(`${this.systemParameterUrl}/${parameterId}`, { observe: 'response' })
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
