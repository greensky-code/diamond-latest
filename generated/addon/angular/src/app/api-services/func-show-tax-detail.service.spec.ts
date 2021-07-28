/* Copyright (c) 2021 . All Rights Reserved. */

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

import { FuncShowTaxDetailService } from './func-show-tax-detail.service';
import { FuncShowTaxDetail } from '../api-models/func-show-tax-detail.model'
import { FuncShowTaxDetails } from "../api-models/testing/fake-func-show-tax-detail.model"

describe('FuncShowTaxDetailService', () => {
  let injector: TestBed;
  let service: FuncShowTaxDetailService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FuncShowTaxDetailService]
    });
    injector = getTestBed();
    service = injector.get(FuncShowTaxDetailService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getFuncShowTaxDetails', () => {
    it('should return an Promise<FuncShowTaxDetail[]>', () => {
      const funcShowTaxDetail = [
       {pNoteType:'sample data'},
       {pNoteType:'sample data'},
       {pNoteType:'sample data'}

      ];
      service.getFuncShowTaxDetails().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/funcshowtaxdetails/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(funcShowTaxDetail);
    });
  });


  describe('#createFuncShowTaxDetail', () => {
    var id = 1;
    it('should return an Promise<FuncShowTaxDetail>', () => {
      const funcShowTaxDetail: FuncShowTaxDetail = {pNoteType:'sample data'};
      service.createFuncShowTaxDetail(funcShowTaxDetail).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcshowtaxdetails`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateFuncShowTaxDetail', () => {
    var id = 1;
    it('should return an Promise<FuncShowTaxDetail>', () => {
      const funcShowTaxDetail: FuncShowTaxDetail = {pNoteType:'sample data'};
      service.updateFuncShowTaxDetail(funcShowTaxDetail, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcshowtaxdetails/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteFuncShowTaxDetail', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteFuncShowTaxDetail(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcshowtaxdetails/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});