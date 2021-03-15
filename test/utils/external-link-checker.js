const path = require('path');
const _ = require('lodash');
const async = require('async');
const linkCheck = require('link-check');
const markdownLinkExtractor = require('markdown-link-extractor');

module.exports = function checkExternalLinks(markdown, opts, callback) {
    if (arguments.length === 2 && typeof opts === 'function') {
        callback = opts;
        opts = {};
    }

    let links = _.uniq(markdownLinkExtractor(markdown));
    // linkCheck will only check external links
    let externalLinks = links.filter(function(link) {
        return link.startsWith('http');
    });

    async.mapLimit(externalLinks, 2, function(link, callback) {
        linkCheck(link, opts, callback);
    }, callback);
};