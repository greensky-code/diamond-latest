/* Copyright (c) 2020 . All Rights Reserved. */

export class SmpAdNodes {
  owner: string;
  node: string;
  remoteName: string;
  selectedForDiscovery: number;
  discoverState: string;
  discoverFlags: number;
  discoverTime: Date;
  lastContactAttempt: Date;
  sequence: number;
}