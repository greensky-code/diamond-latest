/* Copyright (c) 2021 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {SharedService} from '../../shared/services/shared.service';
import {CiebPremiumMaster} from '../../api-models';

@Injectable({
    providedIn: 'root'
})
export class CiebPremiumMasterService {

    private ciebPremiumMasterUrl: string = `${environment.apiUrl}/ciebpremiummasters`;
    private contentHeaders = new HttpHeaders();

    constructor(private httpClient: HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCiebPremiumMasters(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<CiebPremiumMaster[]> {
        var url = `${this.ciebPremiumMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebPremiumMaster[]),
                catchError(this.sharedService.handleError))
    }

    getCiebPremiumMaster(seqGroupId: number): Observable<CiebPremiumMaster[]> {
        return this.httpClient.get(`${this.ciebPremiumMasterUrl}/${seqGroupId}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebPremiumMaster),
                catchError(this.sharedService.handleError))
    }

    getCiebPremiumMasterFindBySeqGroupId(seqGroupId: number): Observable<CiebPremiumMaster[]> {
        return this.httpClient.get(`${this.ciebPremiumMasterUrl}/find-by-seq-group-id/${seqGroupId}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebPremiumMaster),
                catchError(this.sharedService.handleError))
    }

    getCiebPremiumMastersQueried(seqGroupId: number, seqPremId: string): Observable<CiebPremiumMaster[]> {
        return this.httpClient.get(`${this.ciebPremiumMasterUrl}/${seqPremId}/${seqGroupId}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebPremiumMaster),
                catchError(this.sharedService.handleError))
    }

    getCiebPremiumMastersCount(): Observable<number> {
        var url = `${this.ciebPremiumMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }


    createCiebPremiumMaster(ciebPremiumMaster: CiebPremiumMaster): Observable<any> {
        let body = JSON.stringify(ciebPremiumMaster);
        return this.httpClient.post(this.ciebPremiumMasterUrl, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    updateCiebPremiumMaster(ciebPremiumMaster: CiebPremiumMaster, seqGroupId: number): Observable<any> {
        let body = JSON.stringify(ciebPremiumMaster);
        return this.httpClient.put(`${this.ciebPremiumMasterUrl}/${seqGroupId}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }
    updateCiebPremiumMasterArgusDetail(ciebPremiumMaster: CiebPremiumMaster, seqPremId:number, seqGroupId: number ): Observable<any> {
        let body = JSON.stringify(ciebPremiumMaster);
        return this.httpClient.patch(`${this.ciebPremiumMasterUrl}/${seqPremId}/${seqGroupId}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }
    
    updateCiebPremiumMasters(ciebPremiumMaster: CiebPremiumMaster[], seqGroupId: number): Observable<any> {
        let body = JSON.stringify(ciebPremiumMaster);
        return this.httpClient.put(`${this.ciebPremiumMasterUrl}/${seqGroupId}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    partiallyUpdateCiebPremiumMaster(ciebPremiumMaster: CiebPremiumMaster, seqGroupId: number): Observable<any> {
        let body = JSON.stringify(ciebPremiumMaster);
        return this.httpClient.patch(`${this.ciebPremiumMasterUrl}/${seqGroupId}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCiebPremiumMaster(seqGroupId: number): Observable<any> {
        return this.httpClient.delete(`${this.ciebPremiumMasterUrl}/${seqGroupId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}
