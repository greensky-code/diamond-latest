/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { DiagnosisCodeMaster } from '../api-models/diagnosis-code-master.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class DiagnosisCodeMasterService {

    private diagnosisCodeMasterUrl: string = `${environment.apiUrl}/diagnosiscodemasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getDiagnosisCodeMasters(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<DiagnosisCodeMaster[]> {
        var url = `${this.diagnosisCodeMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as DiagnosisCodeMaster[]),
                catchError(this.sharedService.handleError))
    }

    getDiagnosisCodeMaster(diagnosisCode : string): Observable<DiagnosisCodeMaster> {
        return this.httpClient.get(`${this.diagnosisCodeMasterUrl}/${diagnosisCode}`, {observe: 'response'})
            .pipe(map(response => response.body as DiagnosisCodeMaster),
                catchError(this.sharedService.handleError))
    }

    getDiagnosisCodeMastersCount(): Observable<number> {
        var url = `${this.diagnosisCodeMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createDiagnosisCodeMaster(diagnosisCodeMaster : DiagnosisCodeMaster): Observable<any> {
        let body = JSON.stringify(diagnosisCodeMaster);
        return this.httpClient.post(this.diagnosisCodeMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateDiagnosisCodeMaster(diagnosisCodeMaster : DiagnosisCodeMaster, diagnosisCode : string): Observable<any> {
        let body = JSON.stringify(diagnosisCodeMaster);
        return this.httpClient.put(`${this.diagnosisCodeMasterUrl}/${diagnosisCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateDiagnosisCodeMaster(diagnosisCodeMaster : DiagnosisCodeMaster, diagnosisCode : string): Observable<any> {
        let body = JSON.stringify(diagnosisCodeMaster);
        return this.httpClient.patch(`${this.diagnosisCodeMasterUrl}/${diagnosisCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteDiagnosisCodeMaster(diagnosisCode : string): Observable<any> {
        return this.httpClient.delete(`${this.diagnosisCodeMasterUrl}/${diagnosisCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}