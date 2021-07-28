/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { DddwHdr } from '../api-models/dddw-hdr.model';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class DddwHdrService {

    private dddwHdrUrl: string = `${environment.apiUrl}/dddwhdrs`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient: HttpClient, private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getDddwHdrs(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<DddwHdr[]> {
        var url = `${this.dddwHdrUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as DddwHdr[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getDddwHdr(dwName: string): Observable<DddwHdr> {
        return this.httpClient.get(`${this.dddwHdrUrl}/${dwName}`, { observe: 'response' })
            .pipe(map(response => response.body as DddwHdr),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByColumnNameAndDwname(columnName: string, dwName: string): Observable<DddwHdr> {
        return this.httpClient.get(`${this.dddwHdrUrl}/${columnName}/${dwName}`, { observe: 'response' })
            .pipe(map(response => response.body as DddwHdr),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getDddwHdrsCount(): Observable<number> {
        var url = `${this.dddwHdrUrl}/count`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    createDddwHdr(dddwHdr: DddwHdr): Observable<any> {
        let body = JSON.stringify(dddwHdr);
        return this.httpClient.post(this.dddwHdrUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateDddwHdr(dddwHdr: DddwHdr, dwName: string): Observable<any> {
        let body = JSON.stringify(dddwHdr);
        return this.httpClient.put(`${this.dddwHdrUrl}/${dwName}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateDddwHdr(dddwHdr: DddwHdr, dwName: string): Observable<any> {
        let body = JSON.stringify(dddwHdr);
        return this.httpClient.patch(`${this.dddwHdrUrl}/${dwName}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteDddwHdr(dwName: string): Observable<any> {
        return this.httpClient.delete(`${this.dddwHdrUrl}/${dwName}`, { observe: 'response' })
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
