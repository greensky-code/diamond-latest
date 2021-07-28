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

import { SmproductattributeSService } from './smproductattribute-s.service';
import { SmproductattributeS } from '../api-models/smproductattribute-s.model'
import { SmproductattributeSs } from "../api-models/testing/fake-smproductattribute-s.model"

describe('SmproductattributeSService', () => {
  let injector: TestBed;
  let service: SmproductattributeSService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmproductattributeSService]
    });
    injector = getTestBed();
    service = injector.get(SmproductattributeSService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSmproductattributeSs', () => {
    it('should return an Promise<SmproductattributeS[]>', () => {
      const smproductattributeS = [
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, productattributeProductname:'sample data', productattributeItfclabel:'sample data', productattributeVersion:'sample data', productattributeOs:'sample data', productattributeProductsize:1234, productattributePrdpath:'sample data', productattributeParent:'sample data', productattributeVisible:'sample data', productattributeOpen:'sample data', productattributeDescr:'sample data'},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, productattributeProductname:'sample data', productattributeItfclabel:'sample data', productattributeVersion:'sample data', productattributeOs:'sample data', productattributeProductsize:1234, productattributePrdpath:'sample data', productattributeParent:'sample data', productattributeVisible:'sample data', productattributeOpen:'sample data', productattributeDescr:'sample data'},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, productattributeProductname:'sample data', productattributeItfclabel:'sample data', productattributeVersion:'sample data', productattributeOs:'sample data', productattributeProductsize:1234, productattributePrdpath:'sample data', productattributeParent:'sample data', productattributeVisible:'sample data', productattributeOpen:'sample data', productattributeDescr:'sample data'}

      ];
      service.getSmproductattributeSs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/smproductattributess/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(smproductattributeS);
    });
  });


  describe('#createSmproductattributeS', () => {
    var id = 1;
    it('should return an Promise<SmproductattributeS>', () => {
      const smproductattributeS: SmproductattributeS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, productattributeProductname:'sample data', productattributeItfclabel:'sample data', productattributeVersion:'sample data', productattributeOs:'sample data', productattributeProductsize:1234, productattributePrdpath:'sample data', productattributeParent:'sample data', productattributeVisible:'sample data', productattributeOpen:'sample data', productattributeDescr:'sample data'};
      service.createSmproductattributeS(smproductattributeS).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smproductattributess`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSmproductattributeS', () => {
    var id = 1;
    it('should return an Promise<SmproductattributeS>', () => {
      const smproductattributeS: SmproductattributeS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, productattributeProductname:'sample data', productattributeItfclabel:'sample data', productattributeVersion:'sample data', productattributeOs:'sample data', productattributeProductsize:1234, productattributePrdpath:'sample data', productattributeParent:'sample data', productattributeVisible:'sample data', productattributeOpen:'sample data', productattributeDescr:'sample data'};
      service.updateSmproductattributeS(smproductattributeS, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smproductattributess/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSmproductattributeS', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSmproductattributeS(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smproductattributess/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});