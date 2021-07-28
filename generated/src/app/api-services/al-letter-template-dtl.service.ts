/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AlLetterTemplateDtl } from '../api-models/al-letter-template-dtl.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AlLetterTemplateDtlService {

    private alLetterTemplateDtlUrl: string = `${environment.apiUrl}/allettertemplatedtls`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAlLetterTemplateDtls(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AlLetterTemplateDtl[]> {
        var url = `${this.alLetterTemplateDtlUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AlLetterTemplateDtl[]),
                catchError(this.sharedService.handleError))
    }

    getAlLetterTemplateDtl(seqLetterGroupId : number): Observable<AlLetterTemplateDtl> {
        return this.httpClient.get(`${this.alLetterTemplateDtlUrl}/${seqLetterGroupId}`, {observe: 'response'})
            .pipe(map(response => response.body as AlLetterTemplateDtl),
                catchError(this.sharedService.handleError))
    }

    getAlLetterTemplateDtlsCount(): Observable<number> {
        var url = `${this.alLetterTemplateDtlUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqLetterTempId(seqLetterTempId : number): Observable<AlLetterTemplateDtl[]> {
        return this.httpClient.get(`${this.alLetterTemplateDtlUrl}/find-by-seqlettertempid/${seqLetterTempId}`, {observe: 'response'})
            .pipe(map(response => response.body as AlLetterTemplateDtl),
                catchError(this.sharedService.handleError))
    }
    findBySeqLetterGroupId(seqLetterGroupId : number): Observable<AlLetterTemplateDtl[]> {
        return this.httpClient.get(`${this.alLetterTemplateDtlUrl}/find-by-seqlettergroupid/${seqLetterGroupId}`, {observe: 'response'})
            .pipe(map(response => response.body as AlLetterTemplateDtl),
                catchError(this.sharedService.handleError))
    }




    createAlLetterTemplateDtl(alLetterTemplateDtl : AlLetterTemplateDtl): Observable<any> {
        let body = JSON.stringify(alLetterTemplateDtl);
        return this.httpClient.post(this.alLetterTemplateDtlUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateAlLetterTemplateDtl(alLetterTemplateDtl : AlLetterTemplateDtl, seqLetterGroupId : number): Observable<any> {
        let body = JSON.stringify(alLetterTemplateDtl);
        return this.httpClient.put(`${this.alLetterTemplateDtlUrl}/${seqLetterGroupId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateAlLetterTemplateDtl(alLetterTemplateDtl : AlLetterTemplateDtl, seqLetterGroupId : number): Observable<any> {
        let body = JSON.stringify(alLetterTemplateDtl);
        return this.httpClient.patch(`${this.alLetterTemplateDtlUrl}/${seqLetterGroupId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteAlLetterTemplateDtl(seqLetterGroupId : number): Observable<any> {
        return this.httpClient.delete(`${this.alLetterTemplateDtlUrl}/${seqLetterGroupId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}