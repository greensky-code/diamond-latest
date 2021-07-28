/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { MedDefAltSearchColumns } from '../api-models/med-def-alt-search-columns.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class MedDefAltSearchColumnsService {

    private medDefAltSearchColumnsUrl: string = `${environment.apiUrl}/meddefaltsearchcolumnss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getMedDefAltSearchColumnss(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<MedDefAltSearchColumns[]> {
        var url = `${this.medDefAltSearchColumnsUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as MedDefAltSearchColumns[]),
                catchError(this.sharedService.handleError))
    }

    getMedDefAltSearchColumns(claimHdrColumns : string): Observable<MedDefAltSearchColumns> {
        return this.httpClient.get(`${this.medDefAltSearchColumnsUrl}/${claimHdrColumns}`, {observe: 'response'})
            .pipe(map(response => response.body as MedDefAltSearchColumns),
                catchError(this.sharedService.handleError))
    }

    getMedDefAltSearchColumnssCount(): Observable<number> {
        var url = `${this.medDefAltSearchColumnsUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createMedDefAltSearchColumns(medDefAltSearchColumns : MedDefAltSearchColumns): Observable<any> {
        let body = JSON.stringify(medDefAltSearchColumns);
        return this.httpClient.post(this.medDefAltSearchColumnsUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateMedDefAltSearchColumns(medDefAltSearchColumns : MedDefAltSearchColumns, claimHdrColumns : string): Observable<any> {
        let body = JSON.stringify(medDefAltSearchColumns);
        return this.httpClient.put(`${this.medDefAltSearchColumnsUrl}/${claimHdrColumns}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateMedDefAltSearchColumns(medDefAltSearchColumns : MedDefAltSearchColumns, claimHdrColumns : string): Observable<any> {
        let body = JSON.stringify(medDefAltSearchColumns);
        return this.httpClient.patch(`${this.medDefAltSearchColumnsUrl}/${claimHdrColumns}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteMedDefAltSearchColumns(claimHdrColumns : string): Observable<any> {
        return this.httpClient.delete(`${this.medDefAltSearchColumnsUrl}/${claimHdrColumns}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}