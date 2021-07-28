/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcedureCodeMaster } from '../api-models/procedure-code-master.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ProcedureCodeMasterService {

    private procedureCodeMasterUrl: string = `${environment.apiUrl}/procedurecodemasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getProcedureCodeMasters(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ProcedureCodeMaster[]> {
        var url = `${this.procedureCodeMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ProcedureCodeMaster[]),
                catchError(this.sharedService.handleError))
    }

    getProcedureCodeMaster(procedureCode : string): Observable<ProcedureCodeMaster> {
        return this.httpClient.get(`${this.procedureCodeMasterUrl}/${procedureCode}`, {observe: 'response'})
            .pipe(map(response => response.body as ProcedureCodeMaster),
                catchError(this.sharedService.handleError))
    }

    getProcedureCodeMastersCount(): Observable<number> {
        var url = `${this.procedureCodeMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByHoldReason(holdReason : string): Observable<ProcedureCodeMaster[]> {
        return this.httpClient.get(`${this.procedureCodeMasterUrl}/find-by-holdreason/${holdReason}`, {observe: 'response'})
            .pipe(map(response => response.body as ProcedureCodeMaster),
                catchError(this.sharedService.handleError))
    }




    createProcedureCodeMaster(procedureCodeMaster : ProcedureCodeMaster): Observable<any> {
        let body = JSON.stringify(procedureCodeMaster);
        return this.httpClient.post(this.procedureCodeMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateProcedureCodeMaster(procedureCodeMaster : ProcedureCodeMaster, procedureCode : string): Observable<any> {
        let body = JSON.stringify(procedureCodeMaster);
        return this.httpClient.put(`${this.procedureCodeMasterUrl}/${procedureCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateProcedureCodeMaster(procedureCodeMaster : ProcedureCodeMaster, procedureCode : string): Observable<any> {
        let body = JSON.stringify(procedureCodeMaster);
        return this.httpClient.patch(`${this.procedureCodeMasterUrl}/${procedureCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteProcedureCodeMaster(procedureCode : string): Observable<any> {
        return this.httpClient.delete(`${this.procedureCodeMasterUrl}/${procedureCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}