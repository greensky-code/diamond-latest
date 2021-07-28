/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { PremiumMaster } from '../api-models/premium-master.model';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class PremiumMasterService {

    private premiumMasterUrl: string = `${environment.apiUrl}/premiummasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient: HttpClient, private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPremiumMasters(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<PremiumMaster[]> {
        var url = `${this.premiumMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as PremiumMaster[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getPremiumMaster(seqPremId: number, seqGroupId: number): Observable<PremiumMaster> {
        return this.httpClient.get(`${this.premiumMasterUrl}/${seqPremId}/${seqGroupId}`, { observe: 'response' })
            .pipe(map(response => response.body as PremiumMaster[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByGroupId(seqGroupId: number): Observable<PremiumMaster[]> {
        return this.httpClient.get(`${this.premiumMasterUrl}/find-by-seqgroupid/${seqGroupId}`, { observe: 'response' })
        .pipe(map(response => response.body as PremiumMaster[]),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getPremiumMastersCount(): Observable<number> {
        var url = `${this.premiumMasterUrl}/count`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByAdFeeCompCode(adFeeCompCode: string): Observable<PremiumMaster[]> {
        return this.httpClient.get(`${this.premiumMasterUrl}/find-by-adfeecompcode/${adFeeCompCode}`, { observe: 'response' })
            .pipe(map(response => response.body as PremiumMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    createPremiumMaster(premiumMaster: PremiumMaster): Observable<any> {
        let body = JSON.stringify(premiumMaster);
        return this.httpClient.post(this.premiumMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updatePremiumMaster(premiumMaster: PremiumMaster, seqPremId: number, seqGroupId: number): Observable<any> {
        let body = JSON.stringify(premiumMaster);
        return this.httpClient.put(`${this.premiumMasterUrl}/${seqPremId}/${seqGroupId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updatePremiumMasterGroupDetail(premiumMaster: PremiumMaster, seqPremId: any, seqGroupId: number): Observable<any> {
        let body = JSON.stringify(premiumMaster);
        return this.httpClient.put(`${this.premiumMasterUrl}/updatePremiumMasterGroupDetail/${seqPremId}/${seqGroupId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdatePremiumMaster(premiumMaster: PremiumMaster, seqGroupId: number): Observable<any> {
        let body = JSON.stringify(premiumMaster);
        return this.httpClient.patch(`${this.premiumMasterUrl}/${seqGroupId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deletePremiumMaster(seqGroupId: number): Observable<any> {
        return this.httpClient.delete(`${this.premiumMasterUrl}/${seqGroupId}`, { observe: 'response' })
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    private handleError(error: any): Promise<any> {
        var errorMessage = "";
        if (parseInt(error.status) == 0) {
            errorMessage = `An Error occurred while Processing request. Cannot Connect to server. Please make sure that web service is running.`;
        }
        else if (parseInt(error.status) == 404) {
            errorMessage = `A 404 error occurred while accessing URL ${error.url}. Page Not Found.`;
        }
        else if (parseInt(error.status) == 500) {
            errorMessage = `An Internal Server Error Occurred while accessing URL ${error.url}. ${error.statusText}`;
        }
        else if (parseInt(error.status) == 400) {
            errorMessage = `An error occurred while accessing URL ${error.url}. Bad Request`;
        }
        else {
            errorMessage = `An error occurred while accessing URL ${error.url}. ${error.statusText}`;
        }

        return Promise.reject(errorMessage);
    }


    findBySeqGroupIdAndPlanRiderCode(seqGroupId: any, planRiderCode: any): Observable<PremiumMaster[]> {
        return this.httpClient.get(`${this.premiumMasterUrl}/find-by-seqgropid-and-planridercode/${seqGroupId}/${planRiderCode}`, { observe: 'response' })
        .pipe(map(response => response.body as PremiumMaster),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
