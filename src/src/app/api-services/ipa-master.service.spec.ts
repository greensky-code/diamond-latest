/* Copyright (c) 2020 . All Rights Reserved. */
import 'rxjs/add/operator/toPromise';
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment'
import { IpaMasterService } from './ipa-master.service';
import { IpaMaster } from '../api-models/ipa-master.model'

describe('IpaMasterService', () => {
  let injector: TestBed;
  let service: IpaMasterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IpaMasterService]
    });
    injector = getTestBed();
    service = injector.get(IpaMasterService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });
  describe('#getIpaMasters', () => {
    it('should return an Promise<IpaMaster[]>', () => {
      const ipaMaster = [
        { ipaId: 'sample data', description: 'sample data', name: 'sample data', address1: 'sample data', address2: 'sample data', city: 'sample data', state: 'sample data', zipCode: 'sample data', contactName: 'sample data', phoneNumber: 'sample data', faxNumber: 'sample data', securityCode: 'sample data', insertDatetime: '2018-01-01', insertUser: 'sample data', insertProcess: 'sample data', updateDatetime: '2018-01-01', updateUser: 'sample data', updateProcess: 'sample data', ipaParentId: 'sample data', levelCode: 'sample data', ipaVendor: 1234, country: 'sample data', ipaVendAddress: 1234 },
        { ipaId: 'sample data', description: 'sample data', name: 'sample data', address1: 'sample data', address2: 'sample data', city: 'sample data', state: 'sample data', zipCode: 'sample data', contactName: 'sample data', phoneNumber: 'sample data', faxNumber: 'sample data', securityCode: 'sample data', insertDatetime: '2018-01-01', insertUser: 'sample data', insertProcess: 'sample data', updateDatetime: '2018-01-01', updateUser: 'sample data', updateProcess: 'sample data', ipaParentId: 'sample data', levelCode: 'sample data', ipaVendor: 1234, country: 'sample data', ipaVendAddress: 1234 },
        { ipaId: 'sample data', description: 'sample data', name: 'sample data', address1: 'sample data', address2: 'sample data', city: 'sample data', state: 'sample data', zipCode: 'sample data', contactName: 'sample data', phoneNumber: 'sample data', faxNumber: 'sample data', securityCode: 'sample data', insertDatetime: '2018-01-01', insertUser: 'sample data', insertProcess: 'sample data', updateDatetime: '2018-01-01', updateUser: 'sample data', updateProcess: 'sample data', ipaParentId: 'sample data', levelCode: 'sample data', ipaVendor: 1234, country: 'sample data', ipaVendAddress: 1234 }

      ];
      service.getIpaMasters().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/ipamasters/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(ipaMaster);
    });
  });


  describe('#createIpaMaster', () => {
    var id = 1;
    it('should return an Promise<IpaMaster>', () => {
      const ipaMaster: IpaMaster = { ipaId: 'sample data', description: 'sample data', name: 'sample data', address1: 'sample data', address2: 'sample data', city: 'sample data', state: 'sample data', zipCode: 'sample data', contactName: 'sample data', phoneNumber: 'sample data', faxNumber: 'sample data', securityCode: 'sample data', insertDatetime: new Date(), insertUser: 'sample data', insertProcess: 'sample data', updateDatetime: new Date(), updateUser: 'sample data', updateProcess: 'sample data', ipaParentId: 'sample data', levelCode: 'sample data', ipaVendor: 1234, country: 'sample data', ipaVendAddress: 1234 };
      service.createIpaMaster(ipaMaster).subscribe(response => {
        expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ipamasters`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateIpaMaster', () => {
    var id = '1';
    it('should return an Promise<IpaMaster>', () => {
      const ipaMaster: IpaMaster = { ipaId: 'sample data', description: 'sample data', name: 'sample data', address1: 'sample data', address2: 'sample data', city: 'sample data', state: 'sample data', zipCode: 'sample data', contactName: 'sample data', phoneNumber: 'sample data', faxNumber: 'sample data', securityCode: 'sample data', insertDatetime: new Date(), insertUser: 'sample data', insertProcess: 'sample data', updateDatetime: new Date(), updateUser: 'sample data', updateProcess: 'sample data', ipaParentId: 'sample data', levelCode: 'sample data', ipaVendor: 1234, country: 'sample data', ipaVendAddress: 1234 };
      service.updateIpaMaster(ipaMaster, id).subscribe(response => {
        expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ipamasters/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteIpaMaster', () => {
    var id = '1';
    it('should call delete method with correct parameter', () => {
      service.deleteIpaMaster(id).subscribe(response => {
        expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ipamasters/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});