/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebContactCode } from '../api-models/cieb-contact-code.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class CiebContactCodeService {

    private ciebContactCodeUrl: string = `${environment.apiUrl}/ciebcontactcodes`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCiebContactCodes(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CiebContactCode[]> {
        var url = `${this.ciebContactCodeUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebContactCode[]),
                catchError(this.sharedService.handleError))
    }

    getCiebContactCode(contactCode : string): Observable<CiebContactCode> {
        return this.httpClient.get(`${this.ciebContactCodeUrl}/${contactCode}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebContactCode),
                catchError(this.sharedService.handleError))
    }

    getAllCiebContactCode(): Observable<CiebContactCode> {
        return this.httpClient.get(`${this.ciebContactCodeUrl}/all`, {observe: 'response'})
            .pipe(map(response => response.body as CiebContactCode[]),
                catchError(this.sharedService.handleError))
    }

    getCiebContactCodesCount(): Observable<number> {
        var url = `${this.ciebContactCodeUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCiebContactCode(ciebContactCode : CiebContactCode): Observable<any> {
        let body = JSON.stringify(ciebContactCode);
        return this.httpClient.post(this.ciebContactCodeUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCiebContactCode(ciebContactCode : CiebContactCode, contactCode : string): Observable<any> {
        let body = JSON.stringify(ciebContactCode);
        return this.httpClient.put(`${this.ciebContactCodeUrl}/${contactCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCiebContactCode(ciebContactCode : CiebContactCode, contactCode : string): Observable<any> {
        let body = JSON.stringify(ciebContactCode);
        return this.httpClient.patch(`${this.ciebContactCodeUrl}/${contactCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCiebContactCode(contactCode : string): Observable<any> {
        return this.httpClient.delete(`${this.ciebContactCodeUrl}/${contactCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}