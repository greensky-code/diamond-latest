/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { MedDefnRulesDeterminant } from '../api-models/med-defn-rules-determinant.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class MedDefnRulesDeterminantService {

    private medDefnRulesDeterminantUrl: string = `${environment.apiUrl}/meddefnrulesdeterminants`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getMedDefnRulesDeterminants(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<MedDefnRulesDeterminant[]> {
        var url = `${this.medDefnRulesDeterminantUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as MedDefnRulesDeterminant[]),
                catchError(this.sharedService.handleError))
    }

    getMedDefnRulesDeterminant(determinantSequence : number): Observable<MedDefnRulesDeterminant> {
        return this.httpClient.get(`${this.medDefnRulesDeterminantUrl}/${determinantSequence}`, {observe: 'response'})
            .pipe(map(response => response.body as MedDefnRulesDeterminant),
                catchError(this.sharedService.handleError))
    }

    getMedDefnRulesDeterminantsCount(): Observable<number> {
        var url = `${this.medDefnRulesDeterminantUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createMedDefnRulesDeterminant(medDefnRulesDeterminant : MedDefnRulesDeterminant): Observable<any> {
        let body = JSON.stringify(medDefnRulesDeterminant);
        return this.httpClient.post(this.medDefnRulesDeterminantUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateMedDefnRulesDeterminant(medDefnRulesDeterminant : MedDefnRulesDeterminant, determinantSequence : number): Observable<any> {
        let body = JSON.stringify(medDefnRulesDeterminant);
        return this.httpClient.put(`${this.medDefnRulesDeterminantUrl}/${determinantSequence}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateMedDefnRulesDeterminant(medDefnRulesDeterminant : MedDefnRulesDeterminant, determinantSequence : number): Observable<any> {
        let body = JSON.stringify(medDefnRulesDeterminant);
        return this.httpClient.patch(`${this.medDefnRulesDeterminantUrl}/${determinantSequence}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteMedDefnRulesDeterminant(determinantSequence : number): Observable<any> {
        return this.httpClient.delete(`${this.medDefnRulesDeterminantUrl}/${determinantSequence}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}