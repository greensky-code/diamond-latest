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

import { SmbreakablelinksService } from './smbreakablelinks.service';
import { Smbreakablelinks } from '../api-models/smbreakablelinks.model'
import { Smbreakablelinkss } from "../api-models/testing/fake-smbreakablelinks.model"

describe('SmbreakablelinksService', () => {
  let injector: TestBed;
  let service: SmbreakablelinksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmbreakablelinksService]
    });
    injector = getTestBed();
    service = injector.get(SmbreakablelinksService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSmbreakablelinkss', () => {
    it('should return an Promise<Smbreakablelinks[]>', () => {
      const smbreakablelinks = [
       {lhsid:1234, lhstype:1234, rhsid:1234, rhstype:1234, associationId:1234},
       {lhsid:1234, lhstype:1234, rhsid:1234, rhstype:1234, associationId:1234},
       {lhsid:1234, lhstype:1234, rhsid:1234, rhstype:1234, associationId:1234}

      ];
      service.getSmbreakablelinkss().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/smbreakablelinkss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(smbreakablelinks);
    });
  });


  describe('#createSmbreakablelinks', () => {
    var id = 1;
    it('should return an Promise<Smbreakablelinks>', () => {
      const smbreakablelinks: Smbreakablelinks = {lhsid:1234, lhstype:1234, rhsid:1234, rhstype:1234, associationId:1234};
      service.createSmbreakablelinks(smbreakablelinks).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smbreakablelinkss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSmbreakablelinks', () => {
    var id = 1;
    it('should return an Promise<Smbreakablelinks>', () => {
      const smbreakablelinks: Smbreakablelinks = {lhsid:1234, lhstype:1234, rhsid:1234, rhstype:1234, associationId:1234};
      service.updateSmbreakablelinks(smbreakablelinks, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smbreakablelinkss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSmbreakablelinks', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSmbreakablelinks(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smbreakablelinkss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});