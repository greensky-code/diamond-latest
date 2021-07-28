/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProvCrossRef } from '../api-models/prov-cross-ref.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ProvCrossRefService {

    private provCrossRefUrl: string = `${environment.apiUrl}/provcrossrefs`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getProvCrossRefs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ProvCrossRef[]> {
        var url = `${this.provCrossRefUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ProvCrossRef[]),
                catchError(this.sharedService.handleError))
    }

    getProvCrossRef(seqProvxId : number): Observable<ProvCrossRef> {
        return this.httpClient.get(`${this.provCrossRefUrl}/${seqProvxId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvCrossRef),
                catchError(this.sharedService.handleError))
    }

    getProvCrossRefsCount(): Observable<number> {
        var url = `${this.provCrossRefUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createProvCrossRef(provCrossRef : ProvCrossRef): Observable<any> {
        let body = JSON.stringify(provCrossRef);
        return this.httpClient.post(this.provCrossRefUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateProvCrossRef(provCrossRef : ProvCrossRef, seqProvxId : number): Observable<any> {
        let body = JSON.stringify(provCrossRef);
        return this.httpClient.put(`${this.provCrossRefUrl}/${seqProvxId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateProvCrossRef(provCrossRef : ProvCrossRef, seqProvxId : number): Observable<any> {
        let body = JSON.stringify(provCrossRef);
        return this.httpClient.patch(`${this.provCrossRefUrl}/${seqProvxId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteProvCrossRef(seqProvxId : number): Observable<any> {
        return this.httpClient.delete(`${this.provCrossRefUrl}/${seqProvxId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}