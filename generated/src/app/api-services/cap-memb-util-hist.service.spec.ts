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

import { CapMembUtilHistService } from './cap-memb-util-hist.service';
import { CapMembUtilHist } from '../api-models/cap-memb-util-hist.model'
import { CapMembUtilHists } from "../api-models/testing/fake-cap-memb-util-hist.model"

describe('CapMembUtilHistService', () => {
  let injector: TestBed;
  let service: CapMembUtilHistService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CapMembUtilHistService]
    });
    injector = getTestBed();
    service = injector.get(CapMembUtilHistService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCapMembUtilHists', () => {
    it('should return an Promise<CapMembUtilHist[]>', () => {
      const capMembUtilHist = [
       {seqCapMembUtilHist:1234, capModelId:'sample data', firstContractMonth:'2018-01-01', capEntityCode:'sample data', seqCapPoolId:1234, seqProvId:1234, seqVendId:1234, seqMembId:1234, applyTo:'sample data', capStoplossId:'sample data', mostRecentMonth:'2018-01-01', utilHistAmt:1234},
       {seqCapMembUtilHist:1234, capModelId:'sample data', firstContractMonth:'2018-01-01', capEntityCode:'sample data', seqCapPoolId:1234, seqProvId:1234, seqVendId:1234, seqMembId:1234, applyTo:'sample data', capStoplossId:'sample data', mostRecentMonth:'2018-01-01', utilHistAmt:1234},
       {seqCapMembUtilHist:1234, capModelId:'sample data', firstContractMonth:'2018-01-01', capEntityCode:'sample data', seqCapPoolId:1234, seqProvId:1234, seqVendId:1234, seqMembId:1234, applyTo:'sample data', capStoplossId:'sample data', mostRecentMonth:'2018-01-01', utilHistAmt:1234}

      ];
      service.getCapMembUtilHists().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/capmembutilhists/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(capMembUtilHist);
    });
  });


  describe('#createCapMembUtilHist', () => {
    var id = 1;
    it('should return an Promise<CapMembUtilHist>', () => {
      const capMembUtilHist: CapMembUtilHist = {seqCapMembUtilHist:1234, capModelId:'sample data', firstContractMonth:'2018-01-01', capEntityCode:'sample data', seqCapPoolId:1234, seqProvId:1234, seqVendId:1234, seqMembId:1234, applyTo:'sample data', capStoplossId:'sample data', mostRecentMonth:'2018-01-01', utilHistAmt:1234};
      service.createCapMembUtilHist(capMembUtilHist).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capmembutilhists`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCapMembUtilHist', () => {
    var id = 1;
    it('should return an Promise<CapMembUtilHist>', () => {
      const capMembUtilHist: CapMembUtilHist = {seqCapMembUtilHist:1234, capModelId:'sample data', firstContractMonth:'2018-01-01', capEntityCode:'sample data', seqCapPoolId:1234, seqProvId:1234, seqVendId:1234, seqMembId:1234, applyTo:'sample data', capStoplossId:'sample data', mostRecentMonth:'2018-01-01', utilHistAmt:1234};
      service.updateCapMembUtilHist(capMembUtilHist, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capmembutilhists/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCapMembUtilHist', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCapMembUtilHist(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capmembutilhists/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});