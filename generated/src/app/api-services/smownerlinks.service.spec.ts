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

import { SmownerlinksService } from './smownerlinks.service';
import { Smownerlinks } from '../api-models/smownerlinks.model'
import { Smownerlinkss } from "../api-models/testing/fake-smownerlinks.model"

describe('SmownerlinksService', () => {
  let injector: TestBed;
  let service: SmownerlinksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmownerlinksService]
    });
    injector = getTestBed();
    service = injector.get(SmownerlinksService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSmownerlinkss', () => {
    it('should return an Promise<Smownerlinks[]>', () => {
      const smownerlinks = [
       {ownerid:1234, ownertype:1234, owneeid:1234, owneetype:1234, associationId:1234},
       {ownerid:1234, ownertype:1234, owneeid:1234, owneetype:1234, associationId:1234},
       {ownerid:1234, ownertype:1234, owneeid:1234, owneetype:1234, associationId:1234}

      ];
      service.getSmownerlinkss().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/smownerlinkss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(smownerlinks);
    });
  });


  describe('#createSmownerlinks', () => {
    var id = 1;
    it('should return an Promise<Smownerlinks>', () => {
      const smownerlinks: Smownerlinks = {ownerid:1234, ownertype:1234, owneeid:1234, owneetype:1234, associationId:1234};
      service.createSmownerlinks(smownerlinks).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smownerlinkss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSmownerlinks', () => {
    var id = 1;
    it('should return an Promise<Smownerlinks>', () => {
      const smownerlinks: Smownerlinks = {ownerid:1234, ownertype:1234, owneeid:1234, owneetype:1234, associationId:1234};
      service.updateSmownerlinks(smownerlinks, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smownerlinkss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSmownerlinks', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSmownerlinks(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smownerlinkss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});