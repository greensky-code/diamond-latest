/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PmbSubscSnapRider } from '../api-models/pmb-subsc-snap-rider.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PmbSubscSnapRiderService {

    private pmbSubscSnapRiderUrl: string = `${environment.apiUrl}/pmbsubscsnapriders`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPmbSubscSnapRiders(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PmbSubscSnapRider[]> {
        var url = `${this.pmbSubscSnapRiderUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PmbSubscSnapRider[]),
                catchError(this.sharedService.handleError))
    }

    getPmbSubscSnapRider(seqSubsId : number): Observable<PmbSubscSnapRider> {
        return this.httpClient.get(`${this.pmbSubscSnapRiderUrl}/${seqSubsId}`, {observe: 'response'})
            .pipe(map(response => response.body as PmbSubscSnapRider),
                catchError(this.sharedService.handleError))
    }

    getPmbSubscSnapRidersCount(): Observable<number> {
        var url = `${this.pmbSubscSnapRiderUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createPmbSubscSnapRider(pmbSubscSnapRider : PmbSubscSnapRider): Observable<any> {
        let body = JSON.stringify(pmbSubscSnapRider);
        return this.httpClient.post(this.pmbSubscSnapRiderUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updatePmbSubscSnapRider(pmbSubscSnapRider : PmbSubscSnapRider, seqSubsId : number): Observable<any> {
        let body = JSON.stringify(pmbSubscSnapRider);
        return this.httpClient.put(`${this.pmbSubscSnapRiderUrl}/${seqSubsId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdatePmbSubscSnapRider(pmbSubscSnapRider : PmbSubscSnapRider, seqSubsId : number): Observable<any> {
        let body = JSON.stringify(pmbSubscSnapRider);
        return this.httpClient.patch(`${this.pmbSubscSnapRiderUrl}/${seqSubsId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deletePmbSubscSnapRider(seqSubsId : number): Observable<any> {
        return this.httpClient.delete(`${this.pmbSubscSnapRiderUrl}/${seqSubsId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}