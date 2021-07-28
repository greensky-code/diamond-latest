/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SmpServiceGroupItem } from '../api-models/smp-service-group-item.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SmpServiceGroupItemService {

    private smpServiceGroupItemUrl: string = `${environment.apiUrl}/smpservicegroupitems`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSmpServiceGroupItems(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SmpServiceGroupItem[]> {
        var url = `${this.smpServiceGroupItemUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SmpServiceGroupItem[]),
                catchError(this.sharedService.handleError))
    }

    getSmpServiceGroupItem(owner : string): Observable<SmpServiceGroupItem> {
        return this.httpClient.get(`${this.smpServiceGroupItemUrl}/${owner}`, {observe: 'response'})
            .pipe(map(response => response.body as SmpServiceGroupItem),
                catchError(this.sharedService.handleError))
    }

    getSmpServiceGroupItemsCount(): Observable<number> {
        var url = `${this.smpServiceGroupItemUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSmpServiceGroupItem(smpServiceGroupItem : SmpServiceGroupItem): Observable<any> {
        let body = JSON.stringify(smpServiceGroupItem);
        return this.httpClient.post(this.smpServiceGroupItemUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSmpServiceGroupItem(smpServiceGroupItem : SmpServiceGroupItem, owner : string): Observable<any> {
        let body = JSON.stringify(smpServiceGroupItem);
        return this.httpClient.put(`${this.smpServiceGroupItemUrl}/${owner}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSmpServiceGroupItem(smpServiceGroupItem : SmpServiceGroupItem, owner : string): Observable<any> {
        let body = JSON.stringify(smpServiceGroupItem);
        return this.httpClient.patch(`${this.smpServiceGroupItemUrl}/${owner}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSmpServiceGroupItem(owner : string): Observable<any> {
        return this.httpClient.delete(`${this.smpServiceGroupItemUrl}/${owner}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}