/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SmpServiceItem } from '../api-models/smp-service-item.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SmpServiceItemService {

    private smpServiceItemUrl: string = `${environment.apiUrl}/smpserviceitems`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSmpServiceItems(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SmpServiceItem[]> {
        var url = `${this.smpServiceItemUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SmpServiceItem[]),
                catchError(this.sharedService.handleError))
    }

    getSmpServiceItem(owner : string): Observable<SmpServiceItem> {
        return this.httpClient.get(`${this.smpServiceItemUrl}/${owner}`, {observe: 'response'})
            .pipe(map(response => response.body as SmpServiceItem),
                catchError(this.sharedService.handleError))
    }

    getSmpServiceItemsCount(): Observable<number> {
        var url = `${this.smpServiceItemUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSmpServiceItem(smpServiceItem : SmpServiceItem): Observable<any> {
        let body = JSON.stringify(smpServiceItem);
        return this.httpClient.post(this.smpServiceItemUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSmpServiceItem(smpServiceItem : SmpServiceItem, owner : string): Observable<any> {
        let body = JSON.stringify(smpServiceItem);
        return this.httpClient.put(`${this.smpServiceItemUrl}/${owner}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSmpServiceItem(smpServiceItem : SmpServiceItem, owner : string): Observable<any> {
        let body = JSON.stringify(smpServiceItem);
        return this.httpClient.patch(`${this.smpServiceItemUrl}/${owner}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSmpServiceItem(owner : string): Observable<any> {
        return this.httpClient.delete(`${this.smpServiceItemUrl}/${owner}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}