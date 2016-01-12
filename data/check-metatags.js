/**
 * Check if the meta tags exist in the head to save to Mendeley, this is based on:
 * https://www.mendeley.com/import/information-for-publishers/
 */

var PREFIX_TAGS = ['citation_', 'eprints.', 'dc.', 'prism.'];

var head = document.getElementsByTagName('head')[0];

var validMetaTags = false;
for (let tag of PREFIX_TAGS) {
  var tags = head.querySelectorAll('meta[name^="' + tag + '"]');
  if (!!tags && tags.length > 0) {
    validMetaTags = true;
    break;
  }
}

self.port.emit("metaTagStatus", validMetaTags);

