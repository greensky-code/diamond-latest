/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { RegionMaster } from '../api-models/region-master.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class RegionMasterService {

    private regionMasterUrl: string = `${environment.apiUrl}/regionmasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getRegionMasters(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<RegionMaster[]> {
        var url = `${this.regionMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as RegionMaster[]),
                catchError(this.sharedService.handleError))
    }

    getRegionMaster(regionType : string): Observable<RegionMaster> {
        return this.httpClient.get(`${this.regionMasterUrl}/${regionType}`, {observe: 'response'})
            .pipe(map(response => response.body as RegionMaster),
                catchError(this.sharedService.handleError))
    }

    getRegionMastersCount(): Observable<number> {
        var url = `${this.regionMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createRegionMaster(regionMaster : RegionMaster): Observable<any> {
        let body = JSON.stringify(regionMaster);
        return this.httpClient.post(this.regionMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateRegionMaster(regionMaster : RegionMaster, regionType : string): Observable<any> {
        let body = JSON.stringify(regionMaster);
        return this.httpClient.put(`${this.regionMasterUrl}/${regionType}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateRegionMaster(regionMaster : RegionMaster, regionType : string): Observable<any> {
        let body = JSON.stringify(regionMaster);
        return this.httpClient.patch(`${this.regionMasterUrl}/${regionType}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteRegionMaster(regionType : string): Observable<any> {
        return this.httpClient.delete(`${this.regionMasterUrl}/${regionType}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}