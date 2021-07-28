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

import { NavWinService } from './nav-win.service';
import { NavWin } from '../api-models/nav-win.model'
import { NavWins } from "../api-models/testing/fake-nav-win.model"

describe('NavWinService', () => {
  let injector: TestBed;
  let service: NavWinService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NavWinService]
    });
    injector = getTestBed();
    service = injector.get(NavWinService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getNavWins', () => {
    it('should return an Promise<NavWin[]>', () => {
      const navWin = [
       {languageId:1234, notesProvContext:'sample data', notesGroupContext:'sample data', notesMembContext:'sample data', notesCname:'sample data', dispOrder:1234, updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', bitmap:'sample data', maxOpen:1234, dbmaint:'sample data', menu:'sample data', sheet:'sample data', cwinId:'sample data', pwinId:'sample data', pbname:'sample data', winId:'sample data'},
       {languageId:1234, notesProvContext:'sample data', notesGroupContext:'sample data', notesMembContext:'sample data', notesCname:'sample data', dispOrder:1234, updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', bitmap:'sample data', maxOpen:1234, dbmaint:'sample data', menu:'sample data', sheet:'sample data', cwinId:'sample data', pwinId:'sample data', pbname:'sample data', winId:'sample data'},
       {languageId:1234, notesProvContext:'sample data', notesGroupContext:'sample data', notesMembContext:'sample data', notesCname:'sample data', dispOrder:1234, updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', bitmap:'sample data', maxOpen:1234, dbmaint:'sample data', menu:'sample data', sheet:'sample data', cwinId:'sample data', pwinId:'sample data', pbname:'sample data', winId:'sample data'}

      ];
      service.getNavWins().then(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/navwins/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(navWin);
    });
  });


  describe('#createNavWin', () => {
    var id = 1;
    it('should return an Promise<NavWin>', () => {
      const navWin: NavWin = {languageId:1234, notesProvContext:'sample data', notesGroupContext:'sample data', notesMembContext:'sample data', notesCname:'sample data', dispOrder:1234, updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', bitmap:'sample data', maxOpen:1234, dbmaint:'sample data', menu:'sample data', sheet:'sample data', cwinId:'sample data', pwinId:'sample data', pbname:'sample data', winId:'sample data'};
      service.createNavWin(navWin).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/navwins`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateNavWin', () => {
    var id = 1;
    it('should return an Promise<NavWin>', () => {
      const navWin: NavWin = {languageId:1234, notesProvContext:'sample data', notesGroupContext:'sample data', notesMembContext:'sample data', notesCname:'sample data', dispOrder:1234, updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', bitmap:'sample data', maxOpen:1234, dbmaint:'sample data', menu:'sample data', sheet:'sample data', cwinId:'sample data', pwinId:'sample data', pbname:'sample data', winId:'sample data'};
      service.updateNavWin(navWin, id).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/navwins/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteNavWin', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteNavWin(id).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/navwins/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});