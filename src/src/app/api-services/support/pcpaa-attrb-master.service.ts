/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {SharedService} from "../../shared/services/shared.service";
import {PcpaaAttrbMaster} from "../../api-models/support/pcpaa-attrb-master.model";

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
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    getPcpaaAttrbMaster(seqAttrbId : number): Observable<PcpaaAttrbMaster> {
        return this.httpClient.get(`${this.pcpaaAttrbMasterUrl}/${seqAttrbId}`, {observe: 'response'})
            .pipe(map(response => response.body as PcpaaAttrbMaster),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    getPcpaaAttrbMastersCount(): Observable<number> {
        var url = `${this.pcpaaAttrbMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }





    createPcpaaAttrbMaster(pcpaaAttrbMaster : PcpaaAttrbMaster): Observable<any> {
        let body = JSON.stringify(pcpaaAttrbMaster);
        return this.httpClient.post(this.pcpaaAttrbMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    updatePcpaaAttrbMaster(pcpaaAttrbMaster : PcpaaAttrbMaster, seqAttrbId : number): Observable<any> {
        let body = JSON.stringify(pcpaaAttrbMaster);
        return this.httpClient.put(`${this.pcpaaAttrbMasterUrl}/${seqAttrbId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdatePcpaaAttrbMaster(pcpaaAttrbMaster : PcpaaAttrbMaster, seqAttrbId : number): Observable<any> {
        let body = JSON.stringify(pcpaaAttrbMaster);
        return this.httpClient.patch(`${this.pcpaaAttrbMasterUrl}/${seqAttrbId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    deletePcpaaAttrbMaster(seqAttrbId : number): Observable<any> {
        return this.httpClient.delete(`${this.pcpaaAttrbMasterUrl}/${seqAttrbId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }
}
