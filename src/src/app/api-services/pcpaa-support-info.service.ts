/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PcpaaSupportInfo } from '../api-models/pcpaa-support-info.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PcpaaSupportInfoService {

    private pcpaaSupportInfoUrl: string = `${environment.apiUrl}/pcpaasupportinfos`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPcpaaSupportInfos(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PcpaaSupportInfo[]> {
        var url = `${this.pcpaaSupportInfoUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PcpaaSupportInfo[]),
                catchError(this.sharedService.handleError))
    }

    getPcpaaSupportInfo(seqPcpaaInfoId : number): Observable<PcpaaSupportInfo> {
        return this.httpClient.get(`${this.pcpaaSupportInfoUrl}/${seqPcpaaInfoId}`, {observe: 'response'})
            .pipe(map(response => response.body as PcpaaSupportInfo),
                catchError(this.sharedService.handleError))
    }

    getPcpaaSupportInfosCount(): Observable<number> {
        var url = `${this.pcpaaSupportInfoUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySpecialtyType(specialtyType : string): Observable<PcpaaSupportInfo[]> {
        return this.httpClient.get(`${this.pcpaaSupportInfoUrl}/find-by-specialtytype/${specialtyType}`, {observe: 'response'})
            .pipe(map(response => response.body as PcpaaSupportInfo),
                catchError(this.sharedService.handleError))
    }
    findByLineOfBusiness(lineOfBusiness : string): Observable<PcpaaSupportInfo[]> {
        return this.httpClient.get(`${this.pcpaaSupportInfoUrl}/find-by-lineofbusiness/${lineOfBusiness}`, {observe: 'response'})
            .pipe(map(response => response.body as PcpaaSupportInfo),
                catchError(this.sharedService.handleError))
    }




    createPcpaaSupportInfo(pcpaaSupportInfo : PcpaaSupportInfo): Observable<any> {
        let body = JSON.stringify(pcpaaSupportInfo);
        return this.httpClient.post(this.pcpaaSupportInfoUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updatePcpaaSupportInfo(pcpaaSupportInfo : PcpaaSupportInfo, seqPcpaaInfoId : number): Observable<any> {
        let body = JSON.stringify(pcpaaSupportInfo);
        return this.httpClient.put(`${this.pcpaaSupportInfoUrl}/${seqPcpaaInfoId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdatePcpaaSupportInfo(pcpaaSupportInfo : PcpaaSupportInfo, seqPcpaaInfoId : number): Observable<any> {
        let body = JSON.stringify(pcpaaSupportInfo);
        return this.httpClient.patch(`${this.pcpaaSupportInfoUrl}/${seqPcpaaInfoId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deletePcpaaSupportInfo(seqPcpaaInfoId : number): Observable<any> {
        return this.httpClient.delete(`${this.pcpaaSupportInfoUrl}/${seqPcpaaInfoId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}