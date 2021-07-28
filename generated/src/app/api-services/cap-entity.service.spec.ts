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

import { CapEntityService } from './cap-entity.service';
import { CapEntity } from '../api-models/cap-entity.model'
import { CapEntitys } from "../api-models/testing/fake-cap-entity.model"

describe('CapEntityService', () => {
  let injector: TestBed;
  let service: CapEntityService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CapEntityService]
    });
    injector = getTestBed();
    service = injector.get(CapEntityService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCapEntitys', () => {
    it('should return an Promise<CapEntity[]>', () => {
      const capEntity = [
       {capModelId:'sample data', capEntityId:'sample data', capEntityCode:'sample data', seqSpecProvId:1234, seqVendId:1234, affProvKey:'sample data', description:'sample data', provEqPcp:'sample data', participationFlag:'sample data', contractType:'sample data', useThreshold:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqCapVendAddress:1234},
       {capModelId:'sample data', capEntityId:'sample data', capEntityCode:'sample data', seqSpecProvId:1234, seqVendId:1234, affProvKey:'sample data', description:'sample data', provEqPcp:'sample data', participationFlag:'sample data', contractType:'sample data', useThreshold:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqCapVendAddress:1234},
       {capModelId:'sample data', capEntityId:'sample data', capEntityCode:'sample data', seqSpecProvId:1234, seqVendId:1234, affProvKey:'sample data', description:'sample data', provEqPcp:'sample data', participationFlag:'sample data', contractType:'sample data', useThreshold:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqCapVendAddress:1234}

      ];
      service.getCapEntitys().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/capentitys/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(capEntity);
    });
  });


  describe('#createCapEntity', () => {
    var id = 1;
    it('should return an Promise<CapEntity>', () => {
      const capEntity: CapEntity = {capModelId:'sample data', capEntityId:'sample data', capEntityCode:'sample data', seqSpecProvId:1234, seqVendId:1234, affProvKey:'sample data', description:'sample data', provEqPcp:'sample data', participationFlag:'sample data', contractType:'sample data', useThreshold:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqCapVendAddress:1234};
      service.createCapEntity(capEntity).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capentitys`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCapEntity', () => {
    var id = 1;
    it('should return an Promise<CapEntity>', () => {
      const capEntity: CapEntity = {capModelId:'sample data', capEntityId:'sample data', capEntityCode:'sample data', seqSpecProvId:1234, seqVendId:1234, affProvKey:'sample data', description:'sample data', provEqPcp:'sample data', participationFlag:'sample data', contractType:'sample data', useThreshold:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqCapVendAddress:1234};
      service.updateCapEntity(capEntity, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capentitys/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCapEntity', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCapEntity(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capentitys/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});