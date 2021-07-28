/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { EdiMessageMaster } from '../api-models/edi-message-master.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class EdiMessageMasterService {

    private ediMessageMasterUrl: string = `${environment.apiUrl}/edimessagemasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getEdiMessageMasters(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<EdiMessageMaster[]> {
        var url = `${this.ediMessageMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as EdiMessageMaster[]),
                catchError(this.sharedService.handleError))
    }

    getEdiMessageMaster(processCode : string): Observable<EdiMessageMaster> {
        return this.httpClient.get(`${this.ediMessageMasterUrl}/${processCode}`, {observe: 'response'})
            .pipe(map(response => response.body as EdiMessageMaster),
                catchError(this.sharedService.handleError))
    }

    getEdiMessageMastersCount(): Observable<number> {
        var url = `${this.ediMessageMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByMessageId(messageId : number): Observable<EdiMessageMaster[]> {
        return this.httpClient.get(`${this.ediMessageMasterUrl}/find-by-messageid/${messageId}`, {observe: 'response'})
            .pipe(map(response => response.body as EdiMessageMaster),
                catchError(this.sharedService.handleError))
    }




    createEdiMessageMaster(ediMessageMaster : EdiMessageMaster): Observable<any> {
        let body = JSON.stringify(ediMessageMaster);
        return this.httpClient.post(this.ediMessageMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateEdiMessageMaster(ediMessageMaster : EdiMessageMaster, processCode : string): Observable<any> {
        let body = JSON.stringify(ediMessageMaster);
        return this.httpClient.put(`${this.ediMessageMasterUrl}/${processCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateEdiMessageMaster(ediMessageMaster : EdiMessageMaster, processCode : string): Observable<any> {
        let body = JSON.stringify(ediMessageMaster);
        return this.httpClient.patch(`${this.ediMessageMasterUrl}/${processCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteEdiMessageMaster(processCode : string): Observable<any> {
        return this.httpClient.delete(`${this.ediMessageMasterUrl}/${processCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}