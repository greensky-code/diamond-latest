/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { UserDefinedAttributes } from '../api-models/user-defined-attributes.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class UserDefinedAttributesService {

    private userDefinedAttributesUrl: string = `${environment.apiUrl}/userdefinedattributeses`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getUserDefinedAttributeses(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<UserDefinedAttributes[]> {
        var url = `${this.userDefinedAttributesUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as UserDefinedAttributes[]),
                catchError(this.sharedService.handleError))
    }

    getUserDefinedAttributes(winId : string): Observable<UserDefinedAttributes> {
        return this.httpClient.get(`${this.userDefinedAttributesUrl}/${winId}`, {observe: 'response'})
            .pipe(map(response => response.body as UserDefinedAttributes),
                catchError(this.sharedService.handleError))
    }

    getUserDefinedAttributesesCount(): Observable<number> {
        var url = `${this.userDefinedAttributesUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createUserDefinedAttributes(userDefinedAttributes : UserDefinedAttributes): Observable<any> {
        let body = JSON.stringify(userDefinedAttributes);
        return this.httpClient.post(this.userDefinedAttributesUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateUserDefinedAttributes(userDefinedAttributes : UserDefinedAttributes,columnName:string, dataWindowId:string, winId : string): Observable<any> {
        let body = JSON.stringify(userDefinedAttributes);
        return this.httpClient.put(`${this.userDefinedAttributesUrl}/${columnName}/${dataWindowId}/${winId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateUserDefinedAttributes(userDefinedAttributes : UserDefinedAttributes, winId : string): Observable<any> {
        let body = JSON.stringify(userDefinedAttributes);
        return this.httpClient.patch(`${this.userDefinedAttributesUrl}/${winId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteUserDefinedAttributes(winId : string): Observable<any> {
        return this.httpClient.delete(`${this.userDefinedAttributesUrl}/${winId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}