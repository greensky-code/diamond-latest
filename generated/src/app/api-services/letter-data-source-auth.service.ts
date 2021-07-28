/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { LetterDataSourceAuth } from '../api-models/letter-data-source-auth.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class LetterDataSourceAuthService {

    private letterDataSourceAuthUrl: string = `${environment.apiUrl}/letterdatasourceauths`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getLetterDataSourceAuths(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<LetterDataSourceAuth[]> {
        var url = `${this.letterDataSourceAuthUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as LetterDataSourceAuth[]),
                catchError(this.sharedService.handleError))
    }

    getLetterDataSourceAuth(seqLetterDataSource : number): Observable<LetterDataSourceAuth> {
        return this.httpClient.get(`${this.letterDataSourceAuthUrl}/${seqLetterDataSource}`, {observe: 'response'})
            .pipe(map(response => response.body as LetterDataSourceAuth),
                catchError(this.sharedService.handleError))
    }

    getLetterDataSourceAuthsCount(): Observable<number> {
        var url = `${this.letterDataSourceAuthUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createLetterDataSourceAuth(letterDataSourceAuth : LetterDataSourceAuth): Observable<any> {
        let body = JSON.stringify(letterDataSourceAuth);
        return this.httpClient.post(this.letterDataSourceAuthUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateLetterDataSourceAuth(letterDataSourceAuth : LetterDataSourceAuth, seqLetterDataSource : number): Observable<any> {
        let body = JSON.stringify(letterDataSourceAuth);
        return this.httpClient.put(`${this.letterDataSourceAuthUrl}/${seqLetterDataSource}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateLetterDataSourceAuth(letterDataSourceAuth : LetterDataSourceAuth, seqLetterDataSource : number): Observable<any> {
        let body = JSON.stringify(letterDataSourceAuth);
        return this.httpClient.patch(`${this.letterDataSourceAuthUrl}/${seqLetterDataSource}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteLetterDataSourceAuth(seqLetterDataSource : number): Observable<any> {
        return this.httpClient.delete(`${this.letterDataSourceAuthUrl}/${seqLetterDataSource}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}