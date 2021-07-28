/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { EpiProcessFiles } from '../api-models/epi-process-files.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class EpiProcessFilesService {

    private epiProcessFilesUrl: string = `${environment.apiUrl}/epiprocessfileses`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getEpiProcessFileses(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<EpiProcessFiles[]> {
        var url = `${this.epiProcessFilesUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as EpiProcessFiles[]),
                catchError(this.sharedService.handleError))
    }

    getEpiProcessFiles(seqSessionId : number): Observable<EpiProcessFiles> {
        return this.httpClient.get(`${this.epiProcessFilesUrl}/${seqSessionId}`, {observe: 'response'})
            .pipe(map(response => response.body as EpiProcessFiles),
                catchError(this.sharedService.handleError))
    }

    getEpiProcessFilesesCount(): Observable<number> {
        var url = `${this.epiProcessFilesUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqSessionId(seqSessionId : number): Observable<EpiProcessFiles[]> {
        return this.httpClient.get(`${this.epiProcessFilesUrl}/find-by-seqsessionid/${seqSessionId}`, {observe: 'response'})
            .pipe(map(response => response.body as EpiProcessFiles),
                catchError(this.sharedService.handleError))
    }




    createEpiProcessFiles(epiProcessFiles : EpiProcessFiles): Observable<any> {
        let body = JSON.stringify(epiProcessFiles);
        return this.httpClient.post(this.epiProcessFilesUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateEpiProcessFiles(epiProcessFiles : EpiProcessFiles, seqSessionId : number): Observable<any> {
        let body = JSON.stringify(epiProcessFiles);
        return this.httpClient.put(`${this.epiProcessFilesUrl}/${seqSessionId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateEpiProcessFiles(epiProcessFiles : EpiProcessFiles, seqSessionId : number): Observable<any> {
        let body = JSON.stringify(epiProcessFiles);
        return this.httpClient.patch(`${this.epiProcessFilesUrl}/${seqSessionId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteEpiProcessFiles(seqSessionId : number): Observable<any> {
        return this.httpClient.delete(`${this.epiProcessFilesUrl}/${seqSessionId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}