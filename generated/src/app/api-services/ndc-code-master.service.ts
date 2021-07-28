/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { NdcCodeMaster } from '../api-models/ndc-code-master.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class NdcCodeMasterService {

    private ndcCodeMasterUrl: string = `${environment.apiUrl}/ndccodemasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getNdcCodeMasters(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<NdcCodeMaster[]> {
        var url = `${this.ndcCodeMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as NdcCodeMaster[]),
                catchError(this.sharedService.handleError))
    }

    getNdcCodeMaster(ndcCode : string): Observable<NdcCodeMaster> {
        return this.httpClient.get(`${this.ndcCodeMasterUrl}/${ndcCode}`, {observe: 'response'})
            .pipe(map(response => response.body as NdcCodeMaster),
                catchError(this.sharedService.handleError))
    }

    getNdcCodeMastersCount(): Observable<number> {
        var url = `${this.ndcCodeMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createNdcCodeMaster(ndcCodeMaster : NdcCodeMaster): Observable<any> {
        let body = JSON.stringify(ndcCodeMaster);
        return this.httpClient.post(this.ndcCodeMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateNdcCodeMaster(ndcCodeMaster : NdcCodeMaster, ndcCode : string): Observable<any> {
        let body = JSON.stringify(ndcCodeMaster);
        return this.httpClient.put(`${this.ndcCodeMasterUrl}/${ndcCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateNdcCodeMaster(ndcCodeMaster : NdcCodeMaster, ndcCode : string): Observable<any> {
        let body = JSON.stringify(ndcCodeMaster);
        return this.httpClient.patch(`${this.ndcCodeMasterUrl}/${ndcCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteNdcCodeMaster(ndcCode : string): Observable<any> {
        return this.httpClient.delete(`${this.ndcCodeMasterUrl}/${ndcCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}