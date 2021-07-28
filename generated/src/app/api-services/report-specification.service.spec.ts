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

import { ReportSpecificationService } from './report-specification.service';
import { ReportSpecification } from '../api-models/report-specification.model'
import { ReportSpecifications } from "../api-models/testing/fake-report-specification.model"

describe('ReportSpecificationService', () => {
  let injector: TestBed;
  let service: ReportSpecificationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReportSpecificationService]
    });
    injector = getTestBed();
    service = injector.get(ReportSpecificationService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getReportSpecifications', () => {
    it('should return an Promise<ReportSpecification[]>', () => {
      const reportSpecification = [
       {reportCode:'sample data', reportName:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data'},
       {reportCode:'sample data', reportName:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data'},
       {reportCode:'sample data', reportName:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data'}

      ];
      service.getReportSpecifications().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/reportspecifications/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(reportSpecification);
    });
  });


  describe('#createReportSpecification', () => {
    var id = 1;
    it('should return an Promise<ReportSpecification>', () => {
      const reportSpecification: ReportSpecification = {reportCode:'sample data', reportName:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data'};
      service.createReportSpecification(reportSpecification).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/reportspecifications`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateReportSpecification', () => {
    var id = 1;
    it('should return an Promise<ReportSpecification>', () => {
      const reportSpecification: ReportSpecification = {reportCode:'sample data', reportName:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data'};
      service.updateReportSpecification(reportSpecification, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/reportspecifications/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteReportSpecification', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteReportSpecification(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/reportspecifications/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});