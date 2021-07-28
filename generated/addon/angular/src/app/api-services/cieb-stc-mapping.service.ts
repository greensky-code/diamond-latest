/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebStcMapping } from '../api-models/cieb-stc-mapping.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class CiebStcMappingService {

    private ciebStcMappingUrl: string = `${environment.apiUrl}/ciebstcmappings`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCiebStcMappings(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CiebStcMapping[]> {
        var url = `${this.ciebStcMappingUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebStcMapping[]),
                catchError(this.sharedService.handleError))
    }

    getCiebStcMapping(seqStcId : number): Observable<CiebStcMapping> {
        return this.httpClient.get(`${this.ciebStcMappingUrl}/${seqStcId}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebStcMapping),
                catchError(this.sharedService.handleError))
    }

    getCiebStcMappingsCount(): Observable<number> {
        var url = `${this.ciebStcMappingUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCiebStcMapping(ciebStcMapping : CiebStcMapping): Observable<any> {
        let body = JSON.stringify(ciebStcMapping);
        return this.httpClient.post(this.ciebStcMappingUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCiebStcMapping(ciebStcMapping : CiebStcMapping, seqStcId : number): Observable<any> {
        let body = JSON.stringify(ciebStcMapping);
        return this.httpClient.put(`${this.ciebStcMappingUrl}/${seqStcId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCiebStcMapping(ciebStcMapping : CiebStcMapping, seqStcId : number): Observable<any> {
        let body = JSON.stringify(ciebStcMapping);
        return this.httpClient.patch(`${this.ciebStcMappingUrl}/${seqStcId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCiebStcMapping(seqStcId : number): Observable<any> {
        return this.httpClient.delete(`${this.ciebStcMappingUrl}/${seqStcId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}