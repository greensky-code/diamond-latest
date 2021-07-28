/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ServiceAreaPostCd } from '../api-models/service-area-post-cd.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ServiceAreaPostCdService {

    private serviceAreaPostCdUrl: string = `${environment.apiUrl}/serviceareapostcds`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getServiceAreaPostCds(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ServiceAreaPostCd[]> {
        var url = `${this.serviceAreaPostCdUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ServiceAreaPostCd[]),
                catchError(this.sharedService.handleError))
    }

    getServiceAreaPostCd(serviceAreaName : string): Observable<ServiceAreaPostCd> {
        return this.httpClient.get(`${this.serviceAreaPostCdUrl}/${serviceAreaName}`, {observe: 'response'})
            .pipe(map(response => response.body as ServiceAreaPostCd),
                catchError(this.sharedService.handleError))
    }

    getServiceAreaPostCdsCount(): Observable<number> {
        var url = `${this.serviceAreaPostCdUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByServiceAreaName(serviceAreaName : string): Observable<ServiceAreaPostCd[]> {
        return this.httpClient.get(`${this.serviceAreaPostCdUrl}/find-by-serviceareaname/${serviceAreaName}`, {observe: 'response'})
            .pipe(map(response => response.body as ServiceAreaPostCd),
                catchError(this.sharedService.handleError))
    }




    createServiceAreaPostCd(serviceAreaPostCd : ServiceAreaPostCd): Observable<any> {
        let body = JSON.stringify(serviceAreaPostCd);
        return this.httpClient.post(this.serviceAreaPostCdUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateServiceAreaPostCd(serviceAreaPostCd : ServiceAreaPostCd, serviceAreaName : string): Observable<any> {
        let body = JSON.stringify(serviceAreaPostCd);
        return this.httpClient.put(`${this.serviceAreaPostCdUrl}/${serviceAreaName}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateServiceAreaPostCd(serviceAreaPostCd : ServiceAreaPostCd, serviceAreaName : string): Observable<any> {
        let body = JSON.stringify(serviceAreaPostCd);
        return this.httpClient.patch(`${this.serviceAreaPostCdUrl}/${serviceAreaName}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteServiceAreaPostCd(serviceAreaName : string): Observable<any> {
        return this.httpClient.delete(`${this.serviceAreaPostCdUrl}/${serviceAreaName}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}