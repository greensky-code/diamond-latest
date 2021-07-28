/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { DrgMaster } from '../api-models/drg-master.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class DrgMasterService {

    private drgMasterUrl: string = `${environment.apiUrl}/drgmasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getDrgMasters(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<DrgMaster[]> {
        var url = `${this.drgMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as DrgMaster[]),
                catchError(this.sharedService.handleError))
    }

    getDrgMaster(drgCode : string): Observable<DrgMaster> {
        return this.httpClient.get(`${this.drgMasterUrl}/${drgCode}`, {observe: 'response'})
            .pipe(map(response => response.body as DrgMaster),
                catchError(this.sharedService.handleError))
    }

    getDrgMastersCount(): Observable<number> {
        var url = `${this.drgMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createDrgMaster(drgMaster : DrgMaster): Observable<any> {
        let body = JSON.stringify(drgMaster);
        return this.httpClient.post(this.drgMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateDrgMaster(drgMaster : DrgMaster, drgCode : string): Observable<any> {
        let body = JSON.stringify(drgMaster);
        return this.httpClient.put(`${this.drgMasterUrl}/${drgCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateDrgMaster(drgMaster : DrgMaster, drgCode : string): Observable<any> {
        let body = JSON.stringify(drgMaster);
        return this.httpClient.patch(`${this.drgMasterUrl}/${drgCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteDrgMaster(drgCode : string): Observable<any> {
        return this.httpClient.delete(`${this.drgMasterUrl}/${drgCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}