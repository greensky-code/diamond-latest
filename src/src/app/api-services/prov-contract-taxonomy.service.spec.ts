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

import { ProvContractTaxonomyService } from './prov-contract-taxonomy.service';
import { ProvContractTaxonomy } from '../api-models/prov-contract-taxonomy.model'
import { ProvContractTaxonomys } from "../api-models/testing/fake-prov-contract-taxonomy.model"

describe('ProvContractTaxonomyService', () => {
  let injector: TestBed;
  let service: ProvContractTaxonomyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProvContractTaxonomyService]
    });
    injector = getTestBed();
    service = injector.get(ProvContractTaxonomyService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProvContractTaxonomys', () => {
    it('should return an Promise<ProvContractTaxonomy[]>', () => {
      const provContractTaxonomy = [
       {seqProvId:1234, seqProvContract:1234, taxonomyCode:'sample data', primary:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqProvId:1234, seqProvContract:1234, taxonomyCode:'sample data', primary:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqProvId:1234, seqProvContract:1234, taxonomyCode:'sample data', primary:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getProvContractTaxonomys().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/provcontracttaxonomys/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(provContractTaxonomy);
    });
  });


  describe('#createProvContractTaxonomy', () => {
    var id = 1;
    it('should return an Promise<ProvContractTaxonomy>', () => {
      const provContractTaxonomy: ProvContractTaxonomy = {seqProvId:1234, seqProvContract:1234, taxonomyCode:'sample data', primary:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createProvContractTaxonomy(provContractTaxonomy).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/provcontracttaxonomys`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProvContractTaxonomy', () => {
    var id = 1;
    it('should return an Promise<ProvContractTaxonomy>', () => {
      const provContractTaxonomy: ProvContractTaxonomy = {seqProvId:1234, seqProvContract:1234, taxonomyCode:'sample data', primary:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateProvContractTaxonomy(provContractTaxonomy, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/provcontracttaxonomys/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProvContractTaxonomy', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProvContractTaxonomy(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/provcontracttaxonomys/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});