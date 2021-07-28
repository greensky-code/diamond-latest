/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AlertMessageService, AlertMessage } from "../shared/alert-message/index";
import { Router } from '@angular/router'
import { Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import { async, ComponentFixture, TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment'
import { RouterTestingModule } from '@angular/router/testing';

import { CrRecommendMsgMastService } from './cr-recommend-msg-mast.service';
import { CrRecommendMsgMast } from '../api-models/cr-recommend-msg-mast.model'
import { CrRecommendMsgMasts } from "../api-models/testing/fake-cr-recommend-msg-mast.model"

describe('CrRecommendMsgMastService', () => {
  let injector: TestBed;
  let service: CrRecommendMsgMastService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CrRecommendMsgMastService]
    });
    injector = getTestBed();
    service = injector.get(CrRecommendMsgMastService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCrRecommendMsgMasts', () => {
    it('should return an Promise<CrRecommendMsgMast[]>', () => {
      const crRecommendMsgMast = [
       {recommendNo:1234, messageDesc:'sample data'},
       {recommendNo:1234, messageDesc:'sample data'},
       {recommendNo:1234, messageDesc:'sample data'}

      ];
      service.getCrRecommendMsgMasts().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/crrecommendmsgmasts/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(crRecommendMsgMast);
    });
  });


  describe('#createCrRecommendMsgMast', () => {
    var id = 1;
    it('should return an Promise<CrRecommendMsgMast>', () => {
      const crRecommendMsgMast: CrRecommendMsgMast = {recommendNo:1234, messageDesc:'sample data'};
      service.createCrRecommendMsgMast(crRecommendMsgMast).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/crrecommendmsgmasts`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCrRecommendMsgMast', () => {
    var id = 1;
    it('should return an Promise<CrRecommendMsgMast>', () => {
      const crRecommendMsgMast: CrRecommendMsgMast = {recommendNo:1234, messageDesc:'sample data'};
      service.updateCrRecommendMsgMast(crRecommendMsgMast, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/crrecommendmsgmasts/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCrRecommendMsgMast', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCrRecommendMsgMast(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/crrecommendmsgmasts/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});