/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SmpAdDiscoveredNodes } from '../api-models/smp-ad-discovered-nodes.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SmpAdDiscoveredNodesService {

    private smpAdDiscoveredNodesUrl: string = `${environment.apiUrl}/smpaddiscoverednodeses`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSmpAdDiscoveredNodeses(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SmpAdDiscoveredNodes[]> {
        var url = `${this.smpAdDiscoveredNodesUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SmpAdDiscoveredNodes[]),
                catchError(this.sharedService.handleError))
    }

    getSmpAdDiscoveredNodes(owner : string): Observable<SmpAdDiscoveredNodes> {
        return this.httpClient.get(`${this.smpAdDiscoveredNodesUrl}/${owner}`, {observe: 'response'})
            .pipe(map(response => response.body as SmpAdDiscoveredNodes),
                catchError(this.sharedService.handleError))
    }

    getSmpAdDiscoveredNodesesCount(): Observable<number> {
        var url = `${this.smpAdDiscoveredNodesUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSmpAdDiscoveredNodes(smpAdDiscoveredNodes : SmpAdDiscoveredNodes): Observable<any> {
        let body = JSON.stringify(smpAdDiscoveredNodes);
        return this.httpClient.post(this.smpAdDiscoveredNodesUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSmpAdDiscoveredNodes(smpAdDiscoveredNodes : SmpAdDiscoveredNodes, owner : string): Observable<any> {
        let body = JSON.stringify(smpAdDiscoveredNodes);
        return this.httpClient.put(`${this.smpAdDiscoveredNodesUrl}/${owner}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSmpAdDiscoveredNodes(smpAdDiscoveredNodes : SmpAdDiscoveredNodes, owner : string): Observable<any> {
        let body = JSON.stringify(smpAdDiscoveredNodes);
        return this.httpClient.patch(`${this.smpAdDiscoveredNodesUrl}/${owner}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSmpAdDiscoveredNodes(owner : string): Observable<any> {
        return this.httpClient.delete(`${this.smpAdDiscoveredNodesUrl}/${owner}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}