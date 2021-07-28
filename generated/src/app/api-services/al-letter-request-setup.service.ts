/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AlLetterRequestSetup } from '../api-models/al-letter-request-setup.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AlLetterRequestSetupService {

    private alLetterRequestSetupUrl: string = `${environment.apiUrl}/alletterrequestsetups`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAlLetterRequestSetups(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AlLetterRequestSetup[]> {
        var url = `${this.alLetterRequestSetupUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AlLetterRequestSetup[]),
                catchError(this.sharedService.handleError))
    }

    getAlLetterRequestSetup(seqLetterRequestId : number): Observable<AlLetterRequestSetup> {
        return this.httpClient.get(`${this.alLetterRequestSetupUrl}/${seqLetterRequestId}`, {observe: 'response'})
            .pipe(map(response => response.body as AlLetterRequestSetup),
                catchError(this.sharedService.handleError))
    }

    getAlLetterRequestSetupsCount(): Observable<number> {
        var url = `${this.alLetterRequestSetupUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createAlLetterRequestSetup(alLetterRequestSetup : AlLetterRequestSetup): Observable<any> {
        let body = JSON.stringify(alLetterRequestSetup);
        return this.httpClient.post(this.alLetterRequestSetupUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateAlLetterRequestSetup(alLetterRequestSetup : AlLetterRequestSetup, seqLetterRequestId : number): Observable<any> {
        let body = JSON.stringify(alLetterRequestSetup);
        return this.httpClient.put(`${this.alLetterRequestSetupUrl}/${seqLetterRequestId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateAlLetterRequestSetup(alLetterRequestSetup : AlLetterRequestSetup, seqLetterRequestId : number): Observable<any> {
        let body = JSON.stringify(alLetterRequestSetup);
        return this.httpClient.patch(`${this.alLetterRequestSetupUrl}/${seqLetterRequestId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteAlLetterRequestSetup(seqLetterRequestId : number): Observable<any> {
        return this.httpClient.delete(`${this.alLetterRequestSetupUrl}/${seqLetterRequestId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}