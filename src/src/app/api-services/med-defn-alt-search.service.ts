/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { MedDefnAltSearch } from '../api-models/med-defn-alt-search.model';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class MedDefnAltSearchService {

    private medDefnAltSearchUrl: string = `${environment.apiUrl}/meddefnaltsearches`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient: HttpClient, private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getMedDefnAltSearches(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<MedDefnAltSearch[]> {
        var url = `${this.medDefnAltSearchUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as MedDefnAltSearch[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getMedDefnAltSearch(claimType: string): Observable<MedDefnAltSearch> {
        return this.httpClient.get(`${this.medDefnAltSearchUrl}/${claimType}`, { observe: 'response' })
            .pipe(map(response => response.body as MedDefnAltSearch),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getMedDefnAltSearchesCount(): Observable<number> {
        var url = `${this.medDefnAltSearchUrl}/count`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByCriteriaSrchPriority(criteriaSrchPriority: number): Observable<MedDefnAltSearch[]> {
        return this.httpClient.get(`${this.medDefnAltSearchUrl}/find-by-criteriasrchpriority/${criteriaSrchPriority}`, { observe: 'response' })
            .pipe(map(response => response.body as MedDefnAltSearch),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    createMedDefnAltSearch(medDefnAltSearch: any): Observable<any> {
        let body = JSON.stringify(medDefnAltSearch);
        return this.httpClient.post(this.medDefnAltSearchUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateMedDefnAltSearch(medDefnAltSearch: MedDefnAltSearch, claimType: string): Observable<any> {
        let body = JSON.stringify(medDefnAltSearch);
        return this.httpClient.put(`${this.medDefnAltSearchUrl}/${claimType}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateMedDefnAltSearch(medDefnAltSearch: MedDefnAltSearch, claimType: string): Observable<any> {
        let body = JSON.stringify(medDefnAltSearch);
        return this.httpClient.patch(`${this.medDefnAltSearchUrl}/${claimType}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteMedDefnAltSearch(claimType: string): Observable<any> {
        return this.httpClient.delete(`${this.medDefnAltSearchUrl}/${claimType}`, { observe: 'response' })
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    private handleError(error: any): Promise<any> {
        var errorMessage = "";
        if(parseInt(error.status) == 0) {
            errorMessage = `An Error occurred while Processing request. Cannot Connect to server. Please make sure that web service is running.`;
        }
        else if (parseInt(error.status) == 404) {
            errorMessage = `A 404 error occurred while accessing URL ${error.url}. Page Not Found.`;
        }
        else if (parseInt(error.status) == 500) {
            errorMessage = `An Internal Server Error Occurred while accessing URL ${error.url}. ${error.statusText}`;
        }
        else if (parseInt(error.status) == 400) {
            errorMessage = `An error occurred while accessing URL ${error.url}. Bad Request`;
        }
        else {
            errorMessage = `An error occurred while accessing URL ${error.url}. ${error.statusText}`;
        }

        return Promise.reject(errorMessage);
   }
}
