/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PmbSubscSnapshotArc } from '../api-models/pmb-subsc-snapshot-arc.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PmbSubscSnapshotArcService {

    private pmbSubscSnapshotArcUrl: string = `${environment.apiUrl}/pmbsubscsnapshotarcs`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPmbSubscSnapshotArcs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PmbSubscSnapshotArc[]> {
        var url = `${this.pmbSubscSnapshotArcUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PmbSubscSnapshotArc[]),
                catchError(this.sharedService.handleError))
    }

    getPmbSubscSnapshotArc(seqSubsId : number): Observable<PmbSubscSnapshotArc> {
        return this.httpClient.get(`${this.pmbSubscSnapshotArcUrl}/${seqSubsId}`, {observe: 'response'})
            .pipe(map(response => response.body as PmbSubscSnapshotArc),
                catchError(this.sharedService.handleError))
    }

    getPmbSubscSnapshotArcsCount(): Observable<number> {
        var url = `${this.pmbSubscSnapshotArcUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqGroupId(seqGroupId : number): Observable<PmbSubscSnapshotArc[]> {
        return this.httpClient.get(`${this.pmbSubscSnapshotArcUrl}/find-by-seqgroupid/${seqGroupId}`, {observe: 'response'})
            .pipe(map(response => response.body as PmbSubscSnapshotArc),
                catchError(this.sharedService.handleError))
    }
    findBySeqSubsId(seqSubsId : number): Observable<PmbSubscSnapshotArc[]> {
        return this.httpClient.get(`${this.pmbSubscSnapshotArcUrl}/find-by-seqsubsid/${seqSubsId}`, {observe: 'response'})
            .pipe(map(response => response.body as PmbSubscSnapshotArc),
                catchError(this.sharedService.handleError))
    }




    createPmbSubscSnapshotArc(pmbSubscSnapshotArc : PmbSubscSnapshotArc): Observable<any> {
        let body = JSON.stringify(pmbSubscSnapshotArc);
        return this.httpClient.post(this.pmbSubscSnapshotArcUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updatePmbSubscSnapshotArc(pmbSubscSnapshotArc : PmbSubscSnapshotArc, seqSubsId : number): Observable<any> {
        let body = JSON.stringify(pmbSubscSnapshotArc);
        return this.httpClient.put(`${this.pmbSubscSnapshotArcUrl}/${seqSubsId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdatePmbSubscSnapshotArc(pmbSubscSnapshotArc : PmbSubscSnapshotArc, seqSubsId : number): Observable<any> {
        let body = JSON.stringify(pmbSubscSnapshotArc);
        return this.httpClient.patch(`${this.pmbSubscSnapshotArcUrl}/${seqSubsId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deletePmbSubscSnapshotArc(seqSubsId : number): Observable<any> {
        return this.httpClient.delete(`${this.pmbSubscSnapshotArcUrl}/${seqSubsId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}