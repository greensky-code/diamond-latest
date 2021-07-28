/* Copyright (c) 2020 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {SharedService} from '../../shared/services/shared.service';
import {AuthProcedureRangeValue} from '../../api-models/authorization/auth-procedure-range-value.model';

@Injectable()
export class AuthProcedureRangeValueService {

    private authProcedureRangeValueUrl = `${environment.apiUrl}/authprocedurerangevalues`;
    private contentHeaders = new HttpHeaders();

    constructor(private httpClient: HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAuthProcedureRangeValues(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<AuthProcedureRangeValue[]> {
        let url = `${this.authProcedureRangeValueUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AuthProcedureRangeValue[]),
                catchError((error) => {
                    return this.sharedService.handleError(error)
                }))
    }

    getAuthProcedureRangeValue(authProcRangeId: string): Observable<AuthProcedureRangeValue> {
        return this.httpClient.get(`${this.authProcedureRangeValueUrl}/${authProcRangeId}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthProcedureRangeValue),
                catchError((error) => {
                    return this.sharedService.handleError(error)
                }))
    }

    getAuthProcedureRangeValuesCount(): Observable<number> {
        let url = `${this.authProcedureRangeValueUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error) => {
                    return this.sharedService.handleError(error)
                }))
    }

    findByAuthProcRangeId(authProcRangeId: string): Observable<AuthProcedureRangeValue[]> {
        return this.httpClient.get(`${this.authProcedureRangeValueUrl}/find-by-authprocrangeid/${authProcRangeId}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthProcedureRangeValue),
                catchError((error) => {
                    return this.sharedService.handleError(error)
                }))
    }


    createAuthProcedureRangeValue(authProcedureRangeValue: AuthProcedureRangeValue): Observable<any> {
        let body = JSON.stringify(authProcedureRangeValue);
        return this.httpClient.post(this.authProcedureRangeValueUrl, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error) => {
                    return this.sharedService.handleError(error)
                }))
    }

    updateAuthProcedureRangeValue(authProcedureRangeValue: AuthProcedureRangeValue, authProcRangeId: string): Observable<any> {
        let body = JSON.stringify(authProcedureRangeValue);
        return this.httpClient.put(`${this.authProcedureRangeValueUrl}/${authProcRangeId}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error) => {
                    return this.sharedService.handleError(error)
                }))
    }

    partiallyUpdateAuthProcedureRangeValue(authProcedureRangeValue: AuthProcedureRangeValue, authProcRangeId: string): Observable<any> {
        let body = JSON.stringify(authProcedureRangeValue);
        return this.httpClient.patch(`${this.authProcedureRangeValueUrl}/${authProcRangeId}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error) => {
                    return this.sharedService.handleError(error)
                }));
    }

    deleteAuthProcedureRangeValue(authProcRangeId: string): Observable<any> {
        return this.httpClient.delete(`${this.authProcedureRangeValueUrl}/${authProcRangeId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error) => {
                    return this.sharedService.handleError(error)
                }))
    }

    updateAuthProcedureRangeValueForm(apiRecords: AuthProcedureRangeValue[]) {
        let body = JSON.stringify(apiRecords);
        return this.httpClient.post(`${this.authProcedureRangeValueUrl}/updateAuthProcedureRangeValues`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error) => {
                    return this.sharedService.handleError(error)
                }))
    }
}
