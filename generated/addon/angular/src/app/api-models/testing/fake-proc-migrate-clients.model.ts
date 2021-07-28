/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcMigrateClients} from "../../api-models"

var procMigrateClients1 = new ProcMigrateClients();
procMigrateClients1.pRetcode =123;
procMigrateClients1.pRetmsg ="sample data1";

var procMigrateClients2 = new ProcMigrateClients();
procMigrateClients2.pRetcode =123;
procMigrateClients2.pRetmsg ="sample data2";

var procMigrateClients3 = new ProcMigrateClients();
procMigrateClients3.pRetcode =123;
procMigrateClients3.pRetmsg ="sample data3";


export const ProcMigrateClient: ProcMigrateClients[] = [
    procMigrateClients1,
    procMigrateClients2,
    procMigrateClients3,
];