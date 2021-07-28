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

import { GetGroupDetailsService } from './get-group-details.service';
import { GetGroupDetails } from '../api-models/get-group-details.model'
import { GetGroupDetail } from "../api-models/testing/fake-get-group-details.model"

describe('GetGroupDetailsService', () => {
  let injector: TestBed;
  let service: GetGroupDetailsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GetGroupDetailsService]
    });
    injector = getTestBed();
    service = injector.get(GetGroupDetailsService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getGetGroupDetail', () => {
    it('should return an Promise<GetGroupDetails[]>', () => {
      const getGroupDetails = [
       {pGroupId:'sample data', pGroupName:'sample data', pGroupHistTaxExempt:'sample data', pGroupCurrentTaxExempt:'sample data'},
       {pGroupId:'sample data', pGroupName:'sample data', pGroupHistTaxExempt:'sample data', pGroupCurrentTaxExempt:'sample data'},
       {pGroupId:'sample data', pGroupName:'sample data', pGroupHistTaxExempt:'sample data', pGroupCurrentTaxExempt:'sample data'}

      ];
      service.getGetGroupDetail().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/getgroupdetail/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(getGroupDetails);
    });
  });


  describe('#createGetGroupDetails', () => {
    var id = 1;
    it('should return an Promise<GetGroupDetails>', () => {
      const getGroupDetails: GetGroupDetails = {pGroupId:'sample data', pGroupName:'sample data', pGroupHistTaxExempt:'sample data', pGroupCurrentTaxExempt:'sample data'};
      service.createGetGroupDetails(getGroupDetails).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getgroupdetail`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateGetGroupDetails', () => {
    var id = 1;
    it('should return an Promise<GetGroupDetails>', () => {
      const getGroupDetails: GetGroupDetails = {pGroupId:'sample data', pGroupName:'sample data', pGroupHistTaxExempt:'sample data', pGroupCurrentTaxExempt:'sample data'};
      service.updateGetGroupDetails(getGroupDetails, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getgroupdetail/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteGetGroupDetails', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteGetGroupDetails(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getgroupdetail/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});