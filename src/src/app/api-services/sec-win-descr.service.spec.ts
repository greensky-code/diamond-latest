/* Copyright (c) 2020 . All Rights Reserved. */

import 'rxjs/add/operator/toPromise';
import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment'

import { SecWinDescrService } from './sec-win-descr.service';
import { SecWinDescr } from '../api-models/sec-win-descr.model'

describe('SecWinDescrService', () => {
  let injector: TestBed;
  let service: SecWinDescrService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SecWinDescrService]
    });
    injector = getTestBed();
    service = injector.get(SecWinDescrService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSecWinDescrs', () => {
    it('should return an Promise<SecWinDescr[]>', () => {
      const secWinDescr = [
       {languageId:1234, updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', ldescr:'sample data', sdescr:'sample data', winId:'sample data'},
       {languageId:1234, updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', ldescr:'sample data', sdescr:'sample data', winId:'sample data'},
       {languageId:1234, updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', ldescr:'sample data', sdescr:'sample data', winId:'sample data'}

      ];
      service.getSecWinDescrs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/secwindescrs/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(secWinDescr);
    });
  });


  describe('#createSecWinDescr', () => {
    var id = 1;
    it('should return an Promise<SecWinDescr>', () => {
      const secWinDescr: SecWinDescr = {languageId:1234, updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', ldescr:'sample data', sdescr:'sample data', winId:'sample data'};
      service.createSecWinDescr(secWinDescr).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/secwindescrs`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSecWinDescr', () => {
    var id = 1;
    it('should return an Promise<SecWinDescr>', () => {
      const secWinDescr: SecWinDescr = {languageId:1234, updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', ldescr:'sample data', sdescr:'sample data', winId:'sample data'};
      service.updateSecWinDescr(secWinDescr, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/secwindescrs/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSecWinDescr', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSecWinDescr(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/secwindescrs/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});
