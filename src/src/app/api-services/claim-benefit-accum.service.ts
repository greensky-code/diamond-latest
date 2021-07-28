import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ClaimBenefitAccum } from '../api-models/claim-benefit-accum.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class ClaimBenefitAccumService {
  private claimBenefitAccumUrl: string = `${environment.apiUrl}/claimbenefitaccums`;
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

  getClaimBenefitAccums(
    usePagination: boolean = false,
    page: number = 0,
    size: number = 0
  ): Observable<ClaimBenefitAccum[]> {
    var url = `${this.claimBenefitAccumUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
    return this.httpClient.get(url, { observe: "response" }).pipe(
      map((response) => response.body as ClaimBenefitAccum[]),
      catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
    );
  }

  getClaimBenefitAccum(seqAccumId: number): Observable<ClaimBenefitAccum> {
    return this.httpClient
      .get(`${this.claimBenefitAccumUrl}/${seqAccumId}`, {
        observe: "response",
      })
      .pipe(
        map((response) => response.body as ClaimBenefitAccum),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  getClaimBenefitAccumsCount(): Observable<number> {
    var url = `${this.claimBenefitAccumUrl}/count`;
    return this.httpClient.get(url, { observe: "response" }).pipe(
      map((response) => response.body as number),
      catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
    );
  }

  findByBenefitPackageId(
    benefitPackageId: string
  ): Observable<ClaimBenefitAccum[]> {
    return this.httpClient
      .get(
        `${this.claimBenefitAccumUrl}/find-by-benefitpackageid/${benefitPackageId}`,
        { observe: "response" }
      )
      .pipe(
        map((response) => response.body as ClaimBenefitAccum),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }
  findByRuleId(ruleId: string): Observable<ClaimBenefitAccum[]> {
    return this.httpClient
      .get(`${this.claimBenefitAccumUrl}/find-by-ruleid/${ruleId}`, {
        observe: "response",
      })
      .pipe(
        map((response) => response.body as ClaimBenefitAccum),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  createClaimBenefitAccum(
    claimBenefitAccum: ClaimBenefitAccum
  ): Observable<any> {
    let body = JSON.stringify(claimBenefitAccum);
    return this.httpClient
      .post(this.claimBenefitAccumUrl, body, { headers: this.contentHeaders })
      .pipe(
        map((response) => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  updateClaimBenefitAccum(
    claimBenefitAccum: ClaimBenefitAccum,
    seqAccumId: number
  ): Observable<any> {
    let body = JSON.stringify(claimBenefitAccum);
    return this.httpClient
      .put(`${this.claimBenefitAccumUrl}/${seqAccumId}`, body, {
        headers: this.contentHeaders,
      })
      .pipe(
        map((response) => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  partiallyUpdateClaimBenefitAccum(
    claimBenefitAccum: ClaimBenefitAccum,
    seqAccumId: number
  ): Observable<any> {
    let body = JSON.stringify(claimBenefitAccum);
    return this.httpClient
      .patch(`${this.claimBenefitAccumUrl}/${seqAccumId}`, body, {
        headers: this.contentHeaders,
      })
      .pipe(
        map((response) => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  deleteClaimBenefitAccum(seqAccumId: number): Observable<any> {
    return this.httpClient
      .delete(`${this.claimBenefitAccumUrl}/${seqAccumId}`, {
        observe: "response",
      })
      .pipe(
        map((response) => response.body),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  addUpdateContact(claimBenefitAccum: ClaimBenefitAccum[]): Observable<any> {
    let body = JSON.stringify(claimBenefitAccum);
    const url = `${this.claimBenefitAccumUrl}/updateBenefitAccuRecords`;
    return this.httpClient
      .post(url, body, { headers: this.contentHeaders })
      .pipe(
        map((response) => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  getBenefitlClaimAccum(
    seq_mem_id: string,
    seq_subs_id: string,
    rule_id: string,
    from_date: string,
    thru_date: string,
    from_seq_group_id: string,
    thru_seq_group_id: string
  ): Observable<any> {
    let params = new HttpParams();
    params = params.append("seq_memb_id", seq_mem_id);
    params = params.append("seq_subs_id", seq_subs_id);
    params = params.append("rule_id", rule_id);
    params = params.append("from_date", from_date);
    params = params.append("thru_date", thru_date);
    params = params.append("from_seq_group_id", from_seq_group_id);
    params = params.append("thru_seq_group_id", thru_seq_group_id);

    return this.httpClient
      .get(`${this.claimBenefitAccumUrl}/find_by_claim`, {
        params: params,
        headers: this.contentHeaders,
      })
      .pipe(
        map((resp) => resp),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  findByIfMbrM(
    rule_id: string,
    req_from_date: string,
    req_thru_date: string,
    seq_memb_id: string
  ): Observable<any> {
    let params = new HttpParams();
    params = params.append("rule_id", rule_id);
    params = params.append("req_from_date", req_from_date);
    params = params.append("req_thru_date", req_thru_date);
    params = params.append("seq_memb_id", seq_memb_id);

    return this.httpClient
      .get(`${this.claimBenefitAccumUrl}/find_if_mbr_m`, {
        params: params,
        headers: this.contentHeaders,
      })
      .pipe(
        map((resp) => resp),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  findByIfMbrF(
    rule_id: string,
    req_from_date: string,
    req_thru_date: string,
    seq_subs_id: string
  ): Observable<any> {
    let params = new HttpParams();
    params = params.append("rule_id", rule_id);
    params = params.append("req_from_date", req_from_date);
    params = params.append("req_thru_date", req_thru_date);
    params = params.append("seq_subs_id", seq_subs_id);

    return this.httpClient
      .get(`${this.claimBenefitAccumUrl}/find_if_mbr_f`, {
        params: params,
        headers: this.contentHeaders,
      })
      .pipe(
        map((resp) => resp),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  findByIfMbrA(
    rule_id: string,
    req_from_date: string,
    req_thru_date: string,
    seq_subs_id: string,
    seq_memb_id: string,
    relationship_code: string
  ): Observable<any> {
    let params = new HttpParams();
    params = params.append("rule_id", rule_id);
    params = params.append("req_from_date", req_from_date);
    params = params.append("req_thru_date", req_thru_date);
    params = params.append("seq_subs_id", seq_subs_id);
    params = params.append("seq_memb_id", seq_memb_id);
    params = params.append("relationship_code", relationship_code);

    return this.httpClient
      .get(`${this.claimBenefitAccumUrl}/find_if_mbr_A`, {
        params: params,
        headers: this.contentHeaders,
      })
      .pipe(
        map((resp) => resp),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  findByIfMbrMGroupN(
    rule_id: string,
    req_from_date: string,
    req_thru_date: string,
    seq_memb_id: string,
    seq_group_id: string
  ): Observable<any> {
    let params = new HttpParams();
    params = params.append("rule_id", rule_id);
    params = params.append("req_from_date", req_from_date);
    params = params.append("req_thru_date", req_thru_date);
    params = params.append("seq_memb_id", seq_memb_id);
    params = params.append("seq_group_id", seq_group_id);

    return this.httpClient
      .get(`${this.claimBenefitAccumUrl}/find_if_mbr_m_group_n`, {
        params: params,
        headers: this.contentHeaders,
      })
      .pipe(
        map((resp) => resp),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  findByIfMbrFGroupN(
    rule_id: string,
    req_from_date: string,
    req_thru_date: string,
    seq_subs_id: string,
    seq_group_id: string
  ): Observable<any> {
    let params = new HttpParams();
    params = params.append("rule_id", rule_id);
    params = params.append("req_from_date", req_from_date);
    params = params.append("req_thru_date", req_thru_date);
    params = params.append("seq_subs_id", seq_subs_id);
    params = params.append("seq_group_id", seq_group_id);

    return this.httpClient
      .get(`${this.claimBenefitAccumUrl}/find_if_mbr_f_group_n`, {
        params: params,
        headers: this.contentHeaders,
      })
      .pipe(
        map((resp) => resp),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  findByIfMbrAGroupN(
    rule_id: string,
    req_from_date: string,
    req_thru_date: string,
    seq_subs_id: string,
    seq_memb_id: string,
    relationship_code: string,
    seq_group_id: string
  ): Observable<any> {
    let params = new HttpParams();
    params = params.append("rule_id", rule_id);
    params = params.append("req_from_date", req_from_date);
    params = params.append("req_thru_date", req_thru_date);
    params = params.append("seq_subs_id", seq_subs_id);
    params = params.append("seq_memb_id", seq_memb_id);
    params = params.append("relationship_code", relationship_code);
    params = params.append("seq_group_id", seq_group_id);

    return this.httpClient
      .get(`${this.claimBenefitAccumUrl}/find_if_mbr_A_group_n`, {
        params: params,
        headers: this.contentHeaders,
      })
      .pipe(
        map((resp) => resp),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  findByIfMbrMType(
    rule_id: string,
    req_from_date: string,
    req_thru_date: string,
    seq_memb_id: string
  ): Observable<any> {
    let params = new HttpParams();
    params = params.append("rule_id", rule_id);
    params = params.append("req_from_date", req_from_date);
    params = params.append("req_thru_date", req_thru_date);
    params = params.append("seq_memb_id", seq_memb_id);

    return this.httpClient
      .get(`${this.claimBenefitAccumUrl}/find_if_mbr_m_rule_type`, {
        params: params,
        headers: this.contentHeaders,
      })
      .pipe(
        map((resp) => resp),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  findByIfMbrFType(
    rule_id: string,
    req_from_date: string,
    req_thru_date: string,
    seq_subs_id: string
  ): Observable<any> {
    let params = new HttpParams();
    params = params.append("rule_id", rule_id);
    params = params.append("req_from_date", req_from_date);
    params = params.append("req_thru_date", req_thru_date);
    params = params.append("seq_subs_id", seq_subs_id);

    return this.httpClient
      .get(`${this.claimBenefitAccumUrl}/find_if_mbr_f_rule_type`, {
        params: params,
        headers: this.contentHeaders,
      })
      .pipe(
        map((resp) => resp),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  findByIfMbrAType(
    rule_id: string,
    req_from_date: string,
    req_thru_date: string,
    seq_subs_id: string,
    seq_memb_id: string,
    relationship_code: string
  ): Observable<any> {
    let params = new HttpParams();
    params = params.append("rule_id", rule_id);
    params = params.append("req_from_date", req_from_date);
    params = params.append("req_thru_date", req_thru_date);
    params = params.append("seq_subs_id", seq_subs_id);
    params = params.append("seq_memb_id", seq_memb_id);
    params = params.append("relationship_code", relationship_code);
    params = params.append("seq_group_id", relationship_code);

    return this.httpClient
      .get(`${this.claimBenefitAccumUrl}/find_if_mbr_A_rule_type`, {
        params: params,
        headers: this.contentHeaders,
      })
      .pipe(
        map((resp) => resp),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  findByIfMbrMGroupNType(
    rule_id: string,
    req_from_date: string,
    req_thru_date: string,
    seq_memb_id: string,
    seq_group_id: string
  ): Observable<any> {
    let params = new HttpParams();
    params = params.append("rule_id", rule_id);
    params = params.append("req_from_date", req_from_date);
    params = params.append("req_thru_date", req_thru_date);
    params = params.append("seq_memb_id", seq_memb_id);
    params = params.append("seq_group_id", seq_group_id);

    return this.httpClient
      .get(`${this.claimBenefitAccumUrl}/find_if_mbr_m_group_n_rule_type`, {
        params: params,
        headers: this.contentHeaders,
      })
      .pipe(
        map((resp) => resp),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  findByIfMbrFGroupNType(
    rule_id: string,
    req_from_date: string,
    req_thru_date: string,
    seq_subs_id: string,
    seq_group_id: string
  ): Observable<any> {
    let params = new HttpParams();
    params = params.append("rule_id", rule_id);
    params = params.append("req_from_date", req_from_date);
    params = params.append("req_thru_date", req_thru_date);
    params = params.append("seq_subs_id", seq_subs_id);
    params = params.append("seq_group_id", seq_group_id);

    return this.httpClient
      .get(`${this.claimBenefitAccumUrl}/find_if_mbr_f_group_n_rule_type`, {
        params: params,
        headers: this.contentHeaders,
      })
      .pipe(
        map((resp) => resp),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  findByIfMbrAGroupNType(
    rule_id: string,
    req_from_date: string,
    req_thru_date: string,
    seq_subs_id: string,
    seq_memb_id: string,
    relationship_code: string,
    seq_group_id: string
  ): Observable<any> {
    let params = new HttpParams();
    params = params.append("rule_id", rule_id);
    params = params.append("req_from_date", req_from_date);
    params = params.append("req_thru_date", req_thru_date);
    params = params.append("seq_subs_id", seq_subs_id);
    params = params.append("seq_memb_id", seq_memb_id);
    params = params.append("relationship_code", relationship_code);
    params = params.append("seq_group_id", seq_group_id);

    return this.httpClient
      .get(`${this.claimBenefitAccumUrl}/find_if_mbr_A_group_n_rule_type`, {
        params: params,
        headers: this.contentHeaders,
      })
      .pipe(
        map((resp) => resp),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  getBenefitClaim(
    seq_memb_id: string,
    benefit_package_id: string,
    seq_group_id: string
  ): Observable<any> {
    let params = new HttpParams();
    params = params.append("seq_memb_id", seq_memb_id);
    params = params.append("benefit_package_id", benefit_package_id);
    params = params.append("seq_group_id", seq_group_id);
    return this.httpClient
      .get(`${this.claimBenefitAccumUrl}/get_benefit_accum`, {
        params: params,
        headers: this.contentHeaders,
      })
      .pipe(
        map((resp) => resp),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }
  getAccumReport(seq_report_id: string): Observable<any> {
    let params = new HttpParams();
    params = params.append("seq_report_id", seq_report_id);
    return this.httpClient
      .get(`${this.claimBenefitAccumUrl}/get_accumClaim_report`, {
        params: params,
        headers: this.contentHeaders,
      })
      .pipe(
        map((resp) => resp),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }

  ProcRun(data: any): Observable<any> {
    let body = JSON.stringify(data);
    return this.httpClient
      .post(`${environment.apiUrl}/spaccumclaimsrpt`, body, {
        headers: this.contentHeaders,
      })
      .pipe(catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }));
  }

  getReportId(): Observable<any> {
    return this.httpClient
      .get(`${this.claimBenefitAccumUrl}/next-accum-seq`, {
        observe: "response",
      })
      .pipe(
        map((response) => response.body as any),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })
      );
  }
}
