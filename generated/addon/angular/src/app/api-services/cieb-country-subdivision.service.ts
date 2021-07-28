/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebCountrySubdivision } from '../api-models/cieb-country-subdivision.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class CiebCountrySubdivisionService {

    private ciebCountrySubdivisionUrl: string = `${environment.apiUrl}/ciebcountrysubdivisions`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCiebCountrySubdivisions(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CiebCountrySubdivision[]> {
        var url = `${this.ciebCountrySubdivisionUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebCountrySubdivision[]),
                catchError(this.sharedService.handleError))
    }

    getCiebCountrySubdivision(countryCode2 : string): Observable<CiebCountrySubdivision> {
        return this.httpClient.get(`${this.ciebCountrySubdivisionUrl}/${countryCode2}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebCountrySubdivision),
                catchError(this.sharedService.handleError))
    }

    getCiebCountrySubdivisionsCount(): Observable<number> {
        var url = `${this.ciebCountrySubdivisionUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCiebCountrySubdivision(ciebCountrySubdivision : CiebCountrySubdivision): Observable<any> {
        let body = JSON.stringify(ciebCountrySubdivision);
        return this.httpClient.post(this.ciebCountrySubdivisionUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCiebCountrySubdivision(ciebCountrySubdivision : CiebCountrySubdivision, countryCode2 : string): Observable<any> {
        let body = JSON.stringify(ciebCountrySubdivision);
        return this.httpClient.put(`${this.ciebCountrySubdivisionUrl}/${countryCode2}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCiebCountrySubdivision(ciebCountrySubdivision : CiebCountrySubdivision, countryCode2 : string): Observable<any> {
        let body = JSON.stringify(ciebCountrySubdivision);
        return this.httpClient.patch(`${this.ciebCountrySubdivisionUrl}/${countryCode2}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCiebCountrySubdivision(countryCode2 : string): Observable<any> {
        return this.httpClient.delete(`${this.ciebCountrySubdivisionUrl}/${countryCode2}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}