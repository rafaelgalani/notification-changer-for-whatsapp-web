// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.webRequest.onHeadersReceived.addListener(function(details) {
  console.log(details.responseHeaders);
  details.responseHeaders.push({
      name: "Test",
      value: "Test"
  });
  return { responseHeaders: details.responseHeaders };
}, 
  {urls: ['*://web.whatsapp.com/']}, 
  ["responseHeaders"]
);