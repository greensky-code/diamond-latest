/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { IpaProvider } from '../api-models/ipa-provider.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class IpaProviderService {

    private ipaProviderUrl: string = `${environment.apiUrl}/ipaproviders`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getIpaProviders(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<IpaProvider[]> {
        var url = `${this.ipaProviderUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as IpaProvider[]),
                catchError(this.sharedService.handleError))
    }

    getIpaProvider(ipaId : string): Observable<IpaProvider> {
        return this.httpClient.get(`${this.ipaProviderUrl}/${ipaId}`, {observe: 'response'})
            .pipe(map(response => response.body as IpaProvider),
                catchError(this.sharedService.handleError))
    }

    getIpaProvidersCount(): Observable<number> {
        var url = `${this.ipaProviderUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createIpaProvider(ipaProvider : IpaProvider): Observable<any> {
        let body = JSON.stringify(ipaProvider);
        return this.httpClient.post(this.ipaProviderUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateIpaProvider(ipaProvider : IpaProvider, ipaId : string): Observable<any> {
        let body = JSON.stringify(ipaProvider);
        return this.httpClient.put(`${this.ipaProviderUrl}/${ipaId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateIpaProvider(ipaProvider : IpaProvider, ipaId : string): Observable<any> {
        let body = JSON.stringify(ipaProvider);
        return this.httpClient.patch(`${this.ipaProviderUrl}/${ipaId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteIpaProvider(ipaId : string): Observable<any> {
        return this.httpClient.delete(`${this.ipaProviderUrl}/${ipaId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}