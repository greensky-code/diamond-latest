/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SmpAdNodes } from '../api-models/smp-ad-nodes.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SmpAdNodesService {

    private smpAdNodesUrl: string = `${environment.apiUrl}/smpadnodeses`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSmpAdNodeses(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SmpAdNodes[]> {
        var url = `${this.smpAdNodesUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SmpAdNodes[]),
                catchError(this.sharedService.handleError))
    }

    getSmpAdNodes(owner : string): Observable<SmpAdNodes> {
        return this.httpClient.get(`${this.smpAdNodesUrl}/${owner}`, {observe: 'response'})
            .pipe(map(response => response.body as SmpAdNodes),
                catchError(this.sharedService.handleError))
    }

    getSmpAdNodesesCount(): Observable<number> {
        var url = `${this.smpAdNodesUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSmpAdNodes(smpAdNodes : SmpAdNodes): Observable<any> {
        let body = JSON.stringify(smpAdNodes);
        return this.httpClient.post(this.smpAdNodesUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSmpAdNodes(smpAdNodes : SmpAdNodes, owner : string): Observable<any> {
        let body = JSON.stringify(smpAdNodes);
        return this.httpClient.put(`${this.smpAdNodesUrl}/${owner}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSmpAdNodes(smpAdNodes : SmpAdNodes, owner : string): Observable<any> {
        let body = JSON.stringify(smpAdNodes);
        return this.httpClient.patch(`${this.smpAdNodesUrl}/${owner}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSmpAdNodes(owner : string): Observable<any> {
        return this.httpClient.delete(`${this.smpAdNodesUrl}/${owner}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}