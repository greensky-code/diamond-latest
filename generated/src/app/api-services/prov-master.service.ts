/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProvMaster } from '../api-models/prov-master.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ProvMasterService {

    private provMasterUrl: string = `${environment.apiUrl}/provmasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getProvMasters(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ProvMaster[]> {
        var url = `${this.provMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ProvMaster[]),
                catchError(this.sharedService.handleError))
    }

    getProvMaster(seqProvId : number): Observable<ProvMaster> {
        return this.httpClient.get(`${this.provMasterUrl}/${seqProvId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvMaster),
                catchError(this.sharedService.handleError))
    }

    getProvMastersCount(): Observable<number> {
        var url = `${this.provMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByIpaId(ipaId : string): Observable<ProvMaster[]> {
        return this.httpClient.get(`${this.provMasterUrl}/find-by-ipaid/${ipaId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvMaster),
                catchError(this.sharedService.handleError))
    }
    findBySeqProvXrefId(seqProvXrefId : number): Observable<ProvMaster[]> {
        return this.httpClient.get(`${this.provMasterUrl}/find-by-seqprovxrefid/${seqProvXrefId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvMaster),
                catchError(this.sharedService.handleError))
    }
    findBySeqVendId(seqVendId : number): Observable<ProvMaster[]> {
        return this.httpClient.get(`${this.provMasterUrl}/find-by-seqvendid/${seqVendId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvMaster),
                catchError(this.sharedService.handleError))
    }
    findBySeqCapVendAddress(seqCapVendAddress : number): Observable<ProvMaster[]> {
        return this.httpClient.get(`${this.provMasterUrl}/find-by-seqcapvendaddress/${seqCapVendAddress}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvMaster),
                catchError(this.sharedService.handleError))
    }
    findBySalutation(salutation : string): Observable<ProvMaster[]> {
        return this.httpClient.get(`${this.provMasterUrl}/find-by-salutation/${salutation}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvMaster),
                catchError(this.sharedService.handleError))
    }
    findByLicense(license : string): Observable<ProvMaster[]> {
        return this.httpClient.get(`${this.provMasterUrl}/find-by-license/${license}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvMaster),
                catchError(this.sharedService.handleError))
    }
    findByLanguage3(language3 : string): Observable<ProvMaster[]> {
        return this.httpClient.get(`${this.provMasterUrl}/find-by-language3/${language3}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvMaster),
                catchError(this.sharedService.handleError))
    }
    findByLanguage1(language1 : string): Observable<ProvMaster[]> {
        return this.httpClient.get(`${this.provMasterUrl}/find-by-language1/${language1}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvMaster),
                catchError(this.sharedService.handleError))
    }
    findBySeqVendAddress(seqVendAddress : number): Observable<ProvMaster[]> {
        return this.httpClient.get(`${this.provMasterUrl}/find-by-seqvendaddress/${seqVendAddress}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvMaster),
                catchError(this.sharedService.handleError))
    }
    findByLanguage2(language2 : string): Observable<ProvMaster[]> {
        return this.httpClient.get(`${this.provMasterUrl}/find-by-language2/${language2}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvMaster),
                catchError(this.sharedService.handleError))
    }




    createProvMaster(provMaster : ProvMaster): Observable<any> {
        let body = JSON.stringify(provMaster);
        return this.httpClient.post(this.provMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateProvMaster(provMaster : ProvMaster, seqProvId : number): Observable<any> {
        let body = JSON.stringify(provMaster);
        return this.httpClient.put(`${this.provMasterUrl}/${seqProvId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateProvMaster(provMaster : ProvMaster, seqProvId : number): Observable<any> {
        let body = JSON.stringify(provMaster);
        return this.httpClient.patch(`${this.provMasterUrl}/${seqProvId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteProvMaster(seqProvId : number): Observable<any> {
        return this.httpClient.delete(`${this.provMasterUrl}/${seqProvId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}