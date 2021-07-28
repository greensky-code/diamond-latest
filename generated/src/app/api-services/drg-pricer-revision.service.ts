/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { DrgPricerRevision } from '../api-models/drg-pricer-revision.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class DrgPricerRevisionService {

    private drgPricerRevisionUrl: string = `${environment.apiUrl}/drgpricerrevisions`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getDrgPricerRevisions(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<DrgPricerRevision[]> {
        var url = `${this.drgPricerRevisionUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as DrgPricerRevision[]),
                catchError(this.sharedService.handleError))
    }

    getDrgPricerRevision(drgPricerId : string): Observable<DrgPricerRevision> {
        return this.httpClient.get(`${this.drgPricerRevisionUrl}/${drgPricerId}`, {observe: 'response'})
            .pipe(map(response => response.body as DrgPricerRevision),
                catchError(this.sharedService.handleError))
    }

    getDrgPricerRevisionsCount(): Observable<number> {
        var url = `${this.drgPricerRevisionUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createDrgPricerRevision(drgPricerRevision : DrgPricerRevision): Observable<any> {
        let body = JSON.stringify(drgPricerRevision);
        return this.httpClient.post(this.drgPricerRevisionUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateDrgPricerRevision(drgPricerRevision : DrgPricerRevision, drgPricerId : string): Observable<any> {
        let body = JSON.stringify(drgPricerRevision);
        return this.httpClient.put(`${this.drgPricerRevisionUrl}/${drgPricerId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateDrgPricerRevision(drgPricerRevision : DrgPricerRevision, drgPricerId : string): Observable<any> {
        let body = JSON.stringify(drgPricerRevision);
        return this.httpClient.patch(`${this.drgPricerRevisionUrl}/${drgPricerId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteDrgPricerRevision(drgPricerId : string): Observable<any> {
        return this.httpClient.delete(`${this.drgPricerRevisionUrl}/${drgPricerId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}