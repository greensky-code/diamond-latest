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

import { MenuTokenService } from './menu-token.service';
import { MenuToken } from '../api-models/menu-token.model'
import { MenuTokens } from "../api-models/testing/fake-menu-token.model"

describe('MenuTokenService', () => {
  let injector: TestBed;
  let service: MenuTokenService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MenuTokenService]
    });
    injector = getTestBed();
    service = injector.get(MenuTokenService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getMenuTokens', () => {
    it('should return an Promise<MenuToken[]>', () => {
      const menuToken = [
       {menuId:'sample data', languageId:1234, menuItemName:'sample data', menuText:'sample data', menuItemMicrohelp:'sample data', keyword:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {menuId:'sample data', languageId:1234, menuItemName:'sample data', menuText:'sample data', menuItemMicrohelp:'sample data', keyword:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {menuId:'sample data', languageId:1234, menuItemName:'sample data', menuText:'sample data', menuItemMicrohelp:'sample data', keyword:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getMenuTokens().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/menutokens/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(menuToken);
    });
  });


  describe('#createMenuToken', () => {
    var id = 1;
    it('should return an Promise<MenuToken>', () => {
      const menuToken: MenuToken = {menuId:'sample data', languageId:1234, menuItemName:'sample data', menuText:'sample data', menuItemMicrohelp:'sample data', keyword:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createMenuToken(menuToken).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/menutokens`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateMenuToken', () => {
    var id = 1;
    it('should return an Promise<MenuToken>', () => {
      const menuToken: MenuToken = {menuId:'sample data', languageId:1234, menuItemName:'sample data', menuText:'sample data', menuItemMicrohelp:'sample data', keyword:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateMenuToken(menuToken, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/menutokens/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteMenuToken', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteMenuToken(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/menutokens/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});