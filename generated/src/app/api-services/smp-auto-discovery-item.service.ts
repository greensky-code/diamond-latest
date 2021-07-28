/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SmpAutoDiscoveryItem } from '../api-models/smp-auto-discovery-item.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SmpAutoDiscoveryItemService {

    private smpAutoDiscoveryItemUrl: string = `${environment.apiUrl}/smpautodiscoveryitems`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSmpAutoDiscoveryItems(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SmpAutoDiscoveryItem[]> {
        var url = `${this.smpAutoDiscoveryItemUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SmpAutoDiscoveryItem[]),
                catchError(this.sharedService.handleError))
    }

    getSmpAutoDiscoveryItem(owner : string): Observable<SmpAutoDiscoveryItem> {
        return this.httpClient.get(`${this.smpAutoDiscoveryItemUrl}/${owner}`, {observe: 'response'})
            .pipe(map(response => response.body as SmpAutoDiscoveryItem),
                catchError(this.sharedService.handleError))
    }

    getSmpAutoDiscoveryItemsCount(): Observable<number> {
        var url = `${this.smpAutoDiscoveryItemUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSmpAutoDiscoveryItem(smpAutoDiscoveryItem : SmpAutoDiscoveryItem): Observable<any> {
        let body = JSON.stringify(smpAutoDiscoveryItem);
        return this.httpClient.post(this.smpAutoDiscoveryItemUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSmpAutoDiscoveryItem(smpAutoDiscoveryItem : SmpAutoDiscoveryItem, owner : string): Observable<any> {
        let body = JSON.stringify(smpAutoDiscoveryItem);
        return this.httpClient.put(`${this.smpAutoDiscoveryItemUrl}/${owner}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSmpAutoDiscoveryItem(smpAutoDiscoveryItem : SmpAutoDiscoveryItem, owner : string): Observable<any> {
        let body = JSON.stringify(smpAutoDiscoveryItem);
        return this.httpClient.patch(`${this.smpAutoDiscoveryItemUrl}/${owner}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSmpAutoDiscoveryItem(owner : string): Observable<any> {
        return this.httpClient.delete(`${this.smpAutoDiscoveryItemUrl}/${owner}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}