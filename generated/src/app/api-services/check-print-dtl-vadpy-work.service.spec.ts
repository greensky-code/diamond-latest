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

import { CheckPrintDtlVadpyWorkService } from './check-print-dtl-vadpy-work.service';
import { CheckPrintDtlVadpyWork } from '../api-models/check-print-dtl-vadpy-work.model'
import { CheckPrintDtlVadpyWorks } from "../api-models/testing/fake-check-print-dtl-vadpy-work.model"

describe('CheckPrintDtlVadpyWorkService', () => {
  let injector: TestBed;
  let service: CheckPrintDtlVadpyWorkService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CheckPrintDtlVadpyWorkService]
    });
    injector = getTestBed();
    service = injector.get(CheckPrintDtlVadpyWorkService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCheckPrintDtlVadpyWorks', () => {
    it('should return an Promise<CheckPrintDtlVadpyWork[]>', () => {
      const checkPrintDtlVadpyWork = [
       {seqCkprtId:1234, seqApTrans:1234, seqVendId:1234, seqVendAddress:1234, offsetFlag:'sample data', checkEftAmount:1234, seqVendAdvPayAccDtl:1234},
       {seqCkprtId:1234, seqApTrans:1234, seqVendId:1234, seqVendAddress:1234, offsetFlag:'sample data', checkEftAmount:1234, seqVendAdvPayAccDtl:1234},
       {seqCkprtId:1234, seqApTrans:1234, seqVendId:1234, seqVendAddress:1234, offsetFlag:'sample data', checkEftAmount:1234, seqVendAdvPayAccDtl:1234}

      ];
      service.getCheckPrintDtlVadpyWorks().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/checkprintdtlvadpyworks/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(checkPrintDtlVadpyWork);
    });
  });


  describe('#createCheckPrintDtlVadpyWork', () => {
    var id = 1;
    it('should return an Promise<CheckPrintDtlVadpyWork>', () => {
      const checkPrintDtlVadpyWork: CheckPrintDtlVadpyWork = {seqCkprtId:1234, seqApTrans:1234, seqVendId:1234, seqVendAddress:1234, offsetFlag:'sample data', checkEftAmount:1234, seqVendAdvPayAccDtl:1234};
      service.createCheckPrintDtlVadpyWork(checkPrintDtlVadpyWork).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/checkprintdtlvadpyworks`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCheckPrintDtlVadpyWork', () => {
    var id = 1;
    it('should return an Promise<CheckPrintDtlVadpyWork>', () => {
      const checkPrintDtlVadpyWork: CheckPrintDtlVadpyWork = {seqCkprtId:1234, seqApTrans:1234, seqVendId:1234, seqVendAddress:1234, offsetFlag:'sample data', checkEftAmount:1234, seqVendAdvPayAccDtl:1234};
      service.updateCheckPrintDtlVadpyWork(checkPrintDtlVadpyWork, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/checkprintdtlvadpyworks/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCheckPrintDtlVadpyWork', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCheckPrintDtlVadpyWork(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/checkprintdtlvadpyworks/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});