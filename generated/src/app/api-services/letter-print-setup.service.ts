/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { LetterPrintSetup } from '../api-models/letter-print-setup.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class LetterPrintSetupService {

    private letterPrintSetupUrl: string = `${environment.apiUrl}/letterprintsetups`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getLetterPrintSetups(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<LetterPrintSetup[]> {
        var url = `${this.letterPrintSetupUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as LetterPrintSetup[]),
                catchError(this.sharedService.handleError))
    }

    getLetterPrintSetup(seqLtprtId : number): Observable<LetterPrintSetup> {
        return this.httpClient.get(`${this.letterPrintSetupUrl}/${seqLtprtId}`, {observe: 'response'})
            .pipe(map(response => response.body as LetterPrintSetup),
                catchError(this.sharedService.handleError))
    }

    getLetterPrintSetupsCount(): Observable<number> {
        var url = `${this.letterPrintSetupUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createLetterPrintSetup(letterPrintSetup : LetterPrintSetup): Observable<any> {
        let body = JSON.stringify(letterPrintSetup);
        return this.httpClient.post(this.letterPrintSetupUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateLetterPrintSetup(letterPrintSetup : LetterPrintSetup, seqLtprtId : number): Observable<any> {
        let body = JSON.stringify(letterPrintSetup);
        return this.httpClient.put(`${this.letterPrintSetupUrl}/${seqLtprtId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateLetterPrintSetup(letterPrintSetup : LetterPrintSetup, seqLtprtId : number): Observable<any> {
        let body = JSON.stringify(letterPrintSetup);
        return this.httpClient.patch(`${this.letterPrintSetupUrl}/${seqLtprtId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteLetterPrintSetup(seqLtprtId : number): Observable<any> {
        return this.httpClient.delete(`${this.letterPrintSetupUrl}/${seqLtprtId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}