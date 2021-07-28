/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProfsvcClaimDetailSpinal } from '../api-models/profsvc-claim-detail-spinal.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ProfsvcClaimDetailSpinalService {

    private profsvcClaimDetailSpinalUrl: string = `${environment.apiUrl}/profsvcclaimdetailspinals`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getProfsvcClaimDetailSpinals(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ProfsvcClaimDetailSpinal[]> {
        var url = `${this.profsvcClaimDetailSpinalUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimDetailSpinal[]),
                catchError(this.sharedService.handleError))
    }

    getProfsvcClaimDetailSpinal(seqClaimId : number): Observable<ProfsvcClaimDetailSpinal> {
        return this.httpClient.get(`${this.profsvcClaimDetailSpinalUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimDetailSpinal),
                catchError(this.sharedService.handleError))
    }

    getProfsvcClaimDetailSpinalsCount(): Observable<number> {
        var url = `${this.profsvcClaimDetailSpinalUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createProfsvcClaimDetailSpinal(profsvcClaimDetailSpinal : ProfsvcClaimDetailSpinal): Observable<any> {
        let body = JSON.stringify(profsvcClaimDetailSpinal);
        return this.httpClient.post(this.profsvcClaimDetailSpinalUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateProfsvcClaimDetailSpinal(profsvcClaimDetailSpinal : ProfsvcClaimDetailSpinal, seqClaimId : number): Observable<any> {
        let body = JSON.stringify(profsvcClaimDetailSpinal);
        return this.httpClient.put(`${this.profsvcClaimDetailSpinalUrl}/${seqClaimId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateProfsvcClaimDetailSpinal(profsvcClaimDetailSpinal : ProfsvcClaimDetailSpinal, seqClaimId : number): Observable<any> {
        let body = JSON.stringify(profsvcClaimDetailSpinal);
        return this.httpClient.patch(`${this.profsvcClaimDetailSpinalUrl}/${seqClaimId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteProfsvcClaimDetailSpinal(seqClaimId : number): Observable<any> {
        return this.httpClient.delete(`${this.profsvcClaimDetailSpinalUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}