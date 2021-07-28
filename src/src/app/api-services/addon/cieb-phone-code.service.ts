/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { HttpHeaders } from '@angular/common/http';

import { catchError, map } from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {SharedService} from "../../shared/services/shared.service";
import {CiebPhoneCode} from "../../api-models/addon/cieb-phone-code.model";

@Injectable({
    providedIn: "root"
})
export class CiebPhoneCodeService {

    private ciebPhoneCodeUrl: string = `${environment.apiUrl}/ciebphonecodes`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCiebPhoneCodes(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CiebPhoneCode[]> {
        var url = `${this.ciebPhoneCodeUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebPhoneCode[]),
                catchError(this.sharedService.handleError))
    }

    getCiebPhoneCode(phoneCode : string): Observable<CiebPhoneCode> {
        return this.httpClient.get(`${this.ciebPhoneCodeUrl}/${phoneCode}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebPhoneCode),
                catchError(this.sharedService.handleError))
    }

    getCiebPhoneCodesCount(): Observable<number> {
        var url = `${this.ciebPhoneCodeUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCiebPhoneCode(ciebPhoneCode : CiebPhoneCode): Observable<any> {
        let body = JSON.stringify(ciebPhoneCode);
        return this.httpClient.post(this.ciebPhoneCodeUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCiebPhoneCode(ciebPhoneCode : CiebPhoneCode, phoneCode : string): Observable<any> {
        let body = JSON.stringify(ciebPhoneCode);
        return this.httpClient.put(`${this.ciebPhoneCodeUrl}/${phoneCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCiebPhoneCode(ciebPhoneCode : CiebPhoneCode, phoneCode : string): Observable<any> {
        let body = JSON.stringify(ciebPhoneCode);
        return this.httpClient.patch(`${this.ciebPhoneCodeUrl}/${phoneCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCiebPhoneCode(phoneCode : string): Observable<any> {
        return this.httpClient.delete(`${this.ciebPhoneCodeUrl}/${phoneCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}
