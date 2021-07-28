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

import { RmSpecialCharService } from './rm-special-char.service';
import { RmSpecialChar } from '../api-models/rm-special-char.model'
import { RmSpecialChars } from "../api-models/testing/fake-rm-special-char.model"

describe('RmSpecialCharService', () => {
  let injector: TestBed;
  let service: RmSpecialCharService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RmSpecialCharService]
    });
    injector = getTestBed();
    service = injector.get(RmSpecialCharService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getRmSpecialChars', () => {
    it('should return an Promise<RmSpecialChar[]>', () => {
      const rmSpecialChar = [
       {pInputStr:'sample data'},
       {pInputStr:'sample data'},
       {pInputStr:'sample data'}

      ];
      service.getRmSpecialChars().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/rmspecialchars/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(rmSpecialChar);
    });
  });


  describe('#createRmSpecialChar', () => {
    var id = 1;
    it('should return an Promise<RmSpecialChar>', () => {
      const rmSpecialChar: RmSpecialChar = {pInputStr:'sample data'};
      service.createRmSpecialChar(rmSpecialChar).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/rmspecialchars`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateRmSpecialChar', () => {
    var id = 1;
    it('should return an Promise<RmSpecialChar>', () => {
      const rmSpecialChar: RmSpecialChar = {pInputStr:'sample data'};
      service.updateRmSpecialChar(rmSpecialChar, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/rmspecialchars/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteRmSpecialChar', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteRmSpecialChar(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/rmspecialchars/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});