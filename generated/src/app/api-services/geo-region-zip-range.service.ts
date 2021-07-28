/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { GeoRegionZipRange } from '../api-models/geo-region-zip-range.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class GeoRegionZipRangeService {

    private geoRegionZipRangeUrl: string = `${environment.apiUrl}/georegionzipranges`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getGeoRegionZipRanges(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<GeoRegionZipRange[]> {
        var url = `${this.geoRegionZipRangeUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as GeoRegionZipRange[]),
                catchError(this.sharedService.handleError))
    }

    getGeoRegionZipRange(seqGeoRegionZipRange : number): Observable<GeoRegionZipRange> {
        return this.httpClient.get(`${this.geoRegionZipRangeUrl}/${seqGeoRegionZipRange}`, {observe: 'response'})
            .pipe(map(response => response.body as GeoRegionZipRange),
                catchError(this.sharedService.handleError))
    }

    getGeoRegionZipRangesCount(): Observable<number> {
        var url = `${this.geoRegionZipRangeUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createGeoRegionZipRange(geoRegionZipRange : GeoRegionZipRange): Observable<any> {
        let body = JSON.stringify(geoRegionZipRange);
        return this.httpClient.post(this.geoRegionZipRangeUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateGeoRegionZipRange(geoRegionZipRange : GeoRegionZipRange, seqGeoRegionZipRange : number): Observable<any> {
        let body = JSON.stringify(geoRegionZipRange);
        return this.httpClient.put(`${this.geoRegionZipRangeUrl}/${seqGeoRegionZipRange}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateGeoRegionZipRange(geoRegionZipRange : GeoRegionZipRange, seqGeoRegionZipRange : number): Observable<any> {
        let body = JSON.stringify(geoRegionZipRange);
        return this.httpClient.patch(`${this.geoRegionZipRangeUrl}/${seqGeoRegionZipRange}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteGeoRegionZipRange(seqGeoRegionZipRange : number): Observable<any> {
        return this.httpClient.delete(`${this.geoRegionZipRangeUrl}/${seqGeoRegionZipRange}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}