/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebCountryCode } from '../../api-models';
import { environment } from '../../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class CiebCountryCodeService {

    private ciebCountryCodeUrl: string = `${environment.apiUrl}/ciebcountrycodes`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCiebCountryCodes(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CiebCountryCode[]> {
        var url = `${this.ciebCountryCodeUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebCountryCode[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getCiebCountryCodeList(): Observable<CiebCountryCode[]> {
        var url = `${this.ciebCountryCodeUrl}/getCiebCountryCodeList`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebCountryCode[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getEuroCountryList(): Observable<CiebCountryCode[]> {
        var url = `${this.ciebCountryCodeUrl}/getEuroCountryList`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebCountryCode[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getCiebCountryCode(countryCode : string): Observable<CiebCountryCode> {
        return this.httpClient.get(`${this.ciebCountryCodeUrl}/${countryCode}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebCountryCode),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getCiebCountryCodesCount(): Observable<number> {
        var url = `${this.ciebCountryCodeUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }





    createCiebCountryCode(ciebCountryCode : CiebCountryCode): Observable<any> {
        let body = JSON.stringify(ciebCountryCode);
        return this.httpClient.post(this.ciebCountryCodeUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateCiebCountryCode(ciebCountryCode : CiebCountryCode, countryCode : string): Observable<any> {
        let body = JSON.stringify(ciebCountryCode);
        return this.httpClient.put(`${this.ciebCountryCodeUrl}/${countryCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateCiebCountryCode(ciebCountryCode : CiebCountryCode, countryCode : string): Observable<any> {
        let body = JSON.stringify(ciebCountryCode);
        return this.httpClient.patch(`${this.ciebCountryCodeUrl}/${countryCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteCiebCountryCode(countryCode : string): Observable<any> {
        return this.httpClient.delete(`${this.ciebCountryCodeUrl}/${countryCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
