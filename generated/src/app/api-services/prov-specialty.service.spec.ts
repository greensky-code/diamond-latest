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

import { ProvSpecialtyService } from './prov-specialty.service';
import { ProvSpecialty } from '../api-models/prov-specialty.model'
import { ProvSpecialtys } from "../api-models/testing/fake-prov-specialty.model"

describe('ProvSpecialtyService', () => {
  let injector: TestBed;
  let service: ProvSpecialtyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProvSpecialtyService]
    });
    injector = getTestBed();
    service = injector.get(ProvSpecialtyService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProvSpecialtys', () => {
    it('should return an Promise<ProvSpecialty[]>', () => {
      const provSpecialty = [
       {seqProvId:1234, specialtyType:'sample data', primarySpecialty:'sample data', boardStatus:'sample data', directoryInclude:'sample data', acceptsPatients:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqProvId:1234, specialtyType:'sample data', primarySpecialty:'sample data', boardStatus:'sample data', directoryInclude:'sample data', acceptsPatients:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqProvId:1234, specialtyType:'sample data', primarySpecialty:'sample data', boardStatus:'sample data', directoryInclude:'sample data', acceptsPatients:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getProvSpecialtys().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/provspecialtys/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(provSpecialty);
    });
  });


  describe('#createProvSpecialty', () => {
    var id = 1;
    it('should return an Promise<ProvSpecialty>', () => {
      const provSpecialty: ProvSpecialty = {seqProvId:1234, specialtyType:'sample data', primarySpecialty:'sample data', boardStatus:'sample data', directoryInclude:'sample data', acceptsPatients:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createProvSpecialty(provSpecialty).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/provspecialtys`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProvSpecialty', () => {
    var id = 1;
    it('should return an Promise<ProvSpecialty>', () => {
      const provSpecialty: ProvSpecialty = {seqProvId:1234, specialtyType:'sample data', primarySpecialty:'sample data', boardStatus:'sample data', directoryInclude:'sample data', acceptsPatients:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateProvSpecialty(provSpecialty, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/provspecialtys/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProvSpecialty', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProvSpecialty(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/provspecialtys/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});