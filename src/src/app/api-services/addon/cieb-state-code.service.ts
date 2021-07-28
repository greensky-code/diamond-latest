/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebStateCode } from '../../api-models/addon/cieb-state-code.model'
import { CONFIG } from '../../core/config';
import { environment } from '../../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class CiebStateCodeService {

    private ciebStateCodeUrl: string = `${environment.apiUrl}/ciebstatecodes`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCiebStateCodes(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CiebStateCode[]> {
        var url = `${this.ciebStateCodeUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebStateCode[]),
                catchError(this.sharedService.handleError))
    }

    getCiebStateCode(stateCode : string): Observable<CiebStateCode> {
        return this.httpClient.get(`${this.ciebStateCodeUrl}/${stateCode}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebStateCode),
                catchError(this.sharedService.handleError))
    }

    getCiebStateCodesCount(): Observable<number> {
        var url = `${this.ciebStateCodeUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCiebStateCode(ciebStateCode : CiebStateCode): Observable<any> {
        let body = JSON.stringify(ciebStateCode);
        return this.httpClient.post(this.ciebStateCodeUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCiebStateCode(ciebStateCode : CiebStateCode, stateCode : string): Observable<any> {
        let body = JSON.stringify(ciebStateCode);
        return this.httpClient.put(`${this.ciebStateCodeUrl}/${stateCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCiebStateCode(ciebStateCode : CiebStateCode, stateCode : string): Observable<any> {
        let body = JSON.stringify(ciebStateCode);
        return this.httpClient.patch(`${this.ciebStateCodeUrl}/${stateCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCiebStateCode(stateCode : string): Observable<any> {
        return this.httpClient.delete(`${this.ciebStateCodeUrl}/${stateCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}