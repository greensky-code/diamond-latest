/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { GroupPercentOfSavings } from '../api-models/group-percent-of-savings.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class GroupPercentOfSavingsService {

    private groupPercentOfSavingsUrl: string = `${environment.apiUrl}/grouppercentsofsavings`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getGroupPercentsOfSavings(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<GroupPercentOfSavings[]> {
        var url = `${this.groupPercentOfSavingsUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as GroupPercentOfSavings[]),
                catchError(this.sharedService.handleError))
    }

    getGroupPercentOfSavings(seqGroupId : number): Observable<GroupPercentOfSavings> {
        return this.httpClient.get(`${this.groupPercentOfSavingsUrl}/${seqGroupId}`, {observe: 'response'})
            .pipe(map(response => response.body as GroupPercentOfSavings),
                catchError(this.sharedService.handleError))
    }

    getGroupPercentsOfSavingsCount(): Observable<number> {
        var url = `${this.groupPercentOfSavingsUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqGroupId(seqGroupId : number): Observable<GroupPercentOfSavings[]> {
        return this.httpClient.get(`${this.groupPercentOfSavingsUrl}/find-by-seqgroupid/${seqGroupId}`, {observe: 'response'})
            .pipe(map(response => response.body as GroupPercentOfSavings),
                catchError(this.sharedService.handleError))
    }




    createGroupPercentOfSavings(groupPercentOfSavings : GroupPercentOfSavings): Observable<any> {
        let body = JSON.stringify(groupPercentOfSavings);
        return this.httpClient.post(this.groupPercentOfSavingsUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateGroupPercentOfSavings(groupPercentOfSavings : GroupPercentOfSavings, seqGroupId : number): Observable<any> {
        let body = JSON.stringify(groupPercentOfSavings);
        return this.httpClient.put(`${this.groupPercentOfSavingsUrl}/${seqGroupId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateGroupPercentOfSavings(groupPercentOfSavings : GroupPercentOfSavings, seqGroupId : number): Observable<any> {
        let body = JSON.stringify(groupPercentOfSavings);
        return this.httpClient.patch(`${this.groupPercentOfSavingsUrl}/${seqGroupId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteGroupPercentOfSavings(seqGroupId : number): Observable<any> {
        return this.httpClient.delete(`${this.groupPercentOfSavingsUrl}/${seqGroupId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}