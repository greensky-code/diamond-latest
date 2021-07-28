/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PmbCombinedGrpSum } from '../api-models/pmb-combined-grp-sum.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PmbCombinedGrpSumService {

    private pmbCombinedGrpSumUrl: string = `${environment.apiUrl}/pmbcombinedgrpsums`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPmbCombinedGrpSums(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PmbCombinedGrpSum[]> {
        var url = `${this.pmbCombinedGrpSumUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PmbCombinedGrpSum[]),
                catchError(this.sharedService.handleError))
    }

    getPmbCombinedGrpSum(seqGroupId : number): Observable<PmbCombinedGrpSum> {
        return this.httpClient.get(`${this.pmbCombinedGrpSumUrl}/${seqGroupId}`, {observe: 'response'})
            .pipe(map(response => response.body as PmbCombinedGrpSum),
                catchError(this.sharedService.handleError))
    }

    getPmbCombinedGrpSumsCount(): Observable<number> {
        var url = `${this.pmbCombinedGrpSumUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createPmbCombinedGrpSum(pmbCombinedGrpSum : PmbCombinedGrpSum): Observable<any> {
        let body = JSON.stringify(pmbCombinedGrpSum);
        return this.httpClient.post(this.pmbCombinedGrpSumUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updatePmbCombinedGrpSum(pmbCombinedGrpSum : PmbCombinedGrpSum, seqGroupId : number): Observable<any> {
        let body = JSON.stringify(pmbCombinedGrpSum);
        return this.httpClient.put(`${this.pmbCombinedGrpSumUrl}/${seqGroupId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdatePmbCombinedGrpSum(pmbCombinedGrpSum : PmbCombinedGrpSum, seqGroupId : number): Observable<any> {
        let body = JSON.stringify(pmbCombinedGrpSum);
        return this.httpClient.patch(`${this.pmbCombinedGrpSumUrl}/${seqGroupId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deletePmbCombinedGrpSum(seqGroupId : number): Observable<any> {
        return this.httpClient.delete(`${this.pmbCombinedGrpSumUrl}/${seqGroupId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}