/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { MedDefnCode } from '../api-models/med-defn-code.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class MedDefnCodeService {

    private medDefnCodeUrl: string = `${environment.apiUrl}/meddefncodes`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getMedDefnCodes(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<MedDefnCode[]> {
        var url = `${this.medDefnCodeUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as MedDefnCode[]),
                catchError(this.sharedService.handleError))
    }

    getMedDefnCode(medDefCode : string): Observable<MedDefnCode> {
        return this.httpClient.get(`${this.medDefnCodeUrl}/${medDefCode}`, {observe: 'response'})
            .pipe(map(response => response.body as MedDefnCode),
                catchError(this.sharedService.handleError))
    }

    getMedDefnCodesCount(): Observable<number> {
        var url = `${this.medDefnCodeUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createMedDefnCode(medDefnCode : MedDefnCode): Observable<any> {
        let body = JSON.stringify(medDefnCode);
        return this.httpClient.post(this.medDefnCodeUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateMedDefnCode(medDefnCode : MedDefnCode, medDefCode : string): Observable<any> {
        let body = JSON.stringify(medDefnCode);
        return this.httpClient.put(`${this.medDefnCodeUrl}/${medDefCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateMedDefnCode(medDefnCode : MedDefnCode, medDefCode : string): Observable<any> {
        let body = JSON.stringify(medDefnCode);
        return this.httpClient.patch(`${this.medDefnCodeUrl}/${medDefCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteMedDefnCode(medDefCode : string): Observable<any> {
        return this.httpClient.delete(`${this.medDefnCodeUrl}/${medDefCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}