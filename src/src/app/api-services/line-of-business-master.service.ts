/* Copyright (c) 2020 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {LineOfBusinessMaster} from '../api-models/line-of-business-master.model'
import {environment} from '../../environments/environment'
import {SharedService} from '../shared/services/shared.service';
import {catchError, map} from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class LineOfBusinessMasterService {

    private lineOfBusinessMasterUrl: string = `${environment.apiUrl}/linesofbusinessmaster`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getLinesOfBusinessMaster(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<LineOfBusinessMaster[]> {
        var url = `${this.lineOfBusinessMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as LineOfBusinessMaster[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getLineOfBusinessMaster(lineOfBusiness : string): Observable<LineOfBusinessMaster> {
        return this.httpClient.get(`${this.lineOfBusinessMasterUrl}/${lineOfBusiness}`, {observe: 'response'})
            .pipe(map(response => response.body as LineOfBusinessMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getLinesOfBusinessMasterCount(): Observable<number> {
        var url = `${this.lineOfBusinessMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByNonParReasonCode(nonParReasonCode : string): Observable<LineOfBusinessMaster[]> {
        return this.httpClient.get(`${this.lineOfBusinessMasterUrl}/find-by-nonparreasoncode/${nonParReasonCode}`, {observe: 'response'})
            .pipe(map(response => response.body as LineOfBusinessMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findBySeqDefPcp(seqDefPcp : number): Observable<LineOfBusinessMaster[]> {
        return this.httpClient.get(`${this.lineOfBusinessMasterUrl}/find-by-seqdefpcp/${seqDefPcp}`, {observe: 'response'})
            .pipe(map(response => response.body as LineOfBusinessMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }




    createLineOfBusinessMaster(lineOfBusinessMaster : LineOfBusinessMaster): Observable<any> {
        let body = JSON.stringify(lineOfBusinessMaster);
        return this.httpClient.post(this.lineOfBusinessMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateLineOfBusinessMaster(lineOfBusinessMaster : LineOfBusinessMaster, lineOfBusiness : string): Observable<any> {
        let body = JSON.stringify(lineOfBusinessMaster);
        return this.httpClient.put(`${this.lineOfBusinessMasterUrl}/${lineOfBusiness}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateLineOfBusinessMaster(lineOfBusinessMaster : LineOfBusinessMaster, lineOfBusiness : string): Observable<any> {
        let body = JSON.stringify(lineOfBusinessMaster);
        return this.httpClient.patch(`${this.lineOfBusinessMasterUrl}/${lineOfBusiness}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteLineOfBusinessMaster(lineOfBusiness : string): Observable<any> {
        return this.httpClient.delete(`${this.lineOfBusinessMasterUrl}/${lineOfBusiness}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getDropdownData(): Observable<any> {
        return this.httpClient.get(`${this.lineOfBusinessMasterUrl}/drop-downs`, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
