/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CovProvGroupMaster } from '../api-models/cov-prov-group-master.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CovProvGroupMasterService {

    private covProvGroupMasterUrl: string = `${environment.apiUrl}/covprovgroupmasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCovProvGroupMasters(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CovProvGroupMaster[]> {
        var url = `${this.covProvGroupMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CovProvGroupMaster[]),
                catchError(this.sharedService.handleError))
    }

    getCovProvGroupMaster(seqCovProvGrp : number): Observable<CovProvGroupMaster> {
        return this.httpClient.get(`${this.covProvGroupMasterUrl}/${seqCovProvGrp}`, {observe: 'response'})
            .pipe(map(response => response.body as CovProvGroupMaster),
                catchError(this.sharedService.handleError))
    }

    getCovProvGroupMastersCount(): Observable<number> {
        var url = `${this.covProvGroupMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCovProvGroupMaster(covProvGroupMaster : CovProvGroupMaster): Observable<any> {
        let body = JSON.stringify(covProvGroupMaster);
        return this.httpClient.post(this.covProvGroupMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCovProvGroupMaster(covProvGroupMaster : CovProvGroupMaster, seqCovProvGrp : number): Observable<any> {
        let body = JSON.stringify(covProvGroupMaster);
        return this.httpClient.put(`${this.covProvGroupMasterUrl}/${seqCovProvGrp}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCovProvGroupMaster(covProvGroupMaster : CovProvGroupMaster, seqCovProvGrp : number): Observable<any> {
        let body = JSON.stringify(covProvGroupMaster);
        return this.httpClient.patch(`${this.covProvGroupMasterUrl}/${seqCovProvGrp}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCovProvGroupMaster(seqCovProvGrp : number): Observable<any> {
        return this.httpClient.delete(`${this.covProvGroupMasterUrl}/${seqCovProvGrp}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}