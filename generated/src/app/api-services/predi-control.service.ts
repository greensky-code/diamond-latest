/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PrediControl } from '../api-models/predi-control.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PrediControlService {

    private prediControlUrl: string = `${environment.apiUrl}/predicontrols`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPrediControls(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PrediControl[]> {
        var url = `${this.prediControlUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PrediControl[]),
                catchError(this.sharedService.handleError))
    }

    getPrediControl(runOptionString : string): Observable<PrediControl> {
        return this.httpClient.get(`${this.prediControlUrl}/${runOptionString}`, {observe: 'response'})
            .pipe(map(response => response.body as PrediControl),
                catchError(this.sharedService.handleError))
    }

    getPrediControlsCount(): Observable<number> {
        var url = `${this.prediControlUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createPrediControl(prediControl : PrediControl): Observable<any> {
        let body = JSON.stringify(prediControl);
        return this.httpClient.post(this.prediControlUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updatePrediControl(prediControl : PrediControl, runOptionString : string): Observable<any> {
        let body = JSON.stringify(prediControl);
        return this.httpClient.put(`${this.prediControlUrl}/${runOptionString}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdatePrediControl(prediControl : PrediControl, runOptionString : string): Observable<any> {
        let body = JSON.stringify(prediControl);
        return this.httpClient.patch(`${this.prediControlUrl}/${runOptionString}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deletePrediControl(runOptionString : string): Observable<any> {
        return this.httpClient.delete(`${this.prediControlUrl}/${runOptionString}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}