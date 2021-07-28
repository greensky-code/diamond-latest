/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { LinbsContractSearch } from '../api-models/linbs-contract-search.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class LinbsContractSearchService {

    private linbsContractSearchUrl: string = `${environment.apiUrl}/linbscontractsearches`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getLinbsContractSearches(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<LinbsContractSearch[]> {
        var url = `${this.linbsContractSearchUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as LinbsContractSearch[]),
                catchError(this.sharedService.handleError))
    }

    getLinbsContractSearch(lineOfBusiness : string): Observable<LinbsContractSearch> {
        return this.httpClient.get(`${this.linbsContractSearchUrl}/${lineOfBusiness}`, {observe: 'response'})
            .pipe(map(response => response.body as LinbsContractSearch),
                catchError(this.sharedService.handleError))
    }

    getLinbsContractSearchesCount(): Observable<number> {
        var url = `${this.linbsContractSearchUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByLineOfBusiness(lineOfBusiness : string): Observable<LinbsContractSearch[]> {
        return this.httpClient.get(`${this.linbsContractSearchUrl}/find-by-lineofbusiness/${lineOfBusiness}`, {observe: 'response'})
            .pipe(map(response => response.body as LinbsContractSearch),
                catchError(this.sharedService.handleError))
    }




    createLinbsContractSearch(linbsContractSearch : LinbsContractSearch): Observable<any> {
        let body = JSON.stringify(linbsContractSearch);
        return this.httpClient.post(this.linbsContractSearchUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateLinbsContractSearch(linbsContractSearch : LinbsContractSearch, lineOfBusiness : string): Observable<any> {
        let body = JSON.stringify(linbsContractSearch);
        return this.httpClient.put(`${this.linbsContractSearchUrl}/${lineOfBusiness}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateLinbsContractSearch(linbsContractSearch : LinbsContractSearch, lineOfBusiness : string): Observable<any> {
        let body = JSON.stringify(linbsContractSearch);
        return this.httpClient.patch(`${this.linbsContractSearchUrl}/${lineOfBusiness}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteLinbsContractSearch(lineOfBusiness : string): Observable<any> {
        return this.httpClient.delete(`${this.linbsContractSearchUrl}/${lineOfBusiness}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}