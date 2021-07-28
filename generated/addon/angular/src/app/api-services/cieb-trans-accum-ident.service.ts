/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebTransAccumIdent } from '../api-models/cieb-trans-accum-ident.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class CiebTransAccumIdentService {

    private ciebTransAccumIdentUrl: string = `${environment.apiUrl}/ciebtransaccumidents`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCiebTransAccumIdents(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CiebTransAccumIdent[]> {
        var url = `${this.ciebTransAccumIdentUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebTransAccumIdent[]),
                catchError(this.sharedService.handleError))
    }

    getCiebTransAccumIdent(seqAccumId : number): Observable<CiebTransAccumIdent> {
        return this.httpClient.get(`${this.ciebTransAccumIdentUrl}/${seqAccumId}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebTransAccumIdent),
                catchError(this.sharedService.handleError))
    }

    getCiebTransAccumIdentsCount(): Observable<number> {
        var url = `${this.ciebTransAccumIdentUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqTransId(seqTransId : number): Observable<CiebTransAccumIdent[]> {
        return this.httpClient.get(`${this.ciebTransAccumIdentUrl}/find-by-seqtransid/${seqTransId}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebTransAccumIdent),
                catchError(this.sharedService.handleError))
    }




    createCiebTransAccumIdent(ciebTransAccumIdent : CiebTransAccumIdent): Observable<any> {
        let body = JSON.stringify(ciebTransAccumIdent);
        return this.httpClient.post(this.ciebTransAccumIdentUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCiebTransAccumIdent(ciebTransAccumIdent : CiebTransAccumIdent, seqAccumId : number): Observable<any> {
        let body = JSON.stringify(ciebTransAccumIdent);
        return this.httpClient.put(`${this.ciebTransAccumIdentUrl}/${seqAccumId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCiebTransAccumIdent(ciebTransAccumIdent : CiebTransAccumIdent, seqAccumId : number): Observable<any> {
        let body = JSON.stringify(ciebTransAccumIdent);
        return this.httpClient.patch(`${this.ciebTransAccumIdentUrl}/${seqAccumId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCiebTransAccumIdent(seqAccumId : number): Observable<any> {
        return this.httpClient.delete(`${this.ciebTransAccumIdentUrl}/${seqAccumId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}