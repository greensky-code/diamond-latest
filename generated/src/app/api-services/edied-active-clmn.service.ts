/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { EdiedActiveClmn } from '../api-models/edied-active-clmn.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class EdiedActiveClmnService {

    private ediedActiveClmnUrl: string = `${environment.apiUrl}/ediedactiveclmns`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getEdiedActiveClmns(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<EdiedActiveClmn[]> {
        var url = `${this.ediedActiveClmnUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as EdiedActiveClmn[]),
                catchError(this.sharedService.handleError))
    }

    getEdiedActiveClmn(controlFileName : string): Observable<EdiedActiveClmn> {
        return this.httpClient.get(`${this.ediedActiveClmnUrl}/${controlFileName}`, {observe: 'response'})
            .pipe(map(response => response.body as EdiedActiveClmn),
                catchError(this.sharedService.handleError))
    }

    getEdiedActiveClmnsCount(): Observable<number> {
        var url = `${this.ediedActiveClmnUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createEdiedActiveClmn(ediedActiveClmn : EdiedActiveClmn): Observable<any> {
        let body = JSON.stringify(ediedActiveClmn);
        return this.httpClient.post(this.ediedActiveClmnUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateEdiedActiveClmn(ediedActiveClmn : EdiedActiveClmn, controlFileName : string): Observable<any> {
        let body = JSON.stringify(ediedActiveClmn);
        return this.httpClient.put(`${this.ediedActiveClmnUrl}/${controlFileName}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateEdiedActiveClmn(ediedActiveClmn : EdiedActiveClmn, controlFileName : string): Observable<any> {
        let body = JSON.stringify(ediedActiveClmn);
        return this.httpClient.patch(`${this.ediedActiveClmnUrl}/${controlFileName}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteEdiedActiveClmn(controlFileName : string): Observable<any> {
        return this.httpClient.delete(`${this.ediedActiveClmnUrl}/${controlFileName}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}