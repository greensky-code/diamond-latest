/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { RiderMaster } from '../api-models/rider-master.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class RiderMasterService {

    private riderMasterUrl: string = `${environment.apiUrl}/ridermasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getRiderMasters(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<RiderMaster[]> {
        var url = `${this.riderMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as RiderMaster[]),
                catchError(this.sharedService.handleError))
    }

    getRiderMaster(riderCode : string): Observable<RiderMaster> {
        return this.httpClient.get(`${this.riderMasterUrl}/${riderCode}`, {observe: 'response'})
            .pipe(map(response => response.body as RiderMaster),
                catchError(this.sharedService.handleError))
    }

    getRiderMastersCount(): Observable<number> {
        var url = `${this.riderMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createRiderMaster(riderMaster : RiderMaster): Observable<any> {
        let body = JSON.stringify(riderMaster);
        return this.httpClient.post(this.riderMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateRiderMaster(riderMaster : RiderMaster, riderCode : string): Observable<any> {
        let body = JSON.stringify(riderMaster);
        return this.httpClient.put(`${this.riderMasterUrl}/${riderCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateRiderMaster(riderMaster : RiderMaster, riderCode : string): Observable<any> {
        let body = JSON.stringify(riderMaster);
        return this.httpClient.patch(`${this.riderMasterUrl}/${riderCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteRiderMaster(riderCode : string): Observable<any> {
        return this.httpClient.delete(`${this.riderMasterUrl}/${riderCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}