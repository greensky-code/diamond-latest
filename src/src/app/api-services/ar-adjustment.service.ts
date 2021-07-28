/* Copyright (c) 2020 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {ArAdjustment} from '../api-models/ar-adjustment.model'
import {CONFIG} from '../core/config';
import {environment} from '../../environments/environment'
import {HttpHeaders} from '@angular/common/http';
import {SharedService} from '../shared/services/shared.service';
import {catchError, map} from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class ArAdjustmentService {

    private arAdjustmentUrl: string = `${environment.apiUrl}/aradjustments`;
    private contentHeaders = new HttpHeaders();

    constructor(private httpClient: HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getArAdjustments(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<ArAdjustment[]> {
        var url = `${this.arAdjustmentUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ArAdjustment[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getArAdjustment(seqAradjId: number): Observable<ArAdjustment> {
        return this.httpClient.get(`${this.arAdjustmentUrl}/${seqAradjId}`, {observe: 'response'})
            .pipe(map(response => response.body as ArAdjustment),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getArAdjustmentsCount(): Observable<number> {
        var url = `${this.arAdjustmentUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }


    createArAdjustment(arAdjustment: ArAdjustment): Observable<any> {
        let body = JSON.stringify(arAdjustment);
        return this.httpClient.post(this.arAdjustmentUrl, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateArAdjustment(arAdjustment: ArAdjustment, seqAradjId: number): Observable<any> {
        let body = JSON.stringify(arAdjustment);
        return this.httpClient.put(`${this.arAdjustmentUrl}/${seqAradjId}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateArAdjustment(arAdjustment: ArAdjustment, seqAradjId: number): Observable<any> {
        let body = JSON.stringify(arAdjustment);
        return this.httpClient.patch(`${this.arAdjustmentUrl}/${seqAradjId}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteArAdjustment(seqAradjId: number): Observable<any> {
        return this.httpClient.delete(`${this.arAdjustmentUrl}/${seqAradjId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getNextSequence(): Observable<any> {
        return this.httpClient
          .get(`${this.arAdjustmentUrl}/get-next-sequence`, { observe: "response" })
          .pipe(
            map((response) => response.body),
            catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
          );
      }


      getAradjReportData(): Observable<any> {
        return this.httpClient
          .get(`${this.arAdjustmentUrl}/get-aradj-report`, { observe: "response" })
          .pipe(
            map((response) => response.body),
            catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
          );
      }
}
