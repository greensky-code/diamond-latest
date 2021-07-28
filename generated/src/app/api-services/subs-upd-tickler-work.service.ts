/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SubsUpdTicklerWork } from '../api-models/subs-upd-tickler-work.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SubsUpdTicklerWorkService {

    private subsUpdTicklerWorkUrl: string = `${environment.apiUrl}/subsupdticklerworks`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSubsUpdTicklerWorks(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SubsUpdTicklerWork[]> {
        var url = `${this.subsUpdTicklerWorkUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SubsUpdTicklerWork[]),
                catchError(this.sharedService.handleError))
    }

    getSubsUpdTicklerWork(seqSubsId : number): Observable<SubsUpdTicklerWork> {
        return this.httpClient.get(`${this.subsUpdTicklerWorkUrl}/${seqSubsId}`, {observe: 'response'})
            .pipe(map(response => response.body as SubsUpdTicklerWork),
                catchError(this.sharedService.handleError))
    }

    getSubsUpdTicklerWorksCount(): Observable<number> {
        var url = `${this.subsUpdTicklerWorkUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSubsUpdTicklerWork(subsUpdTicklerWork : SubsUpdTicklerWork): Observable<any> {
        let body = JSON.stringify(subsUpdTicklerWork);
        return this.httpClient.post(this.subsUpdTicklerWorkUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSubsUpdTicklerWork(subsUpdTicklerWork : SubsUpdTicklerWork, seqSubsId : number): Observable<any> {
        let body = JSON.stringify(subsUpdTicklerWork);
        return this.httpClient.put(`${this.subsUpdTicklerWorkUrl}/${seqSubsId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSubsUpdTicklerWork(subsUpdTicklerWork : SubsUpdTicklerWork, seqSubsId : number): Observable<any> {
        let body = JSON.stringify(subsUpdTicklerWork);
        return this.httpClient.patch(`${this.subsUpdTicklerWorkUrl}/${seqSubsId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSubsUpdTicklerWork(seqSubsId : number): Observable<any> {
        return this.httpClient.delete(`${this.subsUpdTicklerWorkUrl}/${seqSubsId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}