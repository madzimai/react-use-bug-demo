# react-use-bug-demo
Bug report demo repo

```
docker build . -t react-use-bug-demo    
docker run --rm -d -p 8088:8080 react-use-bug-demo
curl localhost:8080
```
=>

```
<!DOCTYPE html><html><head></head><body><div>app resolved</div><div><!--$?--><template id="B:0"></template><!--/$--></div><div hidden id="S:0"><div>app resolved</div></div><script>$RC=function(b,c,e){c=document.getElementById(c);c.parentNode.removeChild(c);var a=document.getElementById(b);if(a){b=a.previousSibling;if(e)b.data="$!",a.setAttribute("data-dgst",e);else{e=b.parentNode;a=b.nextSibling;var f=0;do{if(a&&8===a.nodeType){var d=a.data;if("/$"===d)if(0===f)break;else f--;else"$"!==d&&"$?"!==d&&"$!"!==d||f++}d=a.nextSibling;e.removeChild(a);a=d}while(a);for(;c.firstChild;)e.insertBefore(c.firstChild,a);b.data="$"}b._reactRetry&&b._reactRetry()}};$RC("B:0","S:0")</script></body></html>    
```

Expected/second request:
```curl localhost:8080```
=>
```
<!DOCTYPE html><html><head></head><body><div>app resolved</div><div><!--$?--><template id="B:0"></template><!--/$--></div><div hidden id="S:0"><div>page resolved</div></div><script>$RC=function(b,c,e){c=document.getElementById(c);c.parentNode.removeChild(c);var a=document.getElementById(b);if(a){b=a.previousSibling;if(e)b.data="$!",a.setAttribute("data-dgst",e);else{e=b.parentNode;a=b.nextSibling;var f=0;do{if(a&&8===a.nodeType){var d=a.data;if("/$"===d)if(0===f)break;else f--;else"$"!==d&&"$?"!==d&&"$!"!==d||f++}d=a.nextSibling;e.removeChild(a);a=d}while(a);for(;c.firstChild;)e.insertBefore(c.firstChild,a);b.data="$"}b._reactRetry&&b._reactRetry()}};$RC("B:0","S:0")</script></body></html>
```
