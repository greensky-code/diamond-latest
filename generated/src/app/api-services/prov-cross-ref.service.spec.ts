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

import { ProvCrossRefService } from './prov-cross-ref.service';
import { ProvCrossRef } from '../api-models/prov-cross-ref.model'
import { ProvCrossRefs } from "../api-models/testing/fake-prov-cross-ref.model"

describe('ProvCrossRefService', () => {
  let injector: TestBed;
  let service: ProvCrossRefService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProvCrossRefService]
    });
    injector = getTestBed();
    service = injector.get(ProvCrossRefService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProvCrossRefs', () => {
    it('should return an Promise<ProvCrossRef[]>', () => {
      const provCrossRef = [
       {seqProvxId:1234, payorId:'sample data', payorCode:'sample data', seqProvId:1234, seqProvAddress:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqProvxId:1234, payorId:'sample data', payorCode:'sample data', seqProvId:1234, seqProvAddress:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqProvxId:1234, payorId:'sample data', payorCode:'sample data', seqProvId:1234, seqProvAddress:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getProvCrossRefs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/provcrossrefs/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(provCrossRef);
    });
  });


  describe('#createProvCrossRef', () => {
    var id = 1;
    it('should return an Promise<ProvCrossRef>', () => {
      const provCrossRef: ProvCrossRef = {seqProvxId:1234, payorId:'sample data', payorCode:'sample data', seqProvId:1234, seqProvAddress:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createProvCrossRef(provCrossRef).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/provcrossrefs`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProvCrossRef', () => {
    var id = 1;
    it('should return an Promise<ProvCrossRef>', () => {
      const provCrossRef: ProvCrossRef = {seqProvxId:1234, payorId:'sample data', payorCode:'sample data', seqProvId:1234, seqProvAddress:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateProvCrossRef(provCrossRef, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/provcrossrefs/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProvCrossRef', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProvCrossRef(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/provcrossrefs/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});