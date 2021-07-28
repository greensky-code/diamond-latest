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

import { FuncIsPayerPlatformService } from './func-is-payer-platform.service';
import { FuncIsPayerPlatform } from '../api-models/func-is-payer-platform.model'
import { FuncIsPayerPlatforms } from "../api-models/testing/fake-func-is-payer-platform.model"

describe('FuncIsPayerPlatformService', () => {
  let injector: TestBed;
  let service: FuncIsPayerPlatformService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FuncIsPayerPlatformService]
    });
    injector = getTestBed();
    service = injector.get(FuncIsPayerPlatformService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getFuncIsPayerPlatforms', () => {
    it('should return an Promise<FuncIsPayerPlatform[]>', () => {
      const funcIsPayerPlatform = [
       {pSeqGroupId:1234},
       {pSeqGroupId:1234},
       {pSeqGroupId:1234}

      ];
      service.getFuncIsPayerPlatforms().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/funcispayerplatforms/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(funcIsPayerPlatform);
    });
  });


  describe('#createFuncIsPayerPlatform', () => {
    var id = 1;
    it('should return an Promise<FuncIsPayerPlatform>', () => {
      const funcIsPayerPlatform: FuncIsPayerPlatform = {pSeqGroupId:1234};
      service.createFuncIsPayerPlatform(funcIsPayerPlatform).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcispayerplatforms`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateFuncIsPayerPlatform', () => {
    var id = 1;
    it('should return an Promise<FuncIsPayerPlatform>', () => {
      const funcIsPayerPlatform: FuncIsPayerPlatform = {pSeqGroupId:1234};
      service.updateFuncIsPayerPlatform(funcIsPayerPlatform, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcispayerplatforms/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteFuncIsPayerPlatform', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteFuncIsPayerPlatform(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/funcispayerplatforms/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});