/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { InstPatientLiability } from '../api-models/inst-patient-liability.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class InstPatientLiabilityService {

    private instPatientLiabilityUrl: string = `${environment.apiUrl}/instpatientliabilitys`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getInstPatientLiabilitys(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<InstPatientLiability[]> {
        var url = `${this.instPatientLiabilityUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as InstPatientLiability[]),
                catchError(this.sharedService.handleError))
    }

    getInstPatientLiability(seqClaimId : number): Observable<InstPatientLiability> {
        return this.httpClient.get(`${this.instPatientLiabilityUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body as InstPatientLiability),
                catchError(this.sharedService.handleError))
    }

    getInstPatientLiabilitysCount(): Observable<number> {
        var url = `${this.instPatientLiabilityUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createInstPatientLiability(instPatientLiability : InstPatientLiability): Observable<any> {
        let body = JSON.stringify(instPatientLiability);
        return this.httpClient.post(this.instPatientLiabilityUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateInstPatientLiability(instPatientLiability : InstPatientLiability, seqClaimId : number): Observable<any> {
        let body = JSON.stringify(instPatientLiability);
        return this.httpClient.put(`${this.instPatientLiabilityUrl}/${seqClaimId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateInstPatientLiability(instPatientLiability : InstPatientLiability, seqClaimId : number): Observable<any> {
        let body = JSON.stringify(instPatientLiability);
        return this.httpClient.patch(`${this.instPatientLiabilityUrl}/${seqClaimId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteInstPatientLiability(seqClaimId : number): Observable<any> {
        return this.httpClient.delete(`${this.instPatientLiabilityUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}