/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { DiagCodeMasterStaging } from '../api-models/diag-code-master-staging.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class DiagCodeMasterStagingService {

    private diagCodeMasterStagingUrl: string = `${environment.apiUrl}/diagcodemasterstagings`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getDiagCodeMasterStagings(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<DiagCodeMasterStaging[]> {
        var url = `${this.diagCodeMasterStagingUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as DiagCodeMasterStaging[]),
                catchError(this.sharedService.handleError))
    }

    getDiagCodeMasterStaging(diagnosisCode : string): Observable<DiagCodeMasterStaging> {
        return this.httpClient.get(`${this.diagCodeMasterStagingUrl}/${diagnosisCode}`, {observe: 'response'})
            .pipe(map(response => response.body as DiagCodeMasterStaging),
                catchError(this.sharedService.handleError))
    }

    getDiagCodeMasterStagingsCount(): Observable<number> {
        var url = `${this.diagCodeMasterStagingUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createDiagCodeMasterStaging(diagCodeMasterStaging : DiagCodeMasterStaging): Observable<any> {
        let body = JSON.stringify(diagCodeMasterStaging);
        return this.httpClient.post(this.diagCodeMasterStagingUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateDiagCodeMasterStaging(diagCodeMasterStaging : DiagCodeMasterStaging, diagnosisCode : string): Observable<any> {
        let body = JSON.stringify(diagCodeMasterStaging);
        return this.httpClient.put(`${this.diagCodeMasterStagingUrl}/${diagnosisCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateDiagCodeMasterStaging(diagCodeMasterStaging : DiagCodeMasterStaging, diagnosisCode : string): Observable<any> {
        let body = JSON.stringify(diagCodeMasterStaging);
        return this.httpClient.patch(`${this.diagCodeMasterStagingUrl}/${diagnosisCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteDiagCodeMasterStaging(diagnosisCode : string): Observable<any> {
        return this.httpClient.delete(`${this.diagCodeMasterStagingUrl}/${diagnosisCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}