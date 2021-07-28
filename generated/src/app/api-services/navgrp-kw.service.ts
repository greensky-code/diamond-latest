/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { NavgrpKw } from '../api-models/navgrp-kw.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class NavgrpKwService {

    private navgrpKwUrl: string = `${environment.apiUrl}/navgrpkws`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getNavgrpKws(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<NavgrpKw[]> {
        var url = `${this.navgrpKwUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as NavgrpKw[]),
                catchError(this.sharedService.handleError))
    }

    getNavgrpKw(navgrpId : string): Observable<NavgrpKw> {
        return this.httpClient.get(`${this.navgrpKwUrl}/${navgrpId}`, {observe: 'response'})
            .pipe(map(response => response.body as NavgrpKw),
                catchError(this.sharedService.handleError))
    }

    getNavgrpKwsCount(): Observable<number> {
        var url = `${this.navgrpKwUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createNavgrpKw(navgrpKw : NavgrpKw): Observable<any> {
        let body = JSON.stringify(navgrpKw);
        return this.httpClient.post(this.navgrpKwUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateNavgrpKw(navgrpKw : NavgrpKw, navgrpId : string): Observable<any> {
        let body = JSON.stringify(navgrpKw);
        return this.httpClient.put(`${this.navgrpKwUrl}/${navgrpId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateNavgrpKw(navgrpKw : NavgrpKw, navgrpId : string): Observable<any> {
        let body = JSON.stringify(navgrpKw);
        return this.httpClient.patch(`${this.navgrpKwUrl}/${navgrpId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteNavgrpKw(navgrpId : string): Observable<any> {
        return this.httpClient.delete(`${this.navgrpKwUrl}/${navgrpId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}