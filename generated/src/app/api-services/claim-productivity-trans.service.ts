/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ClaimProductivityTrans } from '../api-models/claim-productivity-trans.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ClaimProductivityTransService {

    private claimProductivityTransUrl: string = `${environment.apiUrl}/claimproductivitytranss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getClaimProductivityTranss(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ClaimProductivityTrans[]> {
        var url = `${this.claimProductivityTransUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ClaimProductivityTrans[]),
                catchError(this.sharedService.handleError))
    }

    getClaimProductivityTrans(seqTransId : number): Observable<ClaimProductivityTrans> {
        return this.httpClient.get(`${this.claimProductivityTransUrl}/${seqTransId}`, {observe: 'response'})
            .pipe(map(response => response.body as ClaimProductivityTrans),
                catchError(this.sharedService.handleError))
    }

    getClaimProductivityTranssCount(): Observable<number> {
        var url = `${this.claimProductivityTransUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqGroupId(seqGroupId : number): Observable<ClaimProductivityTrans[]> {
        return this.httpClient.get(`${this.claimProductivityTransUrl}/find-by-seqgroupid/${seqGroupId}`, {observe: 'response'})
            .pipe(map(response => response.body as ClaimProductivityTrans),
                catchError(this.sharedService.handleError))
    }
    findByLineOfBusiness(lineOfBusiness : string): Observable<ClaimProductivityTrans[]> {
        return this.httpClient.get(`${this.claimProductivityTransUrl}/find-by-lineofbusiness/${lineOfBusiness}`, {observe: 'response'})
            .pipe(map(response => response.body as ClaimProductivityTrans),
                catchError(this.sharedService.handleError))
    }




    createClaimProductivityTrans(claimProductivityTrans : ClaimProductivityTrans): Observable<any> {
        let body = JSON.stringify(claimProductivityTrans);
        return this.httpClient.post(this.claimProductivityTransUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateClaimProductivityTrans(claimProductivityTrans : ClaimProductivityTrans, seqTransId : number): Observable<any> {
        let body = JSON.stringify(claimProductivityTrans);
        return this.httpClient.put(`${this.claimProductivityTransUrl}/${seqTransId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateClaimProductivityTrans(claimProductivityTrans : ClaimProductivityTrans, seqTransId : number): Observable<any> {
        let body = JSON.stringify(claimProductivityTrans);
        return this.httpClient.patch(`${this.claimProductivityTransUrl}/${seqTransId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteClaimProductivityTrans(seqTransId : number): Observable<any> {
        return this.httpClient.delete(`${this.claimProductivityTransUrl}/${seqTransId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}