/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProfsvcPatientLiability } from '../api-models/profsvc-patient-liability.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ProfsvcPatientLiabilityService {

    private profsvcPatientLiabilityUrl: string = `${environment.apiUrl}/profsvcpatientliabilitys`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getProfsvcPatientLiabilitys(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ProfsvcPatientLiability[]> {
        var url = `${this.profsvcPatientLiabilityUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcPatientLiability[]),
                catchError(this.sharedService.handleError))
    }

    getProfsvcPatientLiability(seqClaimId : number): Observable<ProfsvcPatientLiability> {
        return this.httpClient.get(`${this.profsvcPatientLiabilityUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcPatientLiability),
                catchError(this.sharedService.handleError))
    }

    getProfsvcPatientLiabilitysCount(): Observable<number> {
        var url = `${this.profsvcPatientLiabilityUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createProfsvcPatientLiability(profsvcPatientLiability : ProfsvcPatientLiability): Observable<any> {
        let body = JSON.stringify(profsvcPatientLiability);
        return this.httpClient.post(this.profsvcPatientLiabilityUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateProfsvcPatientLiability(profsvcPatientLiability : ProfsvcPatientLiability, seqClaimId : number): Observable<any> {
        let body = JSON.stringify(profsvcPatientLiability);
        return this.httpClient.put(`${this.profsvcPatientLiabilityUrl}/${seqClaimId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateProfsvcPatientLiability(profsvcPatientLiability : ProfsvcPatientLiability, seqClaimId : number): Observable<any> {
        let body = JSON.stringify(profsvcPatientLiability);
        return this.httpClient.patch(`${this.profsvcPatientLiabilityUrl}/${seqClaimId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteProfsvcPatientLiability(seqClaimId : number): Observable<any> {
        return this.httpClient.delete(`${this.profsvcPatientLiabilityUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}