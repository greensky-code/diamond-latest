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

import { ResetStcInforListService } from './reset-stc-infor-list.service';
import { ResetStcInforList } from '../api-models/reset-stc-infor-list.model'
import { ResetStcInforLists } from "../api-models/testing/fake-reset-stc-infor-list.model"

describe('ResetStcInforListService', () => {
  let injector: TestBed;
  let service: ResetStcInforListService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ResetStcInforListService]
    });
    injector = getTestBed();
    service = injector.get(ResetStcInforListService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getResetStcInforLists', () => {
    it('should return an Promise<ResetStcInforList[]>', () => {
      const resetStcInforList = [
       {pStcInforList:'sample data'},
       {pStcInforList:'sample data'},
       {pStcInforList:'sample data'}

      ];
      service.getResetStcInforLists().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/resetstcinforlists/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(resetStcInforList);
    });
  });


  describe('#createResetStcInforList', () => {
    var id = 1;
    it('should return an Promise<ResetStcInforList>', () => {
      const resetStcInforList: ResetStcInforList = {pStcInforList:'sample data'};
      service.createResetStcInforList(resetStcInforList).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/resetstcinforlists`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateResetStcInforList', () => {
    var id = 1;
    it('should return an Promise<ResetStcInforList>', () => {
      const resetStcInforList: ResetStcInforList = {pStcInforList:'sample data'};
      service.updateResetStcInforList(resetStcInforList, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/resetstcinforlists/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteResetStcInforList', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteResetStcInforList(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/resetstcinforlists/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});