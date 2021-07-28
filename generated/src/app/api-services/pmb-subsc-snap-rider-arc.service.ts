/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PmbSubscSnapRiderArc } from '../api-models/pmb-subsc-snap-rider-arc.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PmbSubscSnapRiderArcService {

    private pmbSubscSnapRiderArcUrl: string = `${environment.apiUrl}/pmbsubscsnapriderarcs`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPmbSubscSnapRiderArcs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PmbSubscSnapRiderArc[]> {
        var url = `${this.pmbSubscSnapRiderArcUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PmbSubscSnapRiderArc[]),
                catchError(this.sharedService.handleError))
    }

    getPmbSubscSnapRiderArc(seqSubsId : number): Observable<PmbSubscSnapRiderArc> {
        return this.httpClient.get(`${this.pmbSubscSnapRiderArcUrl}/${seqSubsId}`, {observe: 'response'})
            .pipe(map(response => response.body as PmbSubscSnapRiderArc),
                catchError(this.sharedService.handleError))
    }

    getPmbSubscSnapRiderArcsCount(): Observable<number> {
        var url = `${this.pmbSubscSnapRiderArcUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createPmbSubscSnapRiderArc(pmbSubscSnapRiderArc : PmbSubscSnapRiderArc): Observable<any> {
        let body = JSON.stringify(pmbSubscSnapRiderArc);
        return this.httpClient.post(this.pmbSubscSnapRiderArcUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updatePmbSubscSnapRiderArc(pmbSubscSnapRiderArc : PmbSubscSnapRiderArc, seqSubsId : number): Observable<any> {
        let body = JSON.stringify(pmbSubscSnapRiderArc);
        return this.httpClient.put(`${this.pmbSubscSnapRiderArcUrl}/${seqSubsId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdatePmbSubscSnapRiderArc(pmbSubscSnapRiderArc : PmbSubscSnapRiderArc, seqSubsId : number): Observable<any> {
        let body = JSON.stringify(pmbSubscSnapRiderArc);
        return this.httpClient.patch(`${this.pmbSubscSnapRiderArcUrl}/${seqSubsId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deletePmbSubscSnapRiderArc(seqSubsId : number): Observable<any> {
        return this.httpClient.delete(`${this.pmbSubscSnapRiderArcUrl}/${seqSubsId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}