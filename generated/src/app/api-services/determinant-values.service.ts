/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { DeterminantValues } from '../api-models/determinant-values.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class DeterminantValuesService {

    private determinantValuesUrl: string = `${environment.apiUrl}/determinantvalueses`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getDeterminantValueses(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<DeterminantValues[]> {
        var url = `${this.determinantValuesUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as DeterminantValues[]),
                catchError(this.sharedService.handleError))
    }

    getDeterminantValues(keyword : string): Observable<DeterminantValues> {
        return this.httpClient.get(`${this.determinantValuesUrl}/${keyword}`, {observe: 'response'})
            .pipe(map(response => response.body as DeterminantValues),
                catchError(this.sharedService.handleError))
    }

    getDeterminantValuesesCount(): Observable<number> {
        var url = `${this.determinantValuesUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createDeterminantValues(determinantValues : DeterminantValues): Observable<any> {
        let body = JSON.stringify(determinantValues);
        return this.httpClient.post(this.determinantValuesUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateDeterminantValues(determinantValues : DeterminantValues, keyword : string): Observable<any> {
        let body = JSON.stringify(determinantValues);
        return this.httpClient.put(`${this.determinantValuesUrl}/${keyword}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateDeterminantValues(determinantValues : DeterminantValues, keyword : string): Observable<any> {
        let body = JSON.stringify(determinantValues);
        return this.httpClient.patch(`${this.determinantValuesUrl}/${keyword}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteDeterminantValues(keyword : string): Observable<any> {
        return this.httpClient.delete(`${this.determinantValuesUrl}/${keyword}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}