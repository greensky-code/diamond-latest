/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { MedDefnAltSearch } from '../api-models/med-defn-alt-search.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class MedDefnAltSearchService {

    private medDefnAltSearchUrl: string = `${environment.apiUrl}/meddefnaltsearches`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getMedDefnAltSearches(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<MedDefnAltSearch[]> {
        var url = `${this.medDefnAltSearchUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as MedDefnAltSearch[]),
                catchError(this.sharedService.handleError))
    }

    getMedDefnAltSearch(claimType : string): Observable<MedDefnAltSearch> {
        return this.httpClient.get(`${this.medDefnAltSearchUrl}/${claimType}`, {observe: 'response'})
            .pipe(map(response => response.body as MedDefnAltSearch),
                catchError(this.sharedService.handleError))
    }

    getMedDefnAltSearchesCount(): Observable<number> {
        var url = `${this.medDefnAltSearchUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByCriteriaSrchPriority(criteriaSrchPriority : number): Observable<MedDefnAltSearch[]> {
        return this.httpClient.get(`${this.medDefnAltSearchUrl}/find-by-criteriasrchpriority/${criteriaSrchPriority}`, {observe: 'response'})
            .pipe(map(response => response.body as MedDefnAltSearch),
                catchError(this.sharedService.handleError))
    }




    createMedDefnAltSearch(medDefnAltSearch : MedDefnAltSearch): Observable<any> {
        let body = JSON.stringify(medDefnAltSearch);
        return this.httpClient.post(this.medDefnAltSearchUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateMedDefnAltSearch(medDefnAltSearch : MedDefnAltSearch, claimType : string): Observable<any> {
        let body = JSON.stringify(medDefnAltSearch);
        return this.httpClient.put(`${this.medDefnAltSearchUrl}/${claimType}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateMedDefnAltSearch(medDefnAltSearch : MedDefnAltSearch, claimType : string): Observable<any> {
        let body = JSON.stringify(medDefnAltSearch);
        return this.httpClient.patch(`${this.medDefnAltSearchUrl}/${claimType}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteMedDefnAltSearch(claimType : string): Observable<any> {
        return this.httpClient.delete(`${this.medDefnAltSearchUrl}/${claimType}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}