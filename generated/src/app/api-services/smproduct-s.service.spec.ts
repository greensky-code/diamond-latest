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

import { SmproductSService } from './smproduct-s.service';
import { SmproductS } from '../api-models/smproduct-s.model'
import { SmproductSs } from "../api-models/testing/fake-smproduct-s.model"

describe('SmproductSService', () => {
  let injector: TestBed;
  let service: SmproductSService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmproductSService]
    });
    injector = getTestBed();
    service = injector.get(SmproductSService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSmproductSs', () => {
    it('should return an Promise<SmproductS[]>', () => {
      const smproductS = [
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, productOwnerid:1234, productOwnertype:1234, productProductid:1234, productDependencies:'sample data', productSharable:'sample data', productSelected:'sample data', productPrdfile:'sample data'},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, productOwnerid:1234, productOwnertype:1234, productProductid:1234, productDependencies:'sample data', productSharable:'sample data', productSelected:'sample data', productPrdfile:'sample data'},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, productOwnerid:1234, productOwnertype:1234, productProductid:1234, productDependencies:'sample data', productSharable:'sample data', productSelected:'sample data', productPrdfile:'sample data'}

      ];
      service.getSmproductSs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/smproductss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(smproductS);
    });
  });


  describe('#createSmproductS', () => {
    var id = 1;
    it('should return an Promise<SmproductS>', () => {
      const smproductS: SmproductS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, productOwnerid:1234, productOwnertype:1234, productProductid:1234, productDependencies:'sample data', productSharable:'sample data', productSelected:'sample data', productPrdfile:'sample data'};
      service.createSmproductS(smproductS).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smproductss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSmproductS', () => {
    var id = 1;
    it('should return an Promise<SmproductS>', () => {
      const smproductS: SmproductS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, productOwnerid:1234, productOwnertype:1234, productProductid:1234, productDependencies:'sample data', productSharable:'sample data', productSelected:'sample data', productPrdfile:'sample data'};
      service.updateSmproductS(smproductS, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smproductss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSmproductS', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSmproductS(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smproductss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});