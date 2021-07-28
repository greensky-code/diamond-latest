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

import { ProcProcessExternalCarrierService } from './proc-process-external-carrier.service';
import { ProcProcessExternalCarrier } from '../api-models/proc-process-external-carrier.model'
import { ProcProcessExternalCarriers } from "../api-models/testing/fake-proc-process-external-carrier.model"

describe('ProcProcessExternalCarrierService', () => {
  let injector: TestBed;
  let service: ProcProcessExternalCarrierService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcProcessExternalCarrierService]
    });
    injector = getTestBed();
    service = injector.get(ProcProcessExternalCarrierService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcProcessExternalCarriers', () => {
    it('should return an Promise<ProcProcessExternalCarrier[]>', () => {
      const procProcessExternalCarrier = [
       {pGroupId:'sample data', pPlanCode:'sample data', pPlanEffDate:'sample data', pPlanEndDate:'sample data', pExtnCarrGroupId:'sample data', pProductType:'sample data', pExtnCarrName:'sample data', pExtnCarrId:'sample data', pSharMethod:'sample data', pSharBenType:'sample data'},
       {pGroupId:'sample data', pPlanCode:'sample data', pPlanEffDate:'sample data', pPlanEndDate:'sample data', pExtnCarrGroupId:'sample data', pProductType:'sample data', pExtnCarrName:'sample data', pExtnCarrId:'sample data', pSharMethod:'sample data', pSharBenType:'sample data'},
       {pGroupId:'sample data', pPlanCode:'sample data', pPlanEffDate:'sample data', pPlanEndDate:'sample data', pExtnCarrGroupId:'sample data', pProductType:'sample data', pExtnCarrName:'sample data', pExtnCarrId:'sample data', pSharMethod:'sample data', pSharBenType:'sample data'}

      ];
      service.getProcProcessExternalCarriers().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/procprocessexternalcarriers/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procProcessExternalCarrier);
    });
  });


  describe('#createProcProcessExternalCarrier', () => {
    var id = 1;
    it('should return an Promise<ProcProcessExternalCarrier>', () => {
      const procProcessExternalCarrier: ProcProcessExternalCarrier = {pGroupId:'sample data', pPlanCode:'sample data', pPlanEffDate:'sample data', pPlanEndDate:'sample data', pExtnCarrGroupId:'sample data', pProductType:'sample data', pExtnCarrName:'sample data', pExtnCarrId:'sample data', pSharMethod:'sample data', pSharBenType:'sample data'};
      service.createProcProcessExternalCarrier(procProcessExternalCarrier).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procprocessexternalcarriers`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcProcessExternalCarrier', () => {
    var id = 1;
    it('should return an Promise<ProcProcessExternalCarrier>', () => {
      const procProcessExternalCarrier: ProcProcessExternalCarrier = {pGroupId:'sample data', pPlanCode:'sample data', pPlanEffDate:'sample data', pPlanEndDate:'sample data', pExtnCarrGroupId:'sample data', pProductType:'sample data', pExtnCarrName:'sample data', pExtnCarrId:'sample data', pSharMethod:'sample data', pSharBenType:'sample data'};
      service.updateProcProcessExternalCarrier(procProcessExternalCarrier, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procprocessexternalcarriers/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcProcessExternalCarrier', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcProcessExternalCarrier(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procprocessexternalcarriers/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});