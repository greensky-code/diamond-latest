/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ServiceArea } from '../api-models/service-area.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ServiceAreaService {

    private serviceAreaUrl: string = `${environment.apiUrl}/serviceareas`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getServiceAreas(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ServiceArea[]> {
        var url = `${this.serviceAreaUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ServiceArea[]),
                catchError(this.sharedService.handleError))
    }

    getServiceArea(serviceAreaName : string): Observable<ServiceArea> {
        return this.httpClient.get(`${this.serviceAreaUrl}/${serviceAreaName}`, {observe: 'response'})
            .pipe(map(response => response.body as ServiceArea),
                catchError(this.sharedService.handleError))
    }

    getServiceAreasCount(): Observable<number> {
        var url = `${this.serviceAreaUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createServiceArea(serviceArea : ServiceArea): Observable<any> {
        let body = JSON.stringify(serviceArea);
        return this.httpClient.post(this.serviceAreaUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateServiceArea(serviceArea : ServiceArea, serviceAreaName : string): Observable<any> {
        let body = JSON.stringify(serviceArea);
        return this.httpClient.put(`${this.serviceAreaUrl}/${serviceAreaName}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateServiceArea(serviceArea : ServiceArea, serviceAreaName : string): Observable<any> {
        let body = JSON.stringify(serviceArea);
        return this.httpClient.patch(`${this.serviceAreaUrl}/${serviceAreaName}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteServiceArea(serviceAreaName : string): Observable<any> {
        return this.httpClient.delete(`${this.serviceAreaUrl}/${serviceAreaName}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}