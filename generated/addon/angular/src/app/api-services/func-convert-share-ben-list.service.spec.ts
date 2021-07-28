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

import { FuncConvertShareBenListService } from './func-convert-share-ben-list.service';
import { FuncConvertShareBenList } from '../api-models/func-convert-share-ben-list.model'
import { FuncConvertShareBenLists } from "../api-models/testing/fake-func-convert-share-ben-list.model"

describe('FuncConvertShareBenListService', () => {
  let injector: TestBed;
  let service: FuncConvertShareBenListService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FuncConvertShareBenListService]
    });
    injector = getTestBed();
    service = injector.get(FuncConvertShareBenListService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getFuncConvertShareBenLists', () => {
    it('should return an Promise<FuncConvertShareBenList[]>', () => {
      const funcConvertShareBenList = [
       {pExternalShareBen:'sample data'},
       {pExternalShareBen:'sample data'},
       {pExternalShareBen:'sample data'}

      ];
      service.getFuncConvertShareBenLists().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/funcconvertsharebenlists/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(funcConvertShareBenList);
    });
  });


  describe('#createFuncConvertShareBenList', () => {
    var id = 1;
    it('should return an Promise<FuncConvertShareBenList>', () => {
      const funcConvertShareBenList: FuncConvertShareBenList = {pExternalShareBen:'sample data'};
      service.createFuncConvertShareBenList(funcConvertShareBenList).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcconvertsharebenlists`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateFuncConvertShareBenList', () => {
    var id = 1;
    it('should return an Promise<FuncConvertShareBenList>', () => {
      const funcConvertShareBenList: FuncConvertShareBenList = {pExternalShareBen:'sample data'};
      service.updateFuncConvertShareBenList(funcConvertShareBenList, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcconvertsharebenlists/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteFuncConvertShareBenList', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteFuncConvertShareBenList(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcconvertsharebenlists/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});