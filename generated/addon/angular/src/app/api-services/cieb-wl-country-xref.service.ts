/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebWlCountryXref } from '../api-models/cieb-wl-country-xref.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class CiebWlCountryXrefService {

    private ciebWlCountryXrefUrl: string = `${environment.apiUrl}/ciebwlcountryxrefs`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCiebWlCountryXrefs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CiebWlCountryXref[]> {
        var url = `${this.ciebWlCountryXrefUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebWlCountryXref[]),
                catchError(this.sharedService.handleError))
    }

    getCiebWlCountryXref(countryCode3 : string): Observable<CiebWlCountryXref> {
        return this.httpClient.get(`${this.ciebWlCountryXrefUrl}/${countryCode3}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebWlCountryXref),
                catchError(this.sharedService.handleError))
    }

    getCiebWlCountryXrefsCount(): Observable<number> {
        var url = `${this.ciebWlCountryXrefUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCiebWlCountryXref(ciebWlCountryXref : CiebWlCountryXref): Observable<any> {
        let body = JSON.stringify(ciebWlCountryXref);
        return this.httpClient.post(this.ciebWlCountryXrefUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCiebWlCountryXref(ciebWlCountryXref : CiebWlCountryXref, countryCode3 : string): Observable<any> {
        let body = JSON.stringify(ciebWlCountryXref);
        return this.httpClient.put(`${this.ciebWlCountryXrefUrl}/${countryCode3}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCiebWlCountryXref(ciebWlCountryXref : CiebWlCountryXref, countryCode3 : string): Observable<any> {
        let body = JSON.stringify(ciebWlCountryXref);
        return this.httpClient.patch(`${this.ciebWlCountryXrefUrl}/${countryCode3}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCiebWlCountryXref(countryCode3 : string): Observable<any> {
        return this.httpClient.delete(`${this.ciebWlCountryXrefUrl}/${countryCode3}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}