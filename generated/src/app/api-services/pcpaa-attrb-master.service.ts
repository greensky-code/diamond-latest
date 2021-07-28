/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PcpaaAttrbMaster } from '../api-models/pcpaa-attrb-master.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PcpaaAttrbMasterService {

    private pcpaaAttrbMasterUrl: string = `${environment.apiUrl}/pcpaaattrbmasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPcpaaAttrbMasters(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PcpaaAttrbMaster[]> {
        var url = `${this.pcpaaAttrbMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PcpaaAttrbMaster[]),
                catchError(this.sharedService.handleError))
    }

    getPcpaaAttrbMaster(seqAttrbId : number): Observable<PcpaaAttrbMaster> {
        return this.httpClient.get(`${this.pcpaaAttrbMasterUrl}/${seqAttrbId}`, {observe: 'response'})
            .pipe(map(response => response.body as PcpaaAttrbMaster),
                catchError(this.sharedService.handleError))
    }

    getPcpaaAttrbMastersCount(): Observable<number> {
        var url = `${this.pcpaaAttrbMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createPcpaaAttrbMaster(pcpaaAttrbMaster : PcpaaAttrbMaster): Observable<any> {
        let body = JSON.stringify(pcpaaAttrbMaster);
        return this.httpClient.post(this.pcpaaAttrbMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updatePcpaaAttrbMaster(pcpaaAttrbMaster : PcpaaAttrbMaster, seqAttrbId : number): Observable<any> {
        let body = JSON.stringify(pcpaaAttrbMaster);
        return this.httpClient.put(`${this.pcpaaAttrbMasterUrl}/${seqAttrbId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdatePcpaaAttrbMaster(pcpaaAttrbMaster : PcpaaAttrbMaster, seqAttrbId : number): Observable<any> {
        let body = JSON.stringify(pcpaaAttrbMaster);
        return this.httpClient.patch(`${this.pcpaaAttrbMasterUrl}/${seqAttrbId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deletePcpaaAttrbMaster(seqAttrbId : number): Observable<any> {
        return this.httpClient.delete(`${this.pcpaaAttrbMasterUrl}/${seqAttrbId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}