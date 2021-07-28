/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcGetSubgpStateList} from "../../api-models"

var procGetSubgpStateList1 = new ProcGetSubgpStateList();
procGetSubgpStateList1.pSubSeqGroupId =123;

var procGetSubgpStateList2 = new ProcGetSubgpStateList();
procGetSubgpStateList2.pSubSeqGroupId =123;

var procGetSubgpStateList3 = new ProcGetSubgpStateList();
procGetSubgpStateList3.pSubSeqGroupId =123;


export const ProcGetSubgpStateLists: ProcGetSubgpStateList[] = [
    procGetSubgpStateList1,
    procGetSubgpStateList2,
    procGetSubgpStateList3,
];