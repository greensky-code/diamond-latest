/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { UserDefinedValdtCodes } from '../api-models/user-defined-valdt-codes.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class UserDefinedValdtCodesService {

    private userDefinedValdtCodesUrl: string = `${environment.apiUrl}/userdefinedvaldtcodeses`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getUserDefinedValdtCodeses(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<UserDefinedValdtCodes[]> {
        var url = `${this.userDefinedValdtCodesUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as UserDefinedValdtCodes[]),
                catchError(this.sharedService.handleError))
    }

    getUserDefinedValdtCodes(validatedTableName : string): Observable<UserDefinedValdtCodes> {
        return this.httpClient.get(`${this.userDefinedValdtCodesUrl}/${validatedTableName}`, {observe: 'response'})
            .pipe(map(response => response.body as UserDefinedValdtCodes),
                catchError(this.sharedService.handleError))
    }

    getUserDefinedValdtCodesesCount(): Observable<number> {
        var url = `${this.userDefinedValdtCodesUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createUserDefinedValdtCodes(userDefinedValdtCodes : UserDefinedValdtCodes): Observable<any> {
        let body = JSON.stringify(userDefinedValdtCodes);
        return this.httpClient.post(this.userDefinedValdtCodesUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateUserDefinedValdtCodes(userDefinedValdtCodes : UserDefinedValdtCodes, validatedTableName : string): Observable<any> {
        let body = JSON.stringify(userDefinedValdtCodes);
        return this.httpClient.put(`${this.userDefinedValdtCodesUrl}/${validatedTableName}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateUserDefinedValdtCodes(userDefinedValdtCodes : UserDefinedValdtCodes, validatedTableName : string): Observable<any> {
        let body = JSON.stringify(userDefinedValdtCodes);
        return this.httpClient.patch(`${this.userDefinedValdtCodesUrl}/${validatedTableName}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteUserDefinedValdtCodes(validatedTableName : string): Observable<any> {
        return this.httpClient.delete(`${this.userDefinedValdtCodesUrl}/${validatedTableName}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}