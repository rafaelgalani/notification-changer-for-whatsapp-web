// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

const TARGET_HEADER_NAME = 'content-security-policy'; 
const REGEX_POLICY_REPLACE = /media\-src.*?(?=;|$)/g; //matches the whole 'media-src' part of the CSP response header.
const NEW_POLICY = '$& data:'; //adding " data:" to the WhatsApp policy in order to load local files.

chrome.webRequest.onHeadersReceived.addListener(function(details) {
	let targetHeader = details.responseHeaders.find(header => header.name.toLowerCase() == TARGET_HEADER_NAME);
	
	if (targetHeader){
		targetHeader.value = targetHeader.value.replace(REGEX_POLICY_REPLACE, `$& data:`)
	}
	
	return { responseHeaders: details.responseHeaders };
}, 
{
	urls: ['*://web.whatsapp.com/*']
}, ["responseHeaders", 'blocking']);

const WHATSAPP_PAGE_MATCHER = new chrome.declarativeContent.PageStateMatcher({
	pageUrl: {hostEquals: 'web.whatsapp.com'},
});

chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
	chrome.declarativeContent.onPageChanged.addRules([
		{
			conditions: [WHATSAPP_PAGE_MATCHER],
			actions: [new chrome.declarativeContent.ShowPageAction()]
		}
	]);
});