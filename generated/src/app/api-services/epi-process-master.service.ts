/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { EpiProcessMaster } from '../api-models/epi-process-master.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class EpiProcessMasterService {

    private epiProcessMasterUrl: string = `${environment.apiUrl}/epiprocessmasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getEpiProcessMasters(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<EpiProcessMaster[]> {
        var url = `${this.epiProcessMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as EpiProcessMaster[]),
                catchError(this.sharedService.handleError))
    }

    getEpiProcessMaster(seqProcessId : number): Observable<EpiProcessMaster> {
        return this.httpClient.get(`${this.epiProcessMasterUrl}/${seqProcessId}`, {observe: 'response'})
            .pipe(map(response => response.body as EpiProcessMaster),
                catchError(this.sharedService.handleError))
    }

    getEpiProcessMastersCount(): Observable<number> {
        var url = `${this.epiProcessMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createEpiProcessMaster(epiProcessMaster : EpiProcessMaster): Observable<any> {
        let body = JSON.stringify(epiProcessMaster);
        return this.httpClient.post(this.epiProcessMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateEpiProcessMaster(epiProcessMaster : EpiProcessMaster, seqProcessId : number): Observable<any> {
        let body = JSON.stringify(epiProcessMaster);
        return this.httpClient.put(`${this.epiProcessMasterUrl}/${seqProcessId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateEpiProcessMaster(epiProcessMaster : EpiProcessMaster, seqProcessId : number): Observable<any> {
        let body = JSON.stringify(epiProcessMaster);
        return this.httpClient.patch(`${this.epiProcessMasterUrl}/${seqProcessId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteEpiProcessMaster(seqProcessId : number): Observable<any> {
        return this.httpClient.delete(`${this.epiProcessMasterUrl}/${seqProcessId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}