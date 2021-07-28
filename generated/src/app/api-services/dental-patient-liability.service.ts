/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { DentalPatientLiability } from '../api-models/dental-patient-liability.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class DentalPatientLiabilityService {

    private dentalPatientLiabilityUrl: string = `${environment.apiUrl}/dentalpatientliabilitys`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getDentalPatientLiabilitys(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<DentalPatientLiability[]> {
        var url = `${this.dentalPatientLiabilityUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as DentalPatientLiability[]),
                catchError(this.sharedService.handleError))
    }

    getDentalPatientLiability(seqClaimId : number): Observable<DentalPatientLiability> {
        return this.httpClient.get(`${this.dentalPatientLiabilityUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body as DentalPatientLiability),
                catchError(this.sharedService.handleError))
    }

    getDentalPatientLiabilitysCount(): Observable<number> {
        var url = `${this.dentalPatientLiabilityUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createDentalPatientLiability(dentalPatientLiability : DentalPatientLiability): Observable<any> {
        let body = JSON.stringify(dentalPatientLiability);
        return this.httpClient.post(this.dentalPatientLiabilityUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateDentalPatientLiability(dentalPatientLiability : DentalPatientLiability, seqClaimId : number): Observable<any> {
        let body = JSON.stringify(dentalPatientLiability);
        return this.httpClient.put(`${this.dentalPatientLiabilityUrl}/${seqClaimId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateDentalPatientLiability(dentalPatientLiability : DentalPatientLiability, seqClaimId : number): Observable<any> {
        let body = JSON.stringify(dentalPatientLiability);
        return this.httpClient.patch(`${this.dentalPatientLiabilityUrl}/${seqClaimId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteDentalPatientLiability(seqClaimId : number): Observable<any> {
        return this.httpClient.delete(`${this.dentalPatientLiabilityUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}