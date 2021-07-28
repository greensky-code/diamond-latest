/* Copyright (c) 2020 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {ProfsvcClaimHeader} from '../../api-models'
import {environment} from '../../../environments/environment'
import {SharedService} from '../../shared/services/shared.service';
import {catchError, map} from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class ProfsvcClaimHeaderService {

    private profsvcClaimHeaderUrl: string = `${environment.apiUrl}/profsvcclaimheaders`;
    private contentHeaders = new HttpHeaders();

    constructor(private httpClient: HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getProfsvcClaimHeaders(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<ProfsvcClaimHeader[]> {
        var url = `${this.profsvcClaimHeaderUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimHeader[]),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    getProfsvcClaimHeader(seqClaimId: string | number): Observable<ProfsvcClaimHeader> {
        return this.httpClient.get(`${this.profsvcClaimHeaderUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimHeader),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    findByClaimNumber(claimNumber: string): Observable<ProfsvcClaimHeader> {
        return this.httpClient.get(`${this.profsvcClaimHeaderUrl}/find-by-claimnumber/${claimNumber}`, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimHeader),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    findFirstByClaimNumber(claimNumber: string): Observable<ProfsvcClaimHeader> {
        return this.httpClient.get(`${this.profsvcClaimHeaderUrl}/find-first-by-claimnumber/${claimNumber}`, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimHeader),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    getProfsvcClaimHeadersCount(): Observable<number> {
        var url = `${this.profsvcClaimHeaderUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    findBySeqProvContract(seqProvContract: number): Observable<ProfsvcClaimHeader[]> {
        return this.httpClient.get(`${this.profsvcClaimHeaderUrl}/find-by-seqprovcontract/${seqProvContract}`, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimHeader),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    findByLineOfBusiness(lineOfBusiness: string): Observable<ProfsvcClaimHeader[]> {
        return this.httpClient.get(`${this.profsvcClaimHeaderUrl}/find-by-lineofbusiness/${lineOfBusiness}`, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimHeader),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    findByPlanCode(planCode: string): Observable<ProfsvcClaimHeader[]> {
        return this.httpClient.get(`${this.profsvcClaimHeaderUrl}/find-by-plancode/${planCode}`, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimHeader),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    findBySeqGroupId(seqGroupId: number): Observable<ProfsvcClaimHeader[]> {
        return this.httpClient.get(`${this.profsvcClaimHeaderUrl}/find-by-seqgroupid/${seqGroupId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimHeader),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    findBySeqMembId(seqMembId: number): Observable<ProfsvcClaimHeader[]> {
        return this.httpClient.get(`${this.profsvcClaimHeaderUrl}/find-by-seqmembid/${seqMembId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimHeader),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    findBySeqVendId(seqVendId: number): Observable<ProfsvcClaimHeader[]> {
        return this.httpClient.get(`${this.profsvcClaimHeaderUrl}/find-by-seqvendid/${seqVendId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimHeader),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    findByServiceReason1(serviceReason1: string): Observable<ProfsvcClaimHeader[]> {
        return this.httpClient.get(`${this.profsvcClaimHeaderUrl}/find-by-servicereason1/${serviceReason1}`, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimHeader),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    findBySeqCovProvParent(seqCovProvParent: number): Observable<ProfsvcClaimHeader[]> {
        return this.httpClient.get(`${this.profsvcClaimHeaderUrl}/find-by-seqcovprovparent/${seqCovProvParent}`, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimHeader),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    findBySeqRefProvId(seqRefProvId: number): Observable<ProfsvcClaimHeader[]> {
        return this.httpClient.get(`${this.profsvcClaimHeaderUrl}/find-by-seqrefprovid/${seqRefProvId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimHeader),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    findBySeqProvId(seqProvId: number): Observable<ProfsvcClaimHeader[]> {
        return this.httpClient.get(`${this.profsvcClaimHeaderUrl}/find-by-seqprovid/${seqProvId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimHeader),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    findByRefProvIpaId(refProvIpaId: string): Observable<ProfsvcClaimHeader[]> {
        return this.httpClient.get(`${this.profsvcClaimHeaderUrl}/find-by-refprovipaid/${refProvIpaId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimHeader),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    findByProviderIpaId(providerIpaId: string): Observable<ProfsvcClaimHeader[]> {
        return this.httpClient.get(`${this.profsvcClaimHeaderUrl}/find-by-provideripaid/${providerIpaId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimHeader),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    findByPanelId(panelId: string): Observable<ProfsvcClaimHeader[]> {
        return this.httpClient.get(`${this.profsvcClaimHeaderUrl}/find-by-panelid/${panelId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimHeader),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    findByDiagnosis4(diagnosis4: string): Observable<ProfsvcClaimHeader[]> {
        return this.httpClient.get(`${this.profsvcClaimHeaderUrl}/find-by-diagnosis4/${diagnosis4}`, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimHeader),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    findByDiagnosis2(diagnosis2: string): Observable<ProfsvcClaimHeader[]> {
        return this.httpClient.get(`${this.profsvcClaimHeaderUrl}/find-by-diagnosis2/${diagnosis2}`, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimHeader),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    findByDiagnosis1(diagnosis1: string): Observable<ProfsvcClaimHeader[]> {
        return this.httpClient.get(`${this.profsvcClaimHeaderUrl}/find-by-diagnosis1/${diagnosis1}`, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimHeader),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    findByDiagnosis3(diagnosis3: string): Observable<ProfsvcClaimHeader[]> {
        return this.httpClient.get(`${this.profsvcClaimHeaderUrl}/find-by-diagnosis3/${diagnosis3}`, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimHeader),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    findBySeqProvAddress(seqProvAddress: number): Observable<ProfsvcClaimHeader[]> {
        return this.httpClient.get(`${this.profsvcClaimHeaderUrl}/find-by-seqprovaddress/${seqProvAddress}`, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimHeader),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    findByPcpIpaId(pcpIpaId: string): Observable<ProfsvcClaimHeader[]> {
        return this.httpClient.get(`${this.profsvcClaimHeaderUrl}/find-by-pcpipaid/${pcpIpaId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimHeader),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    getNextSeqClaimId(): Observable<number> {
        return this.httpClient.get(`${this.profsvcClaimHeaderUrl}/get-next-sequence`, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    callPaySubscriberProc(vendorId: string, seqSubId: any, user: string, primaryAddress: string): Observable<object> {
        const httpParams: HttpParams = new HttpParams().set('vendorId', vendorId).set('seqSubsId', seqSubId).set('user', user).set('primaryAddress', primaryAddress);
        return this.httpClient.post(`${this.profsvcClaimHeaderUrl}/paySubscriberProcedure`, {observe: 'response'}, {params: httpParams})
            .pipe(map(response => response as object),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    getUserDef1ValidationResponseByProc(body: any): Observable<any> {
        const url = `${environment.apiUrl}/spcheckcdaplexists/f_deny_ncta_claim`;


        return this.httpClient.post(url, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    createProfsvcClaimHeader(profsvcClaimHeader: ProfsvcClaimHeader): Observable<any> {
        let body = JSON.stringify(profsvcClaimHeader);
        return this.httpClient.post(this.profsvcClaimHeaderUrl, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    updateProfsvcClaimHeader(profsvcClaimHeader: ProfsvcClaimHeader, seqClaimId: number): Observable<any> {
        let body = JSON.stringify(profsvcClaimHeader);
        return this.httpClient.put(`${this.profsvcClaimHeaderUrl}/${seqClaimId}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    partiallyUpdateProfsvcClaimHeader(profsvcClaimHeader: ProfsvcClaimHeader, seqClaimId: number): Observable<any> {
        let body = JSON.stringify(profsvcClaimHeader);
        return this.httpClient.patch(`${this.profsvcClaimHeaderUrl}/${seqClaimId}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    deleteProfsvcClaimHeader(seqClaimId: number): Observable<any> {
        return this.httpClient.delete(`${this.profsvcClaimHeaderUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    findByIdAndDate(seqMembId: number, date: string): Observable<ProfsvcClaimHeader[]> {
        return this.httpClient.get(`${this.profsvcClaimHeaderUrl}/find-by-idanddate/${seqMembId}/date/${date}`, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimHeader),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }


    findPatientLiability(seqClaimId: number, lineNumber: number, lineCode: number): Observable<any[]> {
        var url = `${this.profsvcClaimHeaderUrl}/find-patient-liability/?seqClaimId=${seqClaimId}&lineNumber=${lineNumber}&lineCode=${lineCode}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as any),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    findById(seqMembId: number): Observable<ProfsvcClaimHeader[]> {
        return this.httpClient.get(`${this.profsvcClaimHeaderUrl}/find-by-id/${seqMembId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimHeader),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }
}
