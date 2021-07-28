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

import { ProvContractSpecialtyService } from './prov-contract-specialty.service';
import { ProvContractSpecialty } from '../api-models/prov-contract-specialty.model'
import { ProvContractSpecialtys } from "../api-models/testing/fake-prov-contract-specialty.model"

describe('ProvContractSpecialtyService', () => {
  let injector: TestBed;
  let service: ProvContractSpecialtyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProvContractSpecialtyService]
    });
    injector = getTestBed();
    service = injector.get(ProvContractSpecialtyService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProvContractSpecialtys', () => {
    it('should return an Promise<ProvContractSpecialty[]>', () => {
      const provContractSpecialty = [
       {seqProvId:1234, seqProvContract:1234, specialtyType:'sample data', primarySpecialty:'sample data', boardStatus:'sample data', directoryInclude:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqProvId:1234, seqProvContract:1234, specialtyType:'sample data', primarySpecialty:'sample data', boardStatus:'sample data', directoryInclude:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqProvId:1234, seqProvContract:1234, specialtyType:'sample data', primarySpecialty:'sample data', boardStatus:'sample data', directoryInclude:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getProvContractSpecialtys().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/provcontractspecialtys/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(provContractSpecialty);
    });
  });


  describe('#createProvContractSpecialty', () => {
    var id = 1;
    it('should return an Promise<ProvContractSpecialty>', () => {
      const provContractSpecialty: ProvContractSpecialty = {seqProvId:1234, seqProvContract:1234, specialtyType:'sample data', primarySpecialty:'sample data', boardStatus:'sample data', directoryInclude:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createProvContractSpecialty(provContractSpecialty).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/provcontractspecialtys`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProvContractSpecialty', () => {
    var id = 1;
    it('should return an Promise<ProvContractSpecialty>', () => {
      const provContractSpecialty: ProvContractSpecialty = {seqProvId:1234, seqProvContract:1234, specialtyType:'sample data', primarySpecialty:'sample data', boardStatus:'sample data', directoryInclude:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateProvContractSpecialty(provContractSpecialty, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/provcontractspecialtys/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProvContractSpecialty', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProvContractSpecialty(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/provcontractspecialtys/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});