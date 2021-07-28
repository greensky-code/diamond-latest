/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SpecialPrograms } from '../api-models/special-programs.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SpecialProgramsService {

    private specialProgramsUrl: string = `${environment.apiUrl}/specialprogramss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSpecialProgramss(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SpecialPrograms[]> {
        var url = `${this.specialProgramsUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SpecialPrograms[]),
                catchError(this.sharedService.handleError))
    }

    getSpecialPrograms(specialProgramId : string): Observable<SpecialPrograms> {
        return this.httpClient.get(`${this.specialProgramsUrl}/${specialProgramId}`, {observe: 'response'})
            .pipe(map(response => response.body as SpecialPrograms),
                catchError(this.sharedService.handleError))
    }

    getSpecialProgramssCount(): Observable<number> {
        var url = `${this.specialProgramsUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSpecialPrograms(specialPrograms : SpecialPrograms): Observable<any> {
        let body = JSON.stringify(specialPrograms);
        return this.httpClient.post(this.specialProgramsUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSpecialPrograms(specialPrograms : SpecialPrograms, specialProgramId : string): Observable<any> {
        let body = JSON.stringify(specialPrograms);
        return this.httpClient.put(`${this.specialProgramsUrl}/${specialProgramId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSpecialPrograms(specialPrograms : SpecialPrograms, specialProgramId : string): Observable<any> {
        let body = JSON.stringify(specialPrograms);
        return this.httpClient.patch(`${this.specialProgramsUrl}/${specialProgramId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSpecialPrograms(specialProgramId : string): Observable<any> {
        return this.httpClient.delete(`${this.specialProgramsUrl}/${specialProgramId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}