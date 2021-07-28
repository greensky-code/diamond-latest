/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { IdCardNarrative } from '../api-models/id-card-narrative.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class IdCardNarrativeService {

    private idCardNarrativeUrl: string = `${environment.apiUrl}/idcardnarratives`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getIdCardNarratives(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<IdCardNarrative[]> {
        var url = `${this.idCardNarrativeUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as IdCardNarrative[]),
                catchError(this.sharedService.handleError))
    }

    getIdCardNarrative(seqNarrative : number): Observable<IdCardNarrative> {
        return this.httpClient.get(`${this.idCardNarrativeUrl}/${seqNarrative}`, {observe: 'response'})
            .pipe(map(response => response.body as IdCardNarrative),
                catchError(this.sharedService.handleError))
    }

    getIdCardNarrativesCount(): Observable<number> {
        var url = `${this.idCardNarrativeUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createIdCardNarrative(idCardNarrative : IdCardNarrative): Observable<any> {
        let body = JSON.stringify(idCardNarrative);
        return this.httpClient.post(this.idCardNarrativeUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateIdCardNarrative(idCardNarrative : IdCardNarrative, seqNarrative : number): Observable<any> {
        let body = JSON.stringify(idCardNarrative);
        return this.httpClient.put(`${this.idCardNarrativeUrl}/${seqNarrative}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateIdCardNarrative(idCardNarrative : IdCardNarrative, seqNarrative : number): Observable<any> {
        let body = JSON.stringify(idCardNarrative);
        return this.httpClient.patch(`${this.idCardNarrativeUrl}/${seqNarrative}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteIdCardNarrative(seqNarrative : number): Observable<any> {
        return this.httpClient.delete(`${this.idCardNarrativeUrl}/${seqNarrative}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}