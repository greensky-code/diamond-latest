/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PmbSnapWorkRider } from '../api-models/pmb-snap-work-rider.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PmbSnapWorkRiderService {

    private pmbSnapWorkRiderUrl: string = `${environment.apiUrl}/pmbsnapworkriders`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPmbSnapWorkRiders(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PmbSnapWorkRider[]> {
        var url = `${this.pmbSnapWorkRiderUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PmbSnapWorkRider[]),
                catchError(this.sharedService.handleError))
    }

    getPmbSnapWorkRider(seqGpbilId : number): Observable<PmbSnapWorkRider> {
        return this.httpClient.get(`${this.pmbSnapWorkRiderUrl}/${seqGpbilId}`, {observe: 'response'})
            .pipe(map(response => response.body as PmbSnapWorkRider),
                catchError(this.sharedService.handleError))
    }

    getPmbSnapWorkRidersCount(): Observable<number> {
        var url = `${this.pmbSnapWorkRiderUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createPmbSnapWorkRider(pmbSnapWorkRider : PmbSnapWorkRider): Observable<any> {
        let body = JSON.stringify(pmbSnapWorkRider);
        return this.httpClient.post(this.pmbSnapWorkRiderUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updatePmbSnapWorkRider(pmbSnapWorkRider : PmbSnapWorkRider, seqGpbilId : number): Observable<any> {
        let body = JSON.stringify(pmbSnapWorkRider);
        return this.httpClient.put(`${this.pmbSnapWorkRiderUrl}/${seqGpbilId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdatePmbSnapWorkRider(pmbSnapWorkRider : PmbSnapWorkRider, seqGpbilId : number): Observable<any> {
        let body = JSON.stringify(pmbSnapWorkRider);
        return this.httpClient.patch(`${this.pmbSnapWorkRiderUrl}/${seqGpbilId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deletePmbSnapWorkRider(seqGpbilId : number): Observable<any> {
        return this.httpClient.delete(`${this.pmbSnapWorkRiderUrl}/${seqGpbilId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}