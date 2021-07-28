/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { TradingPartnerMaster} from "../../api-models"

var tradingPartnerMaster1 = new TradingPartnerMaster();
tradingPartnerMaster1.ediAccessNumber ="sample data1";
tradingPartnerMaster1.updateProcess ="sample data1";
tradingPartnerMaster1.updateUser ="sample data1";
tradingPartnerMaster1.updateDatetime =new Date('2010-01-01');
tradingPartnerMaster1.insertProcess ="sample data1";
tradingPartnerMaster1.insertUser ="sample data1";
tradingPartnerMaster1.insertDatetime =new Date('2010-01-01');
tradingPartnerMaster1.securityCode ="sample data1";
tradingPartnerMaster1.comments ="sample data1";
tradingPartnerMaster1.userDefined7 ="sample data1";
tradingPartnerMaster1.userDefined6 ="sample data1";
tradingPartnerMaster1.userDefined5 ="sample data1";
tradingPartnerMaster1.userDefined4 ="sample data1";
tradingPartnerMaster1.userDefined3 ="sample data1";
tradingPartnerMaster1.userDefined2 ="sample data1";
tradingPartnerMaster1.userDefined1 ="sample data1";
tradingPartnerMaster1.email ="sample data1";
tradingPartnerMaster1.faxNumber ="sample data1";
tradingPartnerMaster1.phoneNumber ="sample data1";
tradingPartnerMaster1.contactName ="sample data1";
tradingPartnerMaster1.country ="sample data1";
tradingPartnerMaster1.zipCode ="sample data1";
tradingPartnerMaster1.state ="sample data1";
tradingPartnerMaster1.city ="sample data1";
tradingPartnerMaster1.addressLine2 ="sample data1";
tradingPartnerMaster1.addressLine1 ="sample data1";
tradingPartnerMaster1.tradingPartnerType ="sample data1";
tradingPartnerMaster1.tradingPartnerName ="sample data1";
tradingPartnerMaster1.tradingPartnerId ="sample data1";

var tradingPartnerMaster2 = new TradingPartnerMaster();
tradingPartnerMaster2.ediAccessNumber ="sample data2";
tradingPartnerMaster2.updateProcess ="sample data2";
tradingPartnerMaster2.updateUser ="sample data2";
tradingPartnerMaster2.updateDatetime =new Date('2010-01-01');
tradingPartnerMaster2.insertProcess ="sample data2";
tradingPartnerMaster2.insertUser ="sample data2";
tradingPartnerMaster2.insertDatetime =new Date('2010-01-01');
tradingPartnerMaster2.securityCode ="sample data2";
tradingPartnerMaster2.comments ="sample data2";
tradingPartnerMaster2.userDefined7 ="sample data2";
tradingPartnerMaster2.userDefined6 ="sample data2";
tradingPartnerMaster2.userDefined5 ="sample data2";
tradingPartnerMaster2.userDefined4 ="sample data2";
tradingPartnerMaster2.userDefined3 ="sample data2";
tradingPartnerMaster2.userDefined2 ="sample data2";
tradingPartnerMaster2.userDefined1 ="sample data2";
tradingPartnerMaster2.email ="sample data2";
tradingPartnerMaster2.faxNumber ="sample data2";
tradingPartnerMaster2.phoneNumber ="sample data2";
tradingPartnerMaster2.contactName ="sample data2";
tradingPartnerMaster2.country ="sample data2";
tradingPartnerMaster2.zipCode ="sample data2";
tradingPartnerMaster2.state ="sample data2";
tradingPartnerMaster2.city ="sample data2";
tradingPartnerMaster2.addressLine2 ="sample data2";
tradingPartnerMaster2.addressLine1 ="sample data2";
tradingPartnerMaster2.tradingPartnerType ="sample data2";
tradingPartnerMaster2.tradingPartnerName ="sample data2";
tradingPartnerMaster2.tradingPartnerId ="sample data2";

var tradingPartnerMaster3 = new TradingPartnerMaster();
tradingPartnerMaster3.ediAccessNumber ="sample data3";
tradingPartnerMaster3.updateProcess ="sample data3";
tradingPartnerMaster3.updateUser ="sample data3";
tradingPartnerMaster3.updateDatetime =new Date('2010-01-01');
tradingPartnerMaster3.insertProcess ="sample data3";
tradingPartnerMaster3.insertUser ="sample data3";
tradingPartnerMaster3.insertDatetime =new Date('2010-01-01');
tradingPartnerMaster3.securityCode ="sample data3";
tradingPartnerMaster3.comments ="sample data3";
tradingPartnerMaster3.userDefined7 ="sample data3";
tradingPartnerMaster3.userDefined6 ="sample data3";
tradingPartnerMaster3.userDefined5 ="sample data3";
tradingPartnerMaster3.userDefined4 ="sample data3";
tradingPartnerMaster3.userDefined3 ="sample data3";
tradingPartnerMaster3.userDefined2 ="sample data3";
tradingPartnerMaster3.userDefined1 ="sample data3";
tradingPartnerMaster3.email ="sample data3";
tradingPartnerMaster3.faxNumber ="sample data3";
tradingPartnerMaster3.phoneNumber ="sample data3";
tradingPartnerMaster3.contactName ="sample data3";
tradingPartnerMaster3.country ="sample data3";
tradingPartnerMaster3.zipCode ="sample data3";
tradingPartnerMaster3.state ="sample data3";
tradingPartnerMaster3.city ="sample data3";
tradingPartnerMaster3.addressLine2 ="sample data3";
tradingPartnerMaster3.addressLine1 ="sample data3";
tradingPartnerMaster3.tradingPartnerType ="sample data3";
tradingPartnerMaster3.tradingPartnerName ="sample data3";
tradingPartnerMaster3.tradingPartnerId ="sample data3";


export const TradingPartnerMasters: TradingPartnerMaster[] = [
    tradingPartnerMaster1,
    tradingPartnerMaster2,
    tradingPartnerMaster3,
];