// ==UserScript==
// @name           Marktplaats rss feeds
// @version        5.0.0.0
// @namespace      marktplaats
// @description    Adds rss-feeds to auction site marktplaats.nl
// @include        http://www.marktplaats.nl/z.html?*
// @include        http://www.marktplaats.nl/z/*.html?*
// @include        http://www.marktplaats.nl/verkopers/*.html
// @copyright      2014, Robert Buzink (robertbuzink.com)
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @updateURL      http://userscripts.org/scripts/source/marktplaats-rss-feeds.meta.js
// @grant          none 
// ==/UserScript==

// get url of page
var searchurl = document.URL;

if (searchurl.match(/.*\?/g)) {

// create rss feed from url
var rssurl=searchurl.replace(/.*\?/g,"http://www.rss-widget.nl/opensearch.php?");
var rssurl=rssurl.replace("query","q");
var rssurl=rssurl.replace("priceFrom","pl");
var rssurl=rssurl.replace("priceTo","ph");
var rssurl=rssurl.replace("distance","d");
var rssurl=rssurl.replace("postcode","pc");
var rssurl=rssurl.replace("searchOnTitleAndDescription=true","ts=1");    

//check if category and if category is main
if (rssurl.match(/categoryId=(\d+)/)) {
var thisCat = rssurl.match(/categoryId=(\d+)/);
var validCats = ["0","1","31","91","2600", "48","201","289","1744","322","378","1098","395","239","445","1099","504","1032","565","621","1776","678","728","1784","1826","356","784","820","1984","1847","167","856","895","976","537","1085","428"];
    if (validCats.indexOf(thisCat[1]) > -1) {
      var rssurl=rssurl.replace("categoryId","g");
    } else {
        var rssurl=rssurl.replace("categoryId","u"); 
    }
}
    
//add postcode if it is missing    
	if (rssurl.match(/d=/) && !rssurl.match(/pc=/)) {
        var PCele = document.getElementById("postcode");
        if (PCele) {
            var rssurl=rssurl+'&pc='+PCele.value;
        }
    }    

// add url to page
addRss(rssurl,"search-breadcrumbs-content");

} else if (searchurl.match(/verkopers\/\d+\.html/g)) {
    //get seller id
    var thisSeller = searchurl.match(/verkopers\/(\d+)\.html/);
    //create url to rss
    var rssurl="http://www.rss-widget.nl/opensearch.php?ui="+thisSeller[1];
    // add url to page
    addRss(rssurl,"search-breadcrumbs-content");
}

function addRss(rssurl,rssDiv) {

//create link to rss feed
var zNode       = document.createElement('div');
zNode.innerHTML = '&nbsp;&nbsp;<a href="'+rssurl+'&s=100" target="_blank" ><img src="http://robertbuzink.com/wp-content/themes/varnish/images/subscribe-feed.png"/></a>';
zNode.setAttribute ('id', 'rssfeed');
    
var DIVel = document.getElementById(rssDiv);    

if (DIVel) {  
    
    // add link to rss feed to page
    DIVel.appendChild(zNode);
    //style the link a bit using plain javascript
    document.getElementById('rssfeed').style.paddingTop = '2px';
    document.getElementById('rssfeed').style.float = 'right';
}
    
//add rss link to head section
var head = document.getElementsByTagName('head')[0]; 
var linktag = document.createElement('link'); 
linktag.type = "application/rss+xml";
linktag.rel = "alternate"; 
linktag.title = "RSS"; 
linktag.href = rssurl; 
head.appendChild(linktag);       
}    

// koop geen dingen die je niet nodig hebt :)