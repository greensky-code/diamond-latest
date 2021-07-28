/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CapModelRateSearch } from '../api-models/cap-model-rate-search.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CapModelRateSearchService {

    private capModelRateSearchUrl: string = `${environment.apiUrl}/capmodelratesearches`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCapModelRateSearches(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CapModelRateSearch[]> {
        var url = `${this.capModelRateSearchUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CapModelRateSearch[]),
                catchError(this.sharedService.handleError))
    }

    getCapModelRateSearch(capModelId : string): Observable<CapModelRateSearch> {
        return this.httpClient.get(`${this.capModelRateSearchUrl}/${capModelId}`, {observe: 'response'})
            .pipe(map(response => response.body as CapModelRateSearch),
                catchError(this.sharedService.handleError))
    }

    getCapModelRateSearchesCount(): Observable<number> {
        var url = `${this.capModelRateSearchUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCapModelRateSearch(capModelRateSearch : CapModelRateSearch): Observable<any> {
        let body = JSON.stringify(capModelRateSearch);
        return this.httpClient.post(this.capModelRateSearchUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCapModelRateSearch(capModelRateSearch : CapModelRateSearch, capModelId : string): Observable<any> {
        let body = JSON.stringify(capModelRateSearch);
        return this.httpClient.put(`${this.capModelRateSearchUrl}/${capModelId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCapModelRateSearch(capModelRateSearch : CapModelRateSearch, capModelId : string): Observable<any> {
        let body = JSON.stringify(capModelRateSearch);
        return this.httpClient.patch(`${this.capModelRateSearchUrl}/${capModelId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCapModelRateSearch(capModelId : string): Observable<any> {
        return this.httpClient.delete(`${this.capModelRateSearchUrl}/${capModelId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}