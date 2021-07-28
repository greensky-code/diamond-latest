/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ToothHistory } from '../api-models/tooth-history.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ToothHistoryService {

    private toothHistoryUrl: string = `${environment.apiUrl}/toothhistorys`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getToothHistorys(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ToothHistory[]> {
        var url = `${this.toothHistoryUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ToothHistory[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getToothHistory(seqToothHistoryId : number): Observable<ToothHistory> {
        return this.httpClient.get(`${this.toothHistoryUrl}/${seqToothHistoryId}`, {observe: 'response'})
            .pipe(map(response => response.body as ToothHistory),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getToothHistorysCount(): Observable<number> {
        var url = `${this.toothHistoryUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByBenefitPackageId(benefitPackageId : string): Observable<ToothHistory[]> {
        return this.httpClient.get(`${this.toothHistoryUrl}/find-by-benefitpackageid/${benefitPackageId}`, {observe: 'response'})
            .pipe(map(response => response.body as ToothHistory),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findBySeqMembId(seqMembId : number): Observable<ToothHistory[]> {
        return this.httpClient.get(`${this.toothHistoryUrl}/find-by-seqmembid/${seqMembId}`, {observe: 'response'})
            .pipe(map(response => response.body as ToothHistory),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findBySeqProvId(seqProvId : number): Observable<ToothHistory[]> {
        return this.httpClient.get(`${this.toothHistoryUrl}/find-by-seqprovid/${seqProvId}`, {observe: 'response'})
            .pipe(map(response => response.body as ToothHistory),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    createToothHistory(toothHistory : ToothHistory): Observable<any> {
        let body = JSON.stringify(toothHistory);
        return this.httpClient.post(this.toothHistoryUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateToothHistory(toothHistory : ToothHistory, seqToothHistoryId : number): Observable<any> {
        let body = JSON.stringify(toothHistory);
        return this.httpClient.put(`${this.toothHistoryUrl}/${seqToothHistoryId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateToothHistory(toothHistory : ToothHistory, seqToothHistoryId : number): Observable<any> {
        let body = JSON.stringify(toothHistory);
        return this.httpClient.patch(`${this.toothHistoryUrl}/${seqToothHistoryId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteToothHistory(seqToothHistoryId : number): Observable<any> {
        return this.httpClient.delete(`${this.toothHistoryUrl}/${seqToothHistoryId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
