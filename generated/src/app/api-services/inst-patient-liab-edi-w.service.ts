/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { InstPatientLiabEdiW } from '../api-models/inst-patient-liab-edi-w.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class InstPatientLiabEdiWService {

    private instPatientLiabEdiWUrl: string = `${environment.apiUrl}/instpatientliabediws`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getInstPatientLiabEdiWs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<InstPatientLiabEdiW[]> {
        var url = `${this.instPatientLiabEdiWUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as InstPatientLiabEdiW[]),
                catchError(this.sharedService.handleError))
    }

    getInstPatientLiabEdiW(seqPrediId : number): Observable<InstPatientLiabEdiW> {
        return this.httpClient.get(`${this.instPatientLiabEdiWUrl}/${seqPrediId}`, {observe: 'response'})
            .pipe(map(response => response.body as InstPatientLiabEdiW),
                catchError(this.sharedService.handleError))
    }

    getInstPatientLiabEdiWsCount(): Observable<number> {
        var url = `${this.instPatientLiabEdiWUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createInstPatientLiabEdiW(instPatientLiabEdiW : InstPatientLiabEdiW): Observable<any> {
        let body = JSON.stringify(instPatientLiabEdiW);
        return this.httpClient.post(this.instPatientLiabEdiWUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateInstPatientLiabEdiW(instPatientLiabEdiW : InstPatientLiabEdiW, seqPrediId : number): Observable<any> {
        let body = JSON.stringify(instPatientLiabEdiW);
        return this.httpClient.put(`${this.instPatientLiabEdiWUrl}/${seqPrediId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateInstPatientLiabEdiW(instPatientLiabEdiW : InstPatientLiabEdiW, seqPrediId : number): Observable<any> {
        let body = JSON.stringify(instPatientLiabEdiW);
        return this.httpClient.patch(`${this.instPatientLiabEdiWUrl}/${seqPrediId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteInstPatientLiabEdiW(seqPrediId : number): Observable<any> {
        return this.httpClient.delete(`${this.instPatientLiabEdiWUrl}/${seqPrediId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}