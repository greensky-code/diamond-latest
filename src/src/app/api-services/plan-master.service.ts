/* Copyright (c) 2020 . All Rights Reserved. */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { PlanMaster } from '../api-models/plan-master.model';
import { SharedService } from '../shared/services/shared.service';

@Injectable({
    providedIn: "root"
})
export class PlanMasterService {

    private planMasterUrl: string = `${environment.apiUrl}/planmasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPlanMasters(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PlanMaster[]> {
        var url = `${this.planMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PlanMaster[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getPlanMaster(planCode : string): Observable<PlanMaster> {
        return this.httpClient.get(`${this.planMasterUrl}/${planCode}`, {observe: 'response'})
            .pipe(map(response => response.body as PlanMaster),
                 )
    }

    getPlanMastersCount(): Observable<number> {
        var url = `${this.planMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }


    existsByPlanCode(planCode : string, groupId: string): Observable<any> {
        return this.httpClient.get(`${this.planMasterUrl}/exists-by-plan-code/${planCode}/${groupId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    createPlanMaster(planMaster : PlanMaster): Observable<any> {
        let body = JSON.stringify(planMaster);
        return this.httpClient.post(this.planMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updatePlanMaster(planMaster : PlanMaster, planCode : string): Observable<any> {
        let body = JSON.stringify(planMaster);
        return this.httpClient.put(`${this.planMasterUrl}/${planCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdatePlanMaster(planMaster : PlanMaster, planCode : string): Observable<any> {
        let body = JSON.stringify(planMaster);
        return this.httpClient.patch(`${this.planMasterUrl}/${planCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deletePlanMaster(planCode : string): Observable<any> {
        return this.httpClient.delete(`${this.planMasterUrl}/${planCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
