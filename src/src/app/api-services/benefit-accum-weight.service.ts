import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { BenefitAccumWeight } from "../api-models/benefit-accum-weight.model";
import { SharedService } from "../shared/services/shared.service";

@Injectable({
  providedIn: "root"
})
export class BenefitAccumWeightService {

  private benefitAccumWeightUrl: string = `${environment.apiUrl}/benefitaccumweights`;
  private contentHeaders = new HttpHeaders();
  constructor(private httpClient: HttpClient, private sharedService: SharedService) {
    this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
    this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
  }

  getBenefitAccumWeights(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<BenefitAccumWeight[]> {
    var url = `${this.benefitAccumWeightUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
    return this.httpClient.get(url, { observe: 'response' })
      .pipe(map(response => response.body as BenefitAccumWeight[]),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  getBenefitAccumWeight(accumulatorId: string): Observable<BenefitAccumWeight> {
    return this.httpClient.get(`${this.benefitAccumWeightUrl}/${accumulatorId}`, { observe: 'response' })
      .pipe(map(response => response.body as BenefitAccumWeight),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  getBenefitAccumWeightsCount(): Observable<number> {
    var url = `${this.benefitAccumWeightUrl}/count`;
    return this.httpClient.get(url, { observe: 'response' })
      .pipe(map(response => response.body as number),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  createBenefitAccumWeight(benefitAccumWeight: BenefitAccumWeight): Observable<any> {
    let body = JSON.stringify(benefitAccumWeight);
    return this.httpClient.post(this.benefitAccumWeightUrl, body, { headers: this.contentHeaders })
      .pipe(map(response => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  updateBenefitAccumWeight(benefitAccumWeight: BenefitAccumWeight, accumulatorId: string): Observable<any> {
    let body = JSON.stringify(benefitAccumWeight);
    return this.httpClient.put(`${this.benefitAccumWeightUrl}/${accumulatorId}`, body, { headers: this.contentHeaders })
      .pipe(map(response => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  partiallyUpdateBenefitAccumWeight(benefitAccumWeight: BenefitAccumWeight, accumulatorId: string): Observable<any> {
    let body = JSON.stringify(benefitAccumWeight);
    return this.httpClient.patch(`${this.benefitAccumWeightUrl}/${accumulatorId}`, body, { headers: this.contentHeaders })
      .pipe(map(response => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  deleteBenefitAccumWeight(accumulatorId: string): Observable<any> {
    return this.httpClient.delete(`${this.benefitAccumWeightUrl}/${accumulatorId}`, { observe: 'response' })
      .pipe(map(response => response.body),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }
}
