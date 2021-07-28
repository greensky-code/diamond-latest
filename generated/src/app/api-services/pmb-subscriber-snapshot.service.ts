/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PmbSubscriberSnapshot } from '../api-models/pmb-subscriber-snapshot.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PmbSubscriberSnapshotService {

    private pmbSubscriberSnapshotUrl: string = `${environment.apiUrl}/pmbsubscribersnapshots`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPmbSubscriberSnapshots(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PmbSubscriberSnapshot[]> {
        var url = `${this.pmbSubscriberSnapshotUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PmbSubscriberSnapshot[]),
                catchError(this.sharedService.handleError))
    }

    getPmbSubscriberSnapshot(seqSubsId : number): Observable<PmbSubscriberSnapshot> {
        return this.httpClient.get(`${this.pmbSubscriberSnapshotUrl}/${seqSubsId}`, {observe: 'response'})
            .pipe(map(response => response.body as PmbSubscriberSnapshot),
                catchError(this.sharedService.handleError))
    }

    getPmbSubscriberSnapshotsCount(): Observable<number> {
        var url = `${this.pmbSubscriberSnapshotUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqSubsId(seqSubsId : number): Observable<PmbSubscriberSnapshot[]> {
        return this.httpClient.get(`${this.pmbSubscriberSnapshotUrl}/find-by-seqsubsid/${seqSubsId}`, {observe: 'response'})
            .pipe(map(response => response.body as PmbSubscriberSnapshot),
                catchError(this.sharedService.handleError))
    }
    findBySeqGroupId(seqGroupId : number): Observable<PmbSubscriberSnapshot[]> {
        return this.httpClient.get(`${this.pmbSubscriberSnapshotUrl}/find-by-seqgroupid/${seqGroupId}`, {observe: 'response'})
            .pipe(map(response => response.body as PmbSubscriberSnapshot),
                catchError(this.sharedService.handleError))
    }




    createPmbSubscriberSnapshot(pmbSubscriberSnapshot : PmbSubscriberSnapshot): Observable<any> {
        let body = JSON.stringify(pmbSubscriberSnapshot);
        return this.httpClient.post(this.pmbSubscriberSnapshotUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updatePmbSubscriberSnapshot(pmbSubscriberSnapshot : PmbSubscriberSnapshot, seqSubsId : number): Observable<any> {
        let body = JSON.stringify(pmbSubscriberSnapshot);
        return this.httpClient.put(`${this.pmbSubscriberSnapshotUrl}/${seqSubsId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdatePmbSubscriberSnapshot(pmbSubscriberSnapshot : PmbSubscriberSnapshot, seqSubsId : number): Observable<any> {
        let body = JSON.stringify(pmbSubscriberSnapshot);
        return this.httpClient.patch(`${this.pmbSubscriberSnapshotUrl}/${seqSubsId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deletePmbSubscriberSnapshot(seqSubsId : number): Observable<any> {
        return this.httpClient.delete(`${this.pmbSubscriberSnapshotUrl}/${seqSubsId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}