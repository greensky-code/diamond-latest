/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CapEntity } from '../api-models/cap-entity.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CapEntityService {

    private capEntityUrl: string = `${environment.apiUrl}/capentitys`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCapEntitys(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CapEntity[]> {
        var url = `${this.capEntityUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CapEntity[]),
                catchError(this.sharedService.handleError))
    }

    getCapEntity(capModelId : string): Observable<CapEntity> {
        return this.httpClient.get(`${this.capEntityUrl}/${capModelId}`, {observe: 'response'})
            .pipe(map(response => response.body as CapEntity),
                catchError(this.sharedService.handleError))
    }

    getCapEntitysCount(): Observable<number> {
        var url = `${this.capEntityUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqVendId(seqVendId : number): Observable<CapEntity[]> {
        return this.httpClient.get(`${this.capEntityUrl}/find-by-seqvendid/${seqVendId}`, {observe: 'response'})
            .pipe(map(response => response.body as CapEntity),
                catchError(this.sharedService.handleError))
    }
    findBySeqCapVendAddress(seqCapVendAddress : number): Observable<CapEntity[]> {
        return this.httpClient.get(`${this.capEntityUrl}/find-by-seqcapvendaddress/${seqCapVendAddress}`, {observe: 'response'})
            .pipe(map(response => response.body as CapEntity),
                catchError(this.sharedService.handleError))
    }
    findBySeqSpecProvId(seqSpecProvId : number): Observable<CapEntity[]> {
        return this.httpClient.get(`${this.capEntityUrl}/find-by-seqspecprovid/${seqSpecProvId}`, {observe: 'response'})
            .pipe(map(response => response.body as CapEntity),
                catchError(this.sharedService.handleError))
    }




    createCapEntity(capEntity : CapEntity): Observable<any> {
        let body = JSON.stringify(capEntity);
        return this.httpClient.post(this.capEntityUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCapEntity(capEntity : CapEntity, capModelId : string): Observable<any> {
        let body = JSON.stringify(capEntity);
        return this.httpClient.put(`${this.capEntityUrl}/${capModelId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCapEntity(capEntity : CapEntity, capModelId : string): Observable<any> {
        let body = JSON.stringify(capEntity);
        return this.httpClient.patch(`${this.capEntityUrl}/${capModelId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCapEntity(capModelId : string): Observable<any> {
        return this.httpClient.delete(`${this.capEntityUrl}/${capModelId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}