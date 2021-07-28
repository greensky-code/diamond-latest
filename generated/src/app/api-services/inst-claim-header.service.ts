/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { InstClaimHeader } from '../api-models/inst-claim-header.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class InstClaimHeaderService {

    private instClaimHeaderUrl: string = `${environment.apiUrl}/instclaimheaders`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getInstClaimHeaders(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<InstClaimHeader[]> {
        var url = `${this.instClaimHeaderUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimHeader[]),
                catchError(this.sharedService.handleError))
    }

    getInstClaimHeader(seqClaimId : number): Observable<InstClaimHeader> {
        return this.httpClient.get(`${this.instClaimHeaderUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimHeader),
                catchError(this.sharedService.handleError))
    }

    getInstClaimHeadersCount(): Observable<number> {
        var url = `${this.instClaimHeaderUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createInstClaimHeader(instClaimHeader : InstClaimHeader): Observable<any> {
        let body = JSON.stringify(instClaimHeader);
        return this.httpClient.post(this.instClaimHeaderUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateInstClaimHeader(instClaimHeader : InstClaimHeader, seqClaimId : number): Observable<any> {
        let body = JSON.stringify(instClaimHeader);
        return this.httpClient.put(`${this.instClaimHeaderUrl}/${seqClaimId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateInstClaimHeader(instClaimHeader : InstClaimHeader, seqClaimId : number): Observable<any> {
        let body = JSON.stringify(instClaimHeader);
        return this.httpClient.patch(`${this.instClaimHeaderUrl}/${seqClaimId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteInstClaimHeader(seqClaimId : number): Observable<any> {
        return this.httpClient.delete(`${this.instClaimHeaderUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}