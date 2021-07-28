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

import { StageAuthProvService } from './stage-auth-prov.service';
import { StageAuthProv } from '../api-models/stage-auth-prov.model'
import { StageAuthProvs } from "../api-models/testing/fake-stage-auth-prov.model"

describe('StageAuthProvService', () => {
  let injector: TestBed;
  let service: StageAuthProvService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StageAuthProvService]
    });
    injector = getTestBed();
    service = injector.get(StageAuthProvService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getStageAuthProvs', () => {
    it('should return an Promise<StageAuthProv[]>', () => {
      const stageAuthProv = [
       {batchId:'sample data', transactionId:1234, seqNo:1234, provCode:'sample data', provId:'sample data', provTaxId:'sample data', provNatId:'sample data', provLastName:'sample data', provFirstName:'sample data', provAddress:'sample data', provCity:'sample data', provState:'sample data', provZip:'sample data', outOfNetStatus:'sample data', provIdQualifier:'sample data', provEntityIdCode:'sample data', provTaxonomyCode:'sample data', insertDatetime:'2018-01-01'},
       {batchId:'sample data', transactionId:1234, seqNo:1234, provCode:'sample data', provId:'sample data', provTaxId:'sample data', provNatId:'sample data', provLastName:'sample data', provFirstName:'sample data', provAddress:'sample data', provCity:'sample data', provState:'sample data', provZip:'sample data', outOfNetStatus:'sample data', provIdQualifier:'sample data', provEntityIdCode:'sample data', provTaxonomyCode:'sample data', insertDatetime:'2018-01-01'},
       {batchId:'sample data', transactionId:1234, seqNo:1234, provCode:'sample data', provId:'sample data', provTaxId:'sample data', provNatId:'sample data', provLastName:'sample data', provFirstName:'sample data', provAddress:'sample data', provCity:'sample data', provState:'sample data', provZip:'sample data', outOfNetStatus:'sample data', provIdQualifier:'sample data', provEntityIdCode:'sample data', provTaxonomyCode:'sample data', insertDatetime:'2018-01-01'}

      ];
      service.getStageAuthProvs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/stageauthprovs/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(stageAuthProv);
    });
  });


  describe('#createStageAuthProv', () => {
    var id = 1;
    it('should return an Promise<StageAuthProv>', () => {
      const stageAuthProv: StageAuthProv = {batchId:'sample data', transactionId:1234, seqNo:1234, provCode:'sample data', provId:'sample data', provTaxId:'sample data', provNatId:'sample data', provLastName:'sample data', provFirstName:'sample data', provAddress:'sample data', provCity:'sample data', provState:'sample data', provZip:'sample data', outOfNetStatus:'sample data', provIdQualifier:'sample data', provEntityIdCode:'sample data', provTaxonomyCode:'sample data', insertDatetime:'2018-01-01'};
      service.createStageAuthProv(stageAuthProv).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageauthprovs`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateStageAuthProv', () => {
    var id = 1;
    it('should return an Promise<StageAuthProv>', () => {
      const stageAuthProv: StageAuthProv = {batchId:'sample data', transactionId:1234, seqNo:1234, provCode:'sample data', provId:'sample data', provTaxId:'sample data', provNatId:'sample data', provLastName:'sample data', provFirstName:'sample data', provAddress:'sample data', provCity:'sample data', provState:'sample data', provZip:'sample data', outOfNetStatus:'sample data', provIdQualifier:'sample data', provEntityIdCode:'sample data', provTaxonomyCode:'sample data', insertDatetime:'2018-01-01'};
      service.updateStageAuthProv(stageAuthProv, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageauthprovs/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteStageAuthProv', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteStageAuthProv(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageauthprovs/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});