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

import { CsfGetTypeOfBankRelationService } from './csf-get-type-of-bank-relation.service';
import { CsfGetTypeOfBankRelation } from '../api-models/csf-get-type-of-bank-relation.model'
import { CsfGetTypeOfBankRelations } from "../api-models/testing/fake-csf-get-type-of-bank-relation.model"

describe('CsfGetTypeOfBankRelationService', () => {
  let injector: TestBed;
  let service: CsfGetTypeOfBankRelationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CsfGetTypeOfBankRelationService]
    });
    injector = getTestBed();
    service = injector.get(CsfGetTypeOfBankRelationService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCsfGetTypeOfBankRelations', () => {
    it('should return an Promise<CsfGetTypeOfBankRelation[]>', () => {
      const csfGetTypeOfBankRelation = [
       {pSeqAddrId:1234},
       {pSeqAddrId:1234},
       {pSeqAddrId:1234}

      ];
      service.getCsfGetTypeOfBankRelations().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/csfgettypeofbankrelations/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(csfGetTypeOfBankRelation);
    });
  });


  describe('#createCsfGetTypeOfBankRelation', () => {
    var id = 1;
    it('should return an Promise<CsfGetTypeOfBankRelation>', () => {
      const csfGetTypeOfBankRelation: CsfGetTypeOfBankRelation = {pSeqAddrId:1234};
      service.createCsfGetTypeOfBankRelation(csfGetTypeOfBankRelation).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/csfgettypeofbankrelations`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCsfGetTypeOfBankRelation', () => {
    var id = 1;
    it('should return an Promise<CsfGetTypeOfBankRelation>', () => {
      const csfGetTypeOfBankRelation: CsfGetTypeOfBankRelation = {pSeqAddrId:1234};
      service.updateCsfGetTypeOfBankRelation(csfGetTypeOfBankRelation, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/csfgettypeofbankrelations/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCsfGetTypeOfBankRelation', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCsfGetTypeOfBankRelation(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/csfgettypeofbankrelations/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});