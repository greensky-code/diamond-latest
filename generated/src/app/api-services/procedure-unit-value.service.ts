/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcedureUnitValue } from '../api-models/procedure-unit-value.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ProcedureUnitValueService {

    private procedureUnitValueUrl: string = `${environment.apiUrl}/procedureunitvalues`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getProcedureUnitValues(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ProcedureUnitValue[]> {
        var url = `${this.procedureUnitValueUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ProcedureUnitValue[]),
                catchError(this.sharedService.handleError))
    }

    getProcedureUnitValue(procedureCode : string): Observable<ProcedureUnitValue> {
        return this.httpClient.get(`${this.procedureUnitValueUrl}/${procedureCode}`, {observe: 'response'})
            .pipe(map(response => response.body as ProcedureUnitValue),
                catchError(this.sharedService.handleError))
    }

    getProcedureUnitValuesCount(): Observable<number> {
        var url = `${this.procedureUnitValueUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByProcedureCode(procedureCode : string): Observable<ProcedureUnitValue[]> {
        return this.httpClient.get(`${this.procedureUnitValueUrl}/find-by-procedurecode/${procedureCode}`, {observe: 'response'})
            .pipe(map(response => response.body as ProcedureUnitValue),
                catchError(this.sharedService.handleError))
    }
    findByTotalUnitsConvFt(totalUnitsConvFt : string): Observable<ProcedureUnitValue[]> {
        return this.httpClient.get(`${this.procedureUnitValueUrl}/find-by-totalunitsconvft/${totalUnitsConvFt}`, {observe: 'response'})
            .pipe(map(response => response.body as ProcedureUnitValue),
                catchError(this.sharedService.handleError))
    }
    findByProfUnitsConvFt(profUnitsConvFt : string): Observable<ProcedureUnitValue[]> {
        return this.httpClient.get(`${this.procedureUnitValueUrl}/find-by-profunitsconvft/${profUnitsConvFt}`, {observe: 'response'})
            .pipe(map(response => response.body as ProcedureUnitValue),
                catchError(this.sharedService.handleError))
    }
    findByTechUnitsConvFt(techUnitsConvFt : string): Observable<ProcedureUnitValue[]> {
        return this.httpClient.get(`${this.procedureUnitValueUrl}/find-by-techunitsconvft/${techUnitsConvFt}`, {observe: 'response'})
            .pipe(map(response => response.body as ProcedureUnitValue),
                catchError(this.sharedService.handleError))
    }
    findByAnesUnitsConvFt(anesUnitsConvFt : string): Observable<ProcedureUnitValue[]> {
        return this.httpClient.get(`${this.procedureUnitValueUrl}/find-by-anesunitsconvft/${anesUnitsConvFt}`, {observe: 'response'})
            .pipe(map(response => response.body as ProcedureUnitValue),
                catchError(this.sharedService.handleError))
    }




    createProcedureUnitValue(procedureUnitValue : ProcedureUnitValue): Observable<any> {
        let body = JSON.stringify(procedureUnitValue);
        return this.httpClient.post(this.procedureUnitValueUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateProcedureUnitValue(procedureUnitValue : ProcedureUnitValue, procedureCode : string): Observable<any> {
        let body = JSON.stringify(procedureUnitValue);
        return this.httpClient.put(`${this.procedureUnitValueUrl}/${procedureCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateProcedureUnitValue(procedureUnitValue : ProcedureUnitValue, procedureCode : string): Observable<any> {
        let body = JSON.stringify(procedureUnitValue);
        return this.httpClient.patch(`${this.procedureUnitValueUrl}/${procedureCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteProcedureUnitValue(procedureCode : string): Observable<any> {
        return this.httpClient.delete(`${this.procedureUnitValueUrl}/${procedureCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}