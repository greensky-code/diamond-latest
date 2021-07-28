/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PriceRuleDetailRules } from '../api-models/price-rule-detail-rules.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PriceRuleDetailRulesService {
  private priceRuleDetailRulesUrl: string = `${environment.apiUrl}/priceruledetailruleses`;
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

  getPriceRuleDetailRuleses(
    usePagination: boolean = false,
    page: number = 0,
    size: number = 0
  ): Observable<PriceRuleDetailRules[]> {
    var url = `${this.priceRuleDetailRulesUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
    return this.httpClient.get(url, { observe: "response" }).pipe(
      map((response) => response.body as PriceRuleDetailRules[]),
      catchError(this.sharedService.handleError)
    );
  }

  getPriceRuleDetailRules(priceRule: string): Observable<PriceRuleDetailRules> {
    return this.httpClient
      .get(`${this.priceRuleDetailRulesUrl}/${priceRule}`, {
        observe: "response",
      })
      .pipe(
        map((response) => response.body as PriceRuleDetailRules),
        catchError(this.sharedService.handleError)
      );
  }

  getPriceRuleDetailRulesesCount(): Observable<number> {
    var url = `${this.priceRuleDetailRulesUrl}/count`;
    return this.httpClient.get(url, { observe: "response" }).pipe(
      map((response) => response.body as number),
      catchError(this.sharedService.handleError)
    );
  }

  createPriceRuleDetailRules(
    priceRuleDetailRules: PriceRuleDetailRules
  ): Observable<any> {
    let body = JSON.stringify(priceRuleDetailRules);
    return this.httpClient
      .post(this.priceRuleDetailRulesUrl, body, {
        headers: this.contentHeaders,
      })
      .pipe(
        map((response) => response),
        catchError(this.sharedService.handleError)
      );
  }

  updatePriceRuleDetailRules(
    priceRuleDetailRules: PriceRuleDetailRules,
    priceRule: string,
    ruleOrder:string,
    seqRuleDetail:string
  ): Observable<any> {
    let body = JSON.stringify(priceRuleDetailRules);
    return this.httpClient
      .put(
        `${this.priceRuleDetailRulesUrl}/${ruleOrder}/${seqRuleDetail}/${priceRule}`,
        body,
        {
          headers: this.contentHeaders,
        }
      )
      .pipe(
        map((response) => response),
        catchError(this.sharedService.handleError)
      );
  }

  partiallyUpdatePriceRuleDetailRules(
    priceRuleDetailRules: PriceRuleDetailRules,
    priceRule: string
  ): Observable<any> {
    let body = JSON.stringify(priceRuleDetailRules);
    return this.httpClient
      .patch(`${this.priceRuleDetailRulesUrl}/${priceRule}`, body, {
        headers: this.contentHeaders,
      })
      .pipe(
        map((response) => response),
        catchError(this.sharedService.handleError)
      );
  }

  deletePriceRuleDetailRules(priceRule: string): Observable<any> {
    return this.httpClient
      .delete(`${this.priceRuleDetailRulesUrl}/${priceRule}`, {
        observe: "response",
      })
      .pipe(
        map((response) => response.body),
        catchError(this.sharedService.handleError)
      );
  }

  deletePriceRuleDetailRulesByDetails(ruleOrder: any, seqRuleDetail: any, priceRule: string): Observable<any> {
    return this.httpClient
        .delete(`${this.priceRuleDetailRulesUrl}/${ruleOrder}/${seqRuleDetail}/${priceRule}`, {
          observe: "response",
        })
        .pipe(
            map((response) => response.body),
            catchError(this.sharedService.handleError)
        );
  }

  findByPriceRuleAndSeq(seqRuleDetail: any, priceRule: any) {
    return this.httpClient
      .get(
        `${this.priceRuleDetailRulesUrl}/find-by-price_rule_seq_rule_detail/${seqRuleDetail}/${priceRule}`,
        {
          observe: "response",
        }
      )
      .pipe(
        map((response) => response.body as PriceRuleDetailRules[]),
        catchError(this.sharedService.handleError)
      );
  }
}
