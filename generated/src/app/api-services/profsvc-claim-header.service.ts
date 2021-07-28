/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProfsvcClaimHeader } from '../api-models/profsvc-claim-header.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class ProfsvcClaimHeaderService {

    private profsvcClaimHeaderUrl: string = `${environment.apiUrl}/profsvcclaimheaders`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getProfsvcClaimHeaders(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ProfsvcClaimHeader[]> {
        var url = `${this.profsvcClaimHeaderUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimHeader[]),
                catchError(this.sharedService.handleError))
    }

    getProfsvcClaimHeader(seqClaimId : number): Observable<ProfsvcClaimHeader> {
        return this.httpClient.get(`${this.profsvcClaimHeaderUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimHeader),
                catchError(this.sharedService.handleError))
    }

    getProfsvcClaimHeadersCount(): Observable<number> {
        var url = `${this.profsvcClaimHeaderUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createProfsvcClaimHeader(profsvcClaimHeader : ProfsvcClaimHeader): Observable<any> {
        let body = JSON.stringify(profsvcClaimHeader);
        return this.httpClient.post(this.profsvcClaimHeaderUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateProfsvcClaimHeader(profsvcClaimHeader : ProfsvcClaimHeader, seqClaimId : number): Observable<any> {
        let body = JSON.stringify(profsvcClaimHeader);
        return this.httpClient.put(`${this.profsvcClaimHeaderUrl}/${seqClaimId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateProfsvcClaimHeader(profsvcClaimHeader : ProfsvcClaimHeader, seqClaimId : number): Observable<any> {
        let body = JSON.stringify(profsvcClaimHeader);
        return this.httpClient.patch(`${this.profsvcClaimHeaderUrl}/${seqClaimId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteProfsvcClaimHeader(seqClaimId : number): Observable<any> {
        return this.httpClient.delete(`${this.profsvcClaimHeaderUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}