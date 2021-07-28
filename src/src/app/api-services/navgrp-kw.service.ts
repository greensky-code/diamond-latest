/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavgrpKw } from '../api-models/navgrp-kw.model';
import { environment } from '../../environments/environment';
import { SharedService } from '../shared/services/shared.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class NavgrpKwService {

    private navgrpKwUrl: string = `${environment.apiUrl}/navgrpkws`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient: HttpClient, private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getNavgrpKws(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<NavgrpKw[]> {
        var url = `${this.navgrpKwUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as NavgrpKw[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getNavgrpKw(languageId : number): Observable<NavgrpKw> {
        return this.httpClient.get(`${this.navgrpKwUrl}/${languageId}`, { observe: 'response' })
            .pipe(map(response => response.body as NavgrpKw),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getNavgrpKwsCount(): Observable<number> {
        var url = `${this.navgrpKwUrl}/count`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    createNavgrpKw(navgrpKw: NavgrpKw): Observable<any> {
        let body = JSON.stringify(navgrpKw);
        return this.httpClient.post(this.navgrpKwUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateNavgrpKw(navgrpKw: NavgrpKw, languageId : number): Observable<any> {
        let body = JSON.stringify(navgrpKw);
        return this.httpClient.put(`${this.navgrpKwUrl}/${languageId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateNavgrpKw(navgrpKw: NavgrpKw, navgrpId: string): Observable<any> {
        let body = JSON.stringify(navgrpKw);
        return this.httpClient.patch(`${this.navgrpKwUrl}/${navgrpId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteNavgrpKw(languageId : number): Observable<any> {
        return this.httpClient.delete(`${this.navgrpKwUrl}/${languageId}`, { observe: 'response' })
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
