/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProfsvcPatientLiabEdiW } from '../api-models/profsvc-patient-liab-edi-w.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ProfsvcPatientLiabEdiWService {

    private profsvcPatientLiabEdiWUrl: string = `${environment.apiUrl}/profsvcpatientliabediws`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getProfsvcPatientLiabEdiWs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ProfsvcPatientLiabEdiW[]> {
        var url = `${this.profsvcPatientLiabEdiWUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcPatientLiabEdiW[]),
                catchError(this.sharedService.handleError))
    }

    getProfsvcPatientLiabEdiW(seqPrediId : number): Observable<ProfsvcPatientLiabEdiW> {
        return this.httpClient.get(`${this.profsvcPatientLiabEdiWUrl}/${seqPrediId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcPatientLiabEdiW),
                catchError(this.sharedService.handleError))
    }

    getProfsvcPatientLiabEdiWsCount(): Observable<number> {
        var url = `${this.profsvcPatientLiabEdiWUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createProfsvcPatientLiabEdiW(profsvcPatientLiabEdiW : ProfsvcPatientLiabEdiW): Observable<any> {
        let body = JSON.stringify(profsvcPatientLiabEdiW);
        return this.httpClient.post(this.profsvcPatientLiabEdiWUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateProfsvcPatientLiabEdiW(profsvcPatientLiabEdiW : ProfsvcPatientLiabEdiW, seqPrediId : number): Observable<any> {
        let body = JSON.stringify(profsvcPatientLiabEdiW);
        return this.httpClient.put(`${this.profsvcPatientLiabEdiWUrl}/${seqPrediId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateProfsvcPatientLiabEdiW(profsvcPatientLiabEdiW : ProfsvcPatientLiabEdiW, seqPrediId : number): Observable<any> {
        let body = JSON.stringify(profsvcPatientLiabEdiW);
        return this.httpClient.patch(`${this.profsvcPatientLiabEdiWUrl}/${seqPrediId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteProfsvcPatientLiabEdiW(seqPrediId : number): Observable<any> {
        return this.httpClient.delete(`${this.profsvcPatientLiabEdiWUrl}/${seqPrediId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}