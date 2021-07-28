import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { BenefitAccumWeightDetail } from "../api-models/benefit-accum-weight-detail.model";
import { SharedService } from "../shared/services/shared.service";

@Injectable({
  providedIn: "root"
})
export class BenefitAccumWeightDetailService {

  private benefitAccumWeightDetailUrl: string = `${environment.apiUrl}/benefitaccumweightdetails`;
  private contentHeaders = new HttpHeaders();
  constructor(private httpClient: HttpClient, private sharedService: SharedService) {
    this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
    this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
  }

  getBenefitAccumWeightDetails(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<BenefitAccumWeightDetail[]> {
    var url = `${this.benefitAccumWeightDetailUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
    return this.httpClient.get(url, { observe: 'response' })
      .pipe(map(response => response.body as BenefitAccumWeightDetail[]),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  getBenefitAccumWeightDetail(accumulatorId: string): Observable<BenefitAccumWeightDetail> {
    return this.httpClient.get(`${this.benefitAccumWeightDetailUrl}/${accumulatorId}`, { observe: 'response' })
      .pipe(map(response => response.body as BenefitAccumWeightDetail),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  getBenefitAccumWeightDetailsCount(): Observable<number> {
    var url = `${this.benefitAccumWeightDetailUrl}/count`;
    return this.httpClient.get(url, { observe: 'response' })
      .pipe(map(response => response.body as number),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  findByAccumulatorId(accumulatorId: string): Observable<BenefitAccumWeightDetail[]> {
    return this.httpClient.get(`${this.benefitAccumWeightDetailUrl}/find-by-accumulatorid/${accumulatorId}`, { observe: 'response' })
      .pipe(map(response => response.body as BenefitAccumWeightDetail),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  createBenefitAccumWeightDetail(benefitAccumWeightDetail: BenefitAccumWeightDetail): Observable<any> {
    let body = JSON.stringify(benefitAccumWeightDetail);
    return this.httpClient.post(this.benefitAccumWeightDetailUrl, body, { headers: this.contentHeaders })
      .pipe(map(response => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  updateBenefitAccumWeightDetail(benefitAccumWeightDetail: BenefitAccumWeightDetail, accumulatorId: string): Observable<any> {
    let body = JSON.stringify(benefitAccumWeightDetail);
    return this.httpClient.put(`${this.benefitAccumWeightDetailUrl}/${accumulatorId}`, body, { headers: this.contentHeaders })
      .pipe(map(response => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  updateBenefitAccumDetailRows(benefitAccumWeightDetails: BenefitAccumWeightDetail[]): Observable<any> {
    let body = JSON.stringify(benefitAccumWeightDetails);
    return this.httpClient.post(`${this.benefitAccumWeightDetailUrl}/update-grid-data`, body, { headers: this.contentHeaders })
      .pipe(map(response => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  partiallyUpdateBenefitAccumWeightDetail(benefitAccumWeightDetail: BenefitAccumWeightDetail, accumulatorId: string): Observable<any> {
    let body = JSON.stringify(benefitAccumWeightDetail);
    return this.httpClient.patch(`${this.benefitAccumWeightDetailUrl}/${accumulatorId}`, body, { headers: this.contentHeaders })
      .pipe(map(response => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  deleteBenefitAccumWeightDetail(accumulatorId: string): Observable<any> {
    return this.httpClient.delete(`${this.benefitAccumWeightDetailUrl}/${accumulatorId}`, { observe: 'response' })
      .pipe(map(response => response.body),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }
}
