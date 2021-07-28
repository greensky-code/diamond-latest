/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Navgrp } from '../api-models/navgrp.model'
import { environment } from '../../environments/environment'
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SharedService } from '../shared/services/shared.service';

@Injectable({
    providedIn:"root"
})
export class NavgrpService {

    private navgrpUrl: string = `${environment.apiUrl}/navgrps`;
    private contentHeaders = new HttpHeaders();

    constructor(private httpClient: HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getNavgrps(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<Navgrp[]> {
        var url = `${this.navgrpUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as Navgrp[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getNavgrp(languageId: number): Observable<Navgrp> {
        return this.httpClient.get(`${this.navgrpUrl}/${languageId}`, { observe: 'response' })
            .pipe(map(response => response.body as Navgrp),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getNavgrpsCount(): Observable<number> {
        var url = `${this.navgrpUrl}/count`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }


    createNavgrp(navgrp: Navgrp): Observable<any> {
        let body = JSON.stringify(navgrp);
        return this.httpClient.post(this.navgrpUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateNavgrp(navgrp: Navgrp, languageId: string): Observable<any> {
        let body = JSON.stringify(navgrp);
        return this.httpClient.put(`${this.navgrpUrl}/${languageId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateNavgrp(navgrp: Navgrp, languageId: number): Observable<any> {
        let body = JSON.stringify(navgrp);
        return this.httpClient.patch(`${this.navgrpUrl}/${languageId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteNavgrp(languageId: number): Observable<any> {
        return this.httpClient.delete(`${this.navgrpUrl}/${languageId}`, { observe: 'response' })
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    /**
     * Get Shortcut Menu List by NavGrpId
     * @param aiLanguageId
     * @param NAVGRP_ID
     */
    getShortcutMenuList(aiLanguageId: number, NAVGRP_ID: string): Observable<any> {
        let params = new HttpParams();
        params = params.append('ai_language_id', aiLanguageId.toString());
        params = params.append('NAVGRP_ID', NAVGRP_ID);
        return this.httpClient.get(`${this.navgrpUrl}/shortcutMenuList`, {
            params: params,
            headers: this.contentHeaders
        }).pipe(map(resp => resp),
            catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
