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

import { SmdependentlinksService } from './smdependentlinks.service';
import { Smdependentlinks } from '../api-models/smdependentlinks.model'
import { Smdependentlinkss } from "../api-models/testing/fake-smdependentlinks.model"

describe('SmdependentlinksService', () => {
  let injector: TestBed;
  let service: SmdependentlinksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmdependentlinksService]
    });
    injector = getTestBed();
    service = injector.get(SmdependentlinksService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSmdependentlinkss', () => {
    it('should return an Promise<Smdependentlinks[]>', () => {
      const smdependentlinks = [
       {dependentid:1234, dependenttype:1234, dependeeid:1234, dependeetype:1234, associationId:1234},
       {dependentid:1234, dependenttype:1234, dependeeid:1234, dependeetype:1234, associationId:1234},
       {dependentid:1234, dependenttype:1234, dependeeid:1234, dependeetype:1234, associationId:1234}

      ];
      service.getSmdependentlinkss().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/smdependentlinkss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(smdependentlinks);
    });
  });


  describe('#createSmdependentlinks', () => {
    var id = 1;
    it('should return an Promise<Smdependentlinks>', () => {
      const smdependentlinks: Smdependentlinks = {dependentid:1234, dependenttype:1234, dependeeid:1234, dependeetype:1234, associationId:1234};
      service.createSmdependentlinks(smdependentlinks).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smdependentlinkss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSmdependentlinks', () => {
    var id = 1;
    it('should return an Promise<Smdependentlinks>', () => {
      const smdependentlinks: Smdependentlinks = {dependentid:1234, dependenttype:1234, dependeeid:1234, dependeetype:1234, associationId:1234};
      service.updateSmdependentlinks(smdependentlinks, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smdependentlinkss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSmdependentlinks', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSmdependentlinks(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smdependentlinkss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});