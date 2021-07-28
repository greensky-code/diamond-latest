/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProvCredential } from '../api-models/prov-credential.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ProvCredentialService {

    private provCredentialUrl: string = `${environment.apiUrl}/provcredentials`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getProvCredentials(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ProvCredential[]> {
        var url = `${this.provCredentialUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ProvCredential[]),
                catchError(this.sharedService.handleError))
    }

    getProvCredential(seqProvCredential : number): Observable<ProvCredential> {
        return this.httpClient.get(`${this.provCredentialUrl}/${seqProvCredential}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvCredential),
                catchError(this.sharedService.handleError))
    }

    getProvCredentialsCount(): Observable<number> {
        var url = `${this.provCredentialUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqProvId(seqProvId : number): Observable<ProvCredential[]> {
        return this.httpClient.get(`${this.provCredentialUrl}/find-by-seqprovid/${seqProvId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvCredential),
                catchError(this.sharedService.handleError))
    }




    createProvCredential(provCredential : ProvCredential): Observable<any> {
        let body = JSON.stringify(provCredential);
        return this.httpClient.post(this.provCredentialUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateProvCredential(provCredential : ProvCredential, seqProvCredential : number): Observable<any> {
        let body = JSON.stringify(provCredential);
        return this.httpClient.put(`${this.provCredentialUrl}/${seqProvCredential}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateProvCredential(provCredential : ProvCredential, seqProvCredential : number): Observable<any> {
        let body = JSON.stringify(provCredential);
        return this.httpClient.patch(`${this.provCredentialUrl}/${seqProvCredential}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteProvCredential(seqProvCredential : number): Observable<any> {
        return this.httpClient.delete(`${this.provCredentialUrl}/${seqProvCredential}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}