"use strict";

var buttons = require('sdk/ui/button/action');
var self = require("sdk/self");
var tabs = require("sdk/tabs");
var url = require("sdk/url");

var config = require("config.json");
var Immutable = require("immutable");

config.urls = Immutable.Set(config.urls);

var uiButton = buttons.ActionButton({
  id: "save-mendeley-link",
  label: "Save to Mendeley",
  icon: "./logo.png",
  disabled: true,
  onClick: function () {
    // Actually save it to mendeley
    tabs.activeTab.attach({
      contentScriptFile: self.data.url("save-to-mendeley.js")
    });
  }
});

function tabUpdate(tab) {
  let tabUrl = url.URL(tab.url);

  if (config.urls.contains(tabUrl.host)) {
    console.log(tabUrl.host + ": Found valid import: " + true);
    uiButton.state(tab, {
      'disabled': false
    });

  } else {

    // manually look for the meta tags:
    var worker = tab.attach({
      // This script is taken from: https://www.mendeley.com/import/
      contentScriptFile: self.data.url("check-metatags.js")
    });

    worker.port.on('metaTagStatus', function (metaTagsValid) {
      console.log(tabUrl.host + ": Found valid import: " + !!metaTagsValid);
      uiButton.state(tab, {
        'disabled': !metaTagsValid
      });
    });
  }

}
//
//tabs.on('activate', tabUpdate);

tabs.on('pageshow', tabUpdate);

exports = {
  button: uiButton
};

// http://ieeexplore.ieee.org/xpl/articleDetails.jsp?reload=true&arnumber=6919256