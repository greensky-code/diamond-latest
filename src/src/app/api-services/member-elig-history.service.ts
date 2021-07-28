/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { MemberEligHistory } from '../api-models/member-elig-history.model'
import { environment } from '../../environments/environment'
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class MemberEligHistoryService {
  private memberEligHistoryUrl: string = `${environment.apiUrl}/memberelighistorys`;
  private contentHeaders = new HttpHeaders();

  constructor(
    private httpClient: HttpClient,
    private sharedService: SharedService
  ) {
    this.contentHeaders = this.contentHeaders.set("Accept", "application/json");
    this.contentHeaders = this.contentHeaders.set(
      "Content-Type",
      "application/json; charset=utf-8"
    );
  }

  getMemberEligHistorys(
    usePagination: boolean = false,
    page: number = 0,
    size: number = 0
  ): Observable<MemberEligHistory[]> {
    var url = `${this.memberEligHistoryUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
    return this.httpClient.get(url, { observe: "response" }).pipe(
      map((response) => response.body as MemberEligHistory[]),
      catchError((error: any) => {
        return this.sharedService.handleError(error);
      })
    );
  }

  getMemberEligHistory(
    subscriberId: string,
    personNumber: string,
    isEffDateDesc: boolean = false
  ): Observable<MemberEligHistory[]> {
    return this.httpClient
      .get(
        `${this.memberEligHistoryUrl}/history/${subscriberId}/${personNumber}?isEffDateDesc=${isEffDateDesc}`,
        { observe: "response" }
      )
      .pipe(
        map((response) => response.body as MemberEligHistory[]),
        catchError((error: any) => {
          return this.sharedService.handleError(error);
        })
      );
  }

  getMemberEligHistoryBySeqMembId(
    seqMembId: number
  ): Observable<MemberEligHistory> {
    return this.httpClient
      .get(`${this.memberEligHistoryUrl}/${seqMembId}`, { observe: "response" })
      .pipe(
        map((response) => response.body as MemberEligHistory),
        catchError((error: any) => {
          return this.sharedService.handleError(error);
        })
      );
  }

  getMemberEligHistoryCurrentBySeqMembId(
    seqMembId: number
  ): Observable<MemberEligHistory> {
    return this.httpClient
      .get(`${this.memberEligHistoryUrl}/current/${seqMembId}`, {
        observe: "response",
      })
      .pipe(
        map((response) => response.body as MemberEligHistory),
        catchError((error: any) => {
          return this.sharedService.handleError(error);
        })
      );
  }

  getMemberEligHistoryBySeqEligHist(
    seqEligHist: number
  ): Observable<MemberEligHistory> {
    return this.httpClient
      .get(`${this.memberEligHistoryUrl}/${seqEligHist}`, {
        observe: "response",
      })
      .pipe(
        map((response) => response.body as MemberEligHistory),
        catchError((error: any) => {
          return this.sharedService.handleError(error);
        })
      );
  }

  getMemberEligHistorysCount(): Observable<number> {
    var url = `${this.memberEligHistoryUrl}/count`;
    return this.httpClient.get(url, { observe: "response" }).pipe(
      map((response) => response.body as number),
      catchError((error: any) => {
        return this.sharedService.handleError(error);
      })
    );
  }

  createMemberEligHistory(
    memberEligHistory: MemberEligHistory
  ): Observable<any> {
    let body = JSON.stringify(memberEligHistory);
    return this.httpClient
      .post(this.memberEligHistoryUrl, body, { headers: this.contentHeaders })
      .pipe(
        map((response) => response),
        catchError((error: any) => {
          return this.sharedService.handleError(error);
        })
      );
  }

  updateMemberEligHistory(
    memberEligHistory: MemberEligHistory,
    seqEligHisId: number,
    seqMembId: number
  ): Observable<any> {
    let body = JSON.stringify(memberEligHistory);
    return this.httpClient
      .put(`${this.memberEligHistoryUrl}/${seqEligHisId}/${seqMembId}`, body, {
        headers: this.contentHeaders,
      })
      .pipe(
        map((response) => response),
        catchError((error: any) => {
          return this.sharedService.handleError(error);
        })
      );
  }

  updateMemberEligHistoryBySeqEligHist(
    memberEligHistory: MemberEligHistory,
    seqEligHist: number
  ): Observable<any> {
    let body = JSON.stringify(memberEligHistory);
    return this.httpClient
      .put(`${this.memberEligHistoryUrl}/${seqEligHist}`, body, {
        headers: this.contentHeaders,
      })
      .pipe(
        map((response) => response),
        catchError((error: any) => {
          return this.sharedService.handleError(error);
        })
      );
  }

  partiallyUpdateMemberEligHistory(
    memberEligHistory: MemberEligHistory,
    seqMembId: number
  ): Observable<any> {
    let body = JSON.stringify(memberEligHistory);
    return this.httpClient
      .patch(`${this.memberEligHistoryUrl}/${seqMembId}`, body, {
        headers: this.contentHeaders,
      })
      .pipe(
        catchError((error: any) => {
          return this.sharedService.handleError(error);
        })
      );
  }

  deleteMemberEligHistory(seqMembId: number): Observable<any> {
    return this.httpClient
      .delete(`${this.memberEligHistoryUrl}/${seqMembId}`, {
        observe: "response",
      })
      .pipe(
        map((response) => response.body),
        catchError((error: any) => {
          return this.sharedService.handleError(error);
        })
      );
  }

  terminateUnterminateMember(
    seqEligHist: any,
    seqMembId: any,
    data: any
  ): Observable<any> {
    return this.httpClient
      .put(
        `${this.memberEligHistoryUrl}/terminate/${seqEligHist}/${seqMembId}`,
        data
      )
      .pipe(
        catchError((error: any) => {
          return this.sharedService.handleError(error);
        })
      );
  }

  findByMemberMasterId(seqMembId: any) {
    var url = `${this.memberEligHistoryUrl}/memberMaster/${seqMembId}`;
    return this.httpClient.get(url, { observe: "response" }).pipe(
      map((response) => response.body as MemberEligHistory[]),
      catchError((error: any) => {
        return this.sharedService.handleError(error);
      })
    );
  }

  findBySeqMembId(seqMembId: string): Observable<MemberEligHistory[]> {
    return this.httpClient
      .get(`${this.memberEligHistoryUrl}/find-by-seqmembid/${seqMembId}`, {
        observe: "response",
      })
      .pipe(
        map((response) => response.body as MemberEligHistory[]),
        catchError((error: any) => {
          return this.sharedService.handleError(error);
        })
      );
  }

  getMemberDetails(as_of_date: string, seqEligHist: string): Observable<any> {
    let params = new HttpParams();
    params = params.append("as_of_date", as_of_date);
    params = params.append("SEQ_ELIG_HIST", seqEligHist);
    return this.httpClient
      .get(`${this.memberEligHistoryUrl}/find-memberData`, {
        params: params,
        headers: this.contentHeaders,
      })
      .pipe(
        map((resp) => resp),
        catchError((error: any) => {
          return this.sharedService.handleError(error);
        })
      );
  }

  getMemberSeqEligHist(
    as_of_date: string,
    subscriber_id: string,
    person_number: string
  ): Observable<any> {
    let params = new HttpParams();
    params = params.append("as_of_date", as_of_date);
    params = params.append("subscriber_id", subscriber_id);
    params = params.append("person_number", person_number);
    return this.httpClient
      .get(`${this.memberEligHistoryUrl}/find-SeqEligHist`, {
        params: params,
        headers: this.contentHeaders,
      })
      .pipe(
        map((resp) => resp),
        catchError((error: any) => {
          return this.sharedService.handleError(error);
        })
      );
  }

  checkIfeligible(
    subscriber_id: string,
    person_number: string
  ): Observable<any> {
    let params = new HttpParams();
    params = params.append("subscriber_id", subscriber_id);
    params = params.append("person_number", person_number);
    return this.httpClient
      .get(`${this.memberEligHistoryUrl}/check-ifEligible`, {
        params: params,
        headers: this.contentHeaders,
      })
      .pipe(
        map((resp) => resp),
        catchError((error: any) => {
          return this.sharedService.handleError(error);
        })
      );
  }

  checkIfGroupContract(seqMembId: string, as_of_date: string): Observable<any> {
    let params = new HttpParams();
    params = params.append("seq_memb_id", seqMembId);
    params = params.append("as_of_date", as_of_date);
    return this.httpClient
      .get(`${this.memberEligHistoryUrl}/find-if-group-contract-year`, {
        params: params,
        headers: this.contentHeaders,
      })
      .pipe(
        map((resp) => resp),
        catchError((error: any) => {
          return this.sharedService.handleError(error);
        })
      );
  }

  findEffectiveAndTermDate(
    seqGroupbId: string,
    as_of_date: string
  ): Observable<any> {
    let params = new HttpParams();
    params = params.append("seq_group_id", seqGroupbId);
    params = params.append("as_of_date", as_of_date);
    return this.httpClient
      .get(`${this.memberEligHistoryUrl}/find-effective-and-term`, {
        params: params,
        headers: this.contentHeaders,
      })
      .pipe(
        map((resp) => resp),
        catchError((error: any) => {
          return this.sharedService.handleError(error);
        })
      );
  }

  getSelectMemberGrid(seq_memb_id: string): Observable<any> {
    let params = new HttpParams();
    params = params.append("seq_memb_id", seq_memb_id);
    return this.httpClient
      .get(`${this.memberEligHistoryUrl}/get-select-member-grid`, {
        params: params,
        headers: this.contentHeaders,
      })
      .pipe(
        map((resp) => resp),
        catchError((error: any) => {
          return this.sharedService.handleError(error);
        })
      );
  }

  getMemberSeqEligHist_bavc(
    subscriber_id: string,
    person_number: string
  ): Observable<any> {
    let params = new HttpParams();
    params = params.append("subscriber_id", subscriber_id);
    params = params.append("person_number", person_number);
    return this.httpClient
      .get(`${this.memberEligHistoryUrl}/find-SeqEligHist_bavc`, {
        params: params,
        headers: this.contentHeaders,
      })
      .pipe(
        map((resp) => resp),
        catchError((error: any) => {
          return this.sharedService.handleError(error);
        })
      );
  }

  getMember_bavc(seqEligHis: string): Observable<any> {
    let params = new HttpParams();
    params = params.append("SEQ_ELIG_HIST", seqEligHis);
    return this.httpClient
      .get(`${this.memberEligHistoryUrl}/find-memberData-babv`, {
        params: params,
        headers: this.contentHeaders,
      })
      .pipe(
        map((resp) => resp),
        catchError((error: any) => {
          return this.sharedService.handleError(error);
        })
      );
  }

  callProcedure(memberEligHistory: any): Observable<any> {
    let body = JSON.stringify(memberEligHistory);
    return this.httpClient
      .post(`${this.memberEligHistoryUrl}/call-proc-accum-amt`, body, {
        headers: this.contentHeaders,
      })
      .pipe(
        catchError((error: any) => {
          return this.sharedService.handleError(error);
        })
      );
  }

  GetAuthorization(
    seq_memb_id: string,
  ): Observable<any> {
    let params = new HttpParams();
    params = params.append("seq_memb_id", seq_memb_id);
    return this.httpClient
      .get(`${this.memberEligHistoryUrl}/get-authScreen-membData`, {
        params: params,
        headers: this.contentHeaders,
      })
      .pipe(
        map((resp) => resp),
        catchError((error: any) => {
          return this.sharedService.handleError(error);
        })
      );
  }

    getMemberEligHistoryBySubscriberId(subscriberId: string): Observable<MemberEligHistory[]> {
        return this.httpClient
            .get(`${this.memberEligHistoryUrl}/by-subscriber-id/${subscriberId}`,
                { observe: "response" })
            .pipe(
                map((response) => response.body as MemberEligHistory[]),
                catchError((error: any) => {
                    return this.sharedService.handleError(error);
                })
            );
    }
}
