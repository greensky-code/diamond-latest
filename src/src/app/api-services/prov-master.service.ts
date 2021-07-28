/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProvMaster } from '../api-models/prov-master.model'
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
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
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    /**
     *lookup search
     */
    getProvMastersLookupSearch(): Observable<ProvMaster[]> {
        var url = `${this.provMasterUrl}/lookup`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ProvMaster[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getProvMaster(seqProvId : number): Observable<ProvMaster> {
        return this.httpClient.get(`${this.provMasterUrl}/${seqProvId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getProvMastersCount(): Observable<number> {
        var url = `${this.provMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByProviderId(providerId : string): Observable<ProvMaster> {
        return this.httpClient.get(`${this.provMasterUrl}/find-by-provider/${providerId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByIpaId(ipaId : string): Observable<ProvMaster[]> {
        return this.httpClient.get(`${this.provMasterUrl}/find-by-ipaid/${ipaId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findBySeqProvXrefId(seqProvXrefId : number): Observable<ProvMaster[]> {
        return this.httpClient.get(`${this.provMasterUrl}/find-by-seqprovxrefid/${seqProvXrefId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findBySeqVendId(seqVendId : number): Observable<ProvMaster[]> {
        return this.httpClient.get(`${this.provMasterUrl}/find-by-seqvendid/${seqVendId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findBySeqCapVendAddress(seqCapVendAddress : number): Observable<ProvMaster[]> {
        return this.httpClient.get(`${this.provMasterUrl}/find-by-seqcapvendaddress/${seqCapVendAddress}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findBySalutation(salutation : string): Observable<ProvMaster[]> {
        return this.httpClient.get(`${this.provMasterUrl}/find-by-salutation/${salutation}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByLicense(license : string): Observable<ProvMaster[]> {
        return this.httpClient.get(`${this.provMasterUrl}/find-by-license/${license}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByLanguage3(language3 : string): Observable<ProvMaster[]> {
        return this.httpClient.get(`${this.provMasterUrl}/find-by-language3/${language3}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByLanguage1(language1 : string): Observable<ProvMaster[]> {
        return this.httpClient.get(`${this.provMasterUrl}/find-by-language1/${language1}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findBySeqVendAddress(seqVendAddress : number): Observable<ProvMaster[]> {
        return this.httpClient.get(`${this.provMasterUrl}/find-by-seqvendaddress/${seqVendAddress}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByLanguage2(language2 : string): Observable<ProvMaster[]> {
        return this.httpClient.get(`${this.provMasterUrl}/find-by-language2/${language2}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    createProvMaster(provMaster : ProvMaster): Observable<ProvMaster> {
        let body = JSON.stringify(provMaster);
        return this.httpClient.post(this.provMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response as ProvMaster),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateProvMaster(provMaster : ProvMaster, seqProvId : number): Observable<any> {
        let body = JSON.stringify(provMaster);
        return this.httpClient.put(`${this.provMasterUrl}/${seqProvId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateProvMaster(provMaster : ProvMaster, seqProvId : number): Observable<any> {
        let body = JSON.stringify(provMaster);
        return this.httpClient.patch(`${this.provMasterUrl}/${seqProvId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteProvMaster(seqProvId : number): Observable<any> {
        return this.httpClient.delete(`${this.provMasterUrl}/${seqProvId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findBySeqVendorId(seqVendId : number): Observable<ProvMaster[]> {
        return this.httpClient.get(`${this.provMasterUrl}/find-by-seqvendorid/${seqVendId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

}
