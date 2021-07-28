/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CapAgeBandDetail } from '../api-models/cap-age-band-detail.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CapAgeBandDetailService {

    private capAgeBandDetailUrl: string = `${environment.apiUrl}/capagebanddetails`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCapAgeBandDetails(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CapAgeBandDetail[]> {
        var url = `${this.capAgeBandDetailUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CapAgeBandDetail[]),
                catchError(this.sharedService.handleError))
    }

    getCapAgeBandDetail(ageBandId : string): Observable<CapAgeBandDetail> {
        return this.httpClient.get(`${this.capAgeBandDetailUrl}/${ageBandId}`, {observe: 'response'})
            .pipe(map(response => response.body as CapAgeBandDetail),
                catchError(this.sharedService.handleError))
    }

    getCapAgeBandDetailsCount(): Observable<number> {
        var url = `${this.capAgeBandDetailUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByAgeBandId(ageBandId : string): Observable<CapAgeBandDetail[]> {
        return this.httpClient.get(`${this.capAgeBandDetailUrl}/find-by-agebandid/${ageBandId}`, {observe: 'response'})
            .pipe(map(response => response.body as CapAgeBandDetail),
                catchError(this.sharedService.handleError))
    }




    createCapAgeBandDetail(capAgeBandDetail : CapAgeBandDetail): Observable<any> {
        let body = JSON.stringify(capAgeBandDetail);
        return this.httpClient.post(this.capAgeBandDetailUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCapAgeBandDetail(capAgeBandDetail : CapAgeBandDetail, ageBandId : string): Observable<any> {
        let body = JSON.stringify(capAgeBandDetail);
        return this.httpClient.put(`${this.capAgeBandDetailUrl}/${ageBandId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCapAgeBandDetail(capAgeBandDetail : CapAgeBandDetail, ageBandId : string): Observable<any> {
        let body = JSON.stringify(capAgeBandDetail);
        return this.httpClient.patch(`${this.capAgeBandDetailUrl}/${ageBandId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCapAgeBandDetail(ageBandId : string): Observable<any> {
        return this.httpClient.delete(`${this.capAgeBandDetailUrl}/${ageBandId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}