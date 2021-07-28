/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ObjectToken } from '../api-models/object-token.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ObjectTokenService {

    private objectTokenUrl: string = `${environment.apiUrl}/objecttokens`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getObjectTokens(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ObjectToken[]> {
        var url = `${this.objectTokenUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ObjectToken[]),
                catchError(this.sharedService.handleError))
    }

    getObjectToken(objectId : string): Observable<ObjectToken> {
        return this.httpClient.get(`${this.objectTokenUrl}/${objectId}`, {observe: 'response'})
            .pipe(map(response => response.body as ObjectToken),
                catchError(this.sharedService.handleError))
    }

    getObjectTokensCount(): Observable<number> {
        var url = `${this.objectTokenUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createObjectToken(objectToken : ObjectToken): Observable<any> {
        let body = JSON.stringify(objectToken);
        return this.httpClient.post(this.objectTokenUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateObjectToken(objectToken : ObjectToken, objectId : string): Observable<any> {
        let body = JSON.stringify(objectToken);
        return this.httpClient.put(`${this.objectTokenUrl}/${objectId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateObjectToken(objectToken : ObjectToken, objectId : string): Observable<any> {
        let body = JSON.stringify(objectToken);
        return this.httpClient.patch(`${this.objectTokenUrl}/${objectId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteObjectToken(objectId : string): Observable<any> {
        return this.httpClient.delete(`${this.objectTokenUrl}/${objectId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}