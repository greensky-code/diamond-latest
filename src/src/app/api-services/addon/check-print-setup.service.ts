/* Copyright (c) 2021 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {catchError, map} from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {SharedService} from "../../shared/services/shared.service";
import {CheckPrintSetup} from "../../api-models/addon/check-print-setup.model";

@Injectable({
    providedIn: "root"
})
export class CheckPrintSetupService {

    private checkPrintSetupUrl: string = `${environment.apiUrl}/checkprintsetups`;
    private contentHeaders = new HttpHeaders();

    constructor(private httpClient: HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCheckPrintSetups(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<CheckPrintSetup[]> {
        var url = `${this.checkPrintSetupUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CheckPrintSetup[]),
                catchError(this.sharedService.handleError))
    }

    getCheckPrintSetup(seqCkprtId: number): Observable<CheckPrintSetup> {
        return this.httpClient.get(`${this.checkPrintSetupUrl}/${seqCkprtId}`, {observe: 'response'})
            .pipe(map(response => response.body as CheckPrintSetup),
                catchError(this.sharedService.handleError))
    }

    getCheckPrintSetupsCount(): Observable<number> {
        var url = `${this.checkPrintSetupUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }


    createCheckPrintSetup(checkPrintSetup: CheckPrintSetup): Observable<any> {
        let body = JSON.stringify(checkPrintSetup);
        return this.httpClient.post(this.checkPrintSetupUrl, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    updateCheckPrintSetup(checkPrintSetup: CheckPrintSetup, seqCkprtId: number): Observable<any> {
        let body = JSON.stringify(checkPrintSetup);
        return this.httpClient.put(`${this.checkPrintSetupUrl}/${seqCkprtId}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    partiallyUpdateCheckPrintSetup(checkPrintSetup: CheckPrintSetup, seqCkprtId: number): Observable<any> {
        let body = JSON.stringify(checkPrintSetup);
        return this.httpClient.patch(`${this.checkPrintSetupUrl}/${seqCkprtId}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCheckPrintSetup(seqCkprtId: number): Observable<any> {
        return this.httpClient.delete(`${this.checkPrintSetupUrl}/${seqCkprtId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}
