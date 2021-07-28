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

import { GetRxProdNameService } from './get-rx-prod-name.service';
import { GetRxProdName } from '../api-models/get-rx-prod-name.model'
import { GetRxProdNames } from "../api-models/testing/fake-get-rx-prod-name.model"

describe('GetRxProdNameService', () => {
  let injector: TestBed;
  let service: GetRxProdNameService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GetRxProdNameService]
    });
    injector = getTestBed();
    service = injector.get(GetRxProdNameService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getGetRxProdNames', () => {
    it('should return an Promise<GetRxProdName[]>', () => {
      const getRxProdName = [
       {pPackageId:'sample data'},
       {pPackageId:'sample data'},
       {pPackageId:'sample data'}

      ];
      service.getGetRxProdNames().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/getrxprodnames/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(getRxProdName);
    });
  });


  describe('#createGetRxProdName', () => {
    var id = 1;
    it('should return an Promise<GetRxProdName>', () => {
      const getRxProdName: GetRxProdName = {pPackageId:'sample data'};
      service.createGetRxProdName(getRxProdName).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getrxprodnames`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateGetRxProdName', () => {
    var id = 1;
    it('should return an Promise<GetRxProdName>', () => {
      const getRxProdName: GetRxProdName = {pPackageId:'sample data'};
      service.updateGetRxProdName(getRxProdName, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getrxprodnames/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteGetRxProdName', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteGetRxProdName(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getrxprodnames/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});