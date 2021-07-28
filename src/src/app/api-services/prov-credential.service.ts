/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { ProvCredential } from '../api-models/prov-credential.model'
import { environment } from '../../environments/environment'
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProvCredentialService {

    private provCredentialUrl: string = `${environment.apiUrl}/provcredentials`;
    private contentHeaders = new HttpHeaders();

    constructor(private httpClient: HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getProvCredentials(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<ProvCredential[]> {
        var url = `${this.provCredentialUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as ProvCredential[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getProvCredential(seqProvCredential: number): Observable<ProvCredential> {
        return this.httpClient.get(`${this.provCredentialUrl}/${seqProvCredential}`, { observe: 'response' })
            .pipe(map(response => response.body as ProvCredential),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getProvCredentialsCount(): Observable<number> {
        var url = `${this.provCredentialUrl}/count`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findBySeqProvId(seqProvId: number): Observable<ProvCredential[]> {
        return this.httpClient.get(`${this.provCredentialUrl}/find-by-seqProvId/${seqProvId}`, { observe: 'response' })
            .pipe(map(response => response.body as ProvCredential),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByProviderId(providerId: string): Observable<ProvCredential[]> {
        return this.httpClient.get(`${this.provCredentialUrl}/find-by-providerId/${providerId}`, { observe: 'response' })
            .pipe(map(response => response.body as ProvCredential),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    createProvCredential(provCredential: ProvCredential): Observable<any> {
        let body = JSON.stringify(provCredential);
        return this.httpClient.post(this.provCredentialUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateProvCredential(provCredential: ProvCredential, seqProvId: number, seqProvCredential: number): Observable<any> {
        let body = JSON.stringify(provCredential);
        return this.httpClient.put(`${this.provCredentialUrl}/${seqProvId}/${seqProvCredential}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateProvCredential(provCredential: ProvCredential, seqProvCredential: number): Observable<any> {
        let body = JSON.stringify(provCredential);
        return this.httpClient.patch(`${this.provCredentialUrl}/${seqProvCredential}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteProvCredential(seqProvCredential: number): Observable<any> {
        return this.httpClient.delete(`${this.provCredentialUrl}/${seqProvCredential}`, { observe: 'response' })
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
