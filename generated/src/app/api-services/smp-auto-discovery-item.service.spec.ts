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

import { SmpAutoDiscoveryItemService } from './smp-auto-discovery-item.service';
import { SmpAutoDiscoveryItem } from '../api-models/smp-auto-discovery-item.model'
import { SmpAutoDiscoveryItems } from "../api-models/testing/fake-smp-auto-discovery-item.model"

describe('SmpAutoDiscoveryItemService', () => {
  let injector: TestBed;
  let service: SmpAutoDiscoveryItemService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmpAutoDiscoveryItemService]
    });
    injector = getTestBed();
    service = injector.get(SmpAutoDiscoveryItemService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSmpAutoDiscoveryItems', () => {
    it('should return an Promise<SmpAutoDiscoveryItem[]>', () => {
      const smpAutoDiscoveryItem = [
       {owner:'sample data', ipaddrByte1:1234, ipaddrByte2:1234, ipaddrByte3:1234, ipaddrByte4:1234, ipaddrByte4Upperlimit:1234, ipaddrByte4Lastused:1234},
       {owner:'sample data', ipaddrByte1:1234, ipaddrByte2:1234, ipaddrByte3:1234, ipaddrByte4:1234, ipaddrByte4Upperlimit:1234, ipaddrByte4Lastused:1234},
       {owner:'sample data', ipaddrByte1:1234, ipaddrByte2:1234, ipaddrByte3:1234, ipaddrByte4:1234, ipaddrByte4Upperlimit:1234, ipaddrByte4Lastused:1234}

      ];
      service.getSmpAutoDiscoveryItems().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/smpautodiscoveryitems/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(smpAutoDiscoveryItem);
    });
  });


  describe('#createSmpAutoDiscoveryItem', () => {
    var id = 1;
    it('should return an Promise<SmpAutoDiscoveryItem>', () => {
      const smpAutoDiscoveryItem: SmpAutoDiscoveryItem = {owner:'sample data', ipaddrByte1:1234, ipaddrByte2:1234, ipaddrByte3:1234, ipaddrByte4:1234, ipaddrByte4Upperlimit:1234, ipaddrByte4Lastused:1234};
      service.createSmpAutoDiscoveryItem(smpAutoDiscoveryItem).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smpautodiscoveryitems`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSmpAutoDiscoveryItem', () => {
    var id = 1;
    it('should return an Promise<SmpAutoDiscoveryItem>', () => {
      const smpAutoDiscoveryItem: SmpAutoDiscoveryItem = {owner:'sample data', ipaddrByte1:1234, ipaddrByte2:1234, ipaddrByte3:1234, ipaddrByte4:1234, ipaddrByte4Upperlimit:1234, ipaddrByte4Lastused:1234};
      service.updateSmpAutoDiscoveryItem(smpAutoDiscoveryItem, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smpautodiscoveryitems/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSmpAutoDiscoveryItem', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSmpAutoDiscoveryItem(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smpautodiscoveryitems/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});