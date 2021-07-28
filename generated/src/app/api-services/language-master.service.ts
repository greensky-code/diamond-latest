/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { LanguageMaster } from '../api-models/language-master.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class LanguageMasterService {

    private languageMasterUrl: string = `${environment.apiUrl}/languagemasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getLanguageMasters(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<LanguageMaster[]> {
        var url = `${this.languageMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as LanguageMaster[]),
                catchError(this.sharedService.handleError))
    }

    getLanguageMaster(languageCode : string): Observable<LanguageMaster> {
        return this.httpClient.get(`${this.languageMasterUrl}/${languageCode}`, {observe: 'response'})
            .pipe(map(response => response.body as LanguageMaster),
                catchError(this.sharedService.handleError))
    }

    getLanguageMastersCount(): Observable<number> {
        var url = `${this.languageMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createLanguageMaster(languageMaster : LanguageMaster): Observable<any> {
        let body = JSON.stringify(languageMaster);
        return this.httpClient.post(this.languageMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateLanguageMaster(languageMaster : LanguageMaster, languageCode : string): Observable<any> {
        let body = JSON.stringify(languageMaster);
        return this.httpClient.put(`${this.languageMasterUrl}/${languageCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateLanguageMaster(languageMaster : LanguageMaster, languageCode : string): Observable<any> {
        let body = JSON.stringify(languageMaster);
        return this.httpClient.patch(`${this.languageMasterUrl}/${languageCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteLanguageMaster(languageCode : string): Observable<any> {
        return this.httpClient.delete(`${this.languageMasterUrl}/${languageCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}