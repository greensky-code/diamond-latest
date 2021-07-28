/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { LineOfBusinessMaster } from '../api-models/line-of-business-master.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class LineOfBusinessMasterService {

    private lineOfBusinessMasterUrl: string = `${environment.apiUrl}/linesofbusinessmaster`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getLinesOfBusinessMaster(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<LineOfBusinessMaster[]> {
        var url = `${this.lineOfBusinessMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as LineOfBusinessMaster[]),
                catchError(this.sharedService.handleError))
    }

    getLineOfBusinessMaster(lineOfBusiness : string): Observable<LineOfBusinessMaster> {
        return this.httpClient.get(`${this.lineOfBusinessMasterUrl}/${lineOfBusiness}`, {observe: 'response'})
            .pipe(map(response => response.body as LineOfBusinessMaster),
                catchError(this.sharedService.handleError))
    }

    getLinesOfBusinessMasterCount(): Observable<number> {
        var url = `${this.lineOfBusinessMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByNonParReasonCode(nonParReasonCode : string): Observable<LineOfBusinessMaster[]> {
        return this.httpClient.get(`${this.lineOfBusinessMasterUrl}/find-by-nonparreasoncode/${nonParReasonCode}`, {observe: 'response'})
            .pipe(map(response => response.body as LineOfBusinessMaster),
                catchError(this.sharedService.handleError))
    }
    findByParReasonCode(parReasonCode : string): Observable<LineOfBusinessMaster[]> {
        return this.httpClient.get(`${this.lineOfBusinessMasterUrl}/find-by-parreasoncode/${parReasonCode}`, {observe: 'response'})
            .pipe(map(response => response.body as LineOfBusinessMaster),
                catchError(this.sharedService.handleError))
    }
    findByTargetRevReason(targetRevReason : string): Observable<LineOfBusinessMaster[]> {
        return this.httpClient.get(`${this.lineOfBusinessMasterUrl}/find-by-targetrevreason/${targetRevReason}`, {observe: 'response'})
            .pipe(map(response => response.body as LineOfBusinessMaster),
                catchError(this.sharedService.handleError))
    }
    findBySeqDefPcp(seqDefPcp : number): Observable<LineOfBusinessMaster[]> {
        return this.httpClient.get(`${this.lineOfBusinessMasterUrl}/find-by-seqdefpcp/${seqDefPcp}`, {observe: 'response'})
            .pipe(map(response => response.body as LineOfBusinessMaster),
                catchError(this.sharedService.handleError))
    }
    findBySeqFailPcp(seqFailPcp : number): Observable<LineOfBusinessMaster[]> {
        return this.httpClient.get(`${this.lineOfBusinessMasterUrl}/find-by-seqfailpcp/${seqFailPcp}`, {observe: 'response'})
            .pipe(map(response => response.body as LineOfBusinessMaster),
                catchError(this.sharedService.handleError))
    }




    createLineOfBusinessMaster(lineOfBusinessMaster : LineOfBusinessMaster): Observable<any> {
        let body = JSON.stringify(lineOfBusinessMaster);
        return this.httpClient.post(this.lineOfBusinessMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateLineOfBusinessMaster(lineOfBusinessMaster : LineOfBusinessMaster, lineOfBusiness : string): Observable<any> {
        let body = JSON.stringify(lineOfBusinessMaster);
        return this.httpClient.put(`${this.lineOfBusinessMasterUrl}/${lineOfBusiness}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateLineOfBusinessMaster(lineOfBusinessMaster : LineOfBusinessMaster, lineOfBusiness : string): Observable<any> {
        let body = JSON.stringify(lineOfBusinessMaster);
        return this.httpClient.patch(`${this.lineOfBusinessMasterUrl}/${lineOfBusiness}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteLineOfBusinessMaster(lineOfBusiness : string): Observable<any> {
        return this.httpClient.delete(`${this.lineOfBusinessMasterUrl}/${lineOfBusiness}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}