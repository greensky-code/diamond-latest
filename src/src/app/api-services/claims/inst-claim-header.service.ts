/* Copyright (c) 2020 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {catchError, map} from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {SharedService} from "../../shared/services/shared.service";
import {InstClaimHeader} from "../../api-models/inst-claim-header.model";

@Injectable({
    providedIn: "root"
})
export class InstClaimHeaderService {

    private instClaimHeaderUrl: string = `${environment.apiUrl}/instclaimheaders`;
    private contentHeaders = new HttpHeaders();

    constructor(private httpClient: HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getInstClaimHeaders(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<InstClaimHeader[]> {
        var url = `${this.instClaimHeaderUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimHeader[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getInstClaimHeader(seqClaimId: number): Observable<InstClaimHeader> {
        return this.httpClient.get(`${this.instClaimHeaderUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimHeader),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getInstClaimHeadersCount(): Observable<number> {
        var url = `${this.instClaimHeaderUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByBillType(billType: string): Observable<InstClaimHeader[]> {
        return this.httpClient.get(`${this.instClaimHeaderUrl}/find-by-billtype/${billType}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimHeader),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findBySeqProvContract(seqProvContract: number): Observable<InstClaimHeader[]> {
        return this.httpClient.get(`${this.instClaimHeaderUrl}/find-by-seqprovcontract/${seqProvContract}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimHeader),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByDiagnosis6(diagnosis6: string): Observable<InstClaimHeader[]> {
        return this.httpClient.get(`${this.instClaimHeaderUrl}/find-by-diagnosis6/${diagnosis6}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimHeader),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByDiagnosis5(diagnosis5: string): Observable<InstClaimHeader[]> {
        return this.httpClient.get(`${this.instClaimHeaderUrl}/find-by-diagnosis5/${diagnosis5}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimHeader),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByDiagnosis4(diagnosis4: string): Observable<InstClaimHeader[]> {
        return this.httpClient.get(`${this.instClaimHeaderUrl}/find-by-diagnosis4/${diagnosis4}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimHeader),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByDiagnosis2(diagnosis2: string): Observable<InstClaimHeader[]> {
        return this.httpClient.get(`${this.instClaimHeaderUrl}/find-by-diagnosis2/${diagnosis2}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimHeader),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByDiagnosis1(diagnosis1: string): Observable<InstClaimHeader[]> {
        return this.httpClient.get(`${this.instClaimHeaderUrl}/find-by-diagnosis1/${diagnosis1}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimHeader),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByAttProvIpaId(attProvIpaId: string): Observable<InstClaimHeader[]> {
        return this.httpClient.get(`${this.instClaimHeaderUrl}/find-by-attprovipaid/${attProvIpaId}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimHeader),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByAdmittingDiagnosis(admittingDiagnosis: string): Observable<InstClaimHeader[]> {
        return this.httpClient.get(`${this.instClaimHeaderUrl}/find-by-admittingdiagnosis/${admittingDiagnosis}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimHeader),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByLineOfBusiness(lineOfBusiness: string): Observable<InstClaimHeader[]> {
        return this.httpClient.get(`${this.instClaimHeaderUrl}/find-by-lineofbusiness/${lineOfBusiness}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimHeader),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByPanelId(panelId: string): Observable<InstClaimHeader[]> {
        return this.httpClient.get(`${this.instClaimHeaderUrl}/find-by-panelid/${panelId}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimHeader),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByPlanCode(planCode: string): Observable<InstClaimHeader[]> {
        return this.httpClient.get(`${this.instClaimHeaderUrl}/find-by-plancode/${planCode}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimHeader),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByProviderIpaId(providerIpaId: string): Observable<InstClaimHeader[]> {
        return this.httpClient.get(`${this.instClaimHeaderUrl}/find-by-provideripaid/${providerIpaId}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimHeader),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByDiagnosis9(diagnosis9: string): Observable<InstClaimHeader[]> {
        return this.httpClient.get(`${this.instClaimHeaderUrl}/find-by-diagnosis9/${diagnosis9}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimHeader),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByDiagnosis7(diagnosis7: string): Observable<InstClaimHeader[]> {
        return this.httpClient.get(`${this.instClaimHeaderUrl}/find-by-diagnosis7/${diagnosis7}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimHeader),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByPcpIpaId(pcpIpaId: string): Observable<InstClaimHeader[]> {
        return this.httpClient.get(`${this.instClaimHeaderUrl}/find-by-pcpipaid/${pcpIpaId}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimHeader),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByDiagnosis8(diagnosis8: string): Observable<InstClaimHeader[]> {
        return this.httpClient.get(`${this.instClaimHeaderUrl}/find-by-diagnosis8/${diagnosis8}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimHeader),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByDiagnosis3(diagnosis3: string): Observable<InstClaimHeader[]> {
        return this.httpClient.get(`${this.instClaimHeaderUrl}/find-by-diagnosis3/${diagnosis3}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimHeader),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByAdmProvIpaId(admProvIpaId: string): Observable<InstClaimHeader[]> {
        return this.httpClient.get(`${this.instClaimHeaderUrl}/find-by-admprovipaid/${admProvIpaId}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimHeader),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }


    createInstClaimHeader(instClaimHeader: InstClaimHeader): Observable<any> {
        let body = JSON.stringify(instClaimHeader);
        return this.httpClient.post(this.instClaimHeaderUrl, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateInstClaimHeader(instClaimHeader: InstClaimHeader, seqClaimId: number): Observable<any> {
        let body = JSON.stringify(instClaimHeader);
        return this.httpClient.put(`${this.instClaimHeaderUrl}/${seqClaimId}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateInstClaimHeader(instClaimHeader: InstClaimHeader, seqClaimId: number): Observable<any> {
        let body = JSON.stringify(instClaimHeader);
        return this.httpClient.patch(`${this.instClaimHeaderUrl}/${seqClaimId}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteInstClaimHeader(seqClaimId: number): Observable<any> {
        return this.httpClient.delete(`${this.instClaimHeaderUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
