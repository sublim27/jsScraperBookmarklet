// i hope this  is a better solution 
//check readme.md  for more  information 
javascript: (function() {
    var scripts = document.getElementsByTagName("script"),
        regex = /(?<=(\"|\%27|\`))\/[a-zA-Z0-9_?&=\/\-\#\.]*(?=(\"|\'|\%60))/g,
        jsRegex = /(?<=(\"|\'|\%60))(?:\/|https?:\/\/)[a-zA-Z0-9_?&=\/\-\#\.]+\.js(?:\?[^"'%60]*)?(?=(\"|\'|\%60))/g;
    const results = new Set;
    const paramMap = new Map();
    const jsFiles = new Set();

    function processContent(t, src) {
        var e = t.matchAll(regex);
        for (let r of e) {
            results.add(r[0]);
            var params = r[0].split('?')[1];
            if (params) {
                params.split('&').forEach(param => {
                    var [key, ] = param.split('=');
                    if (key) {
                        if (!paramMap.has(key)) {
                            paramMap.set(key, []);
                        }
                        paramMap.get(key).push(src || 'Inline script or HTML');
                    }
                });
            }
        }
        var j = t.matchAll(jsRegex);
        for (let r of j) {
            jsFiles.add(r[0]);
        }
    }
    for (var i = 0; i < scripts.length; i++) {
        var t = scripts[i].src;
        if (t) {
            jsFiles.add(t);
            fetch(t).then(function(t) {
                return t.text()
            }).then(text => processContent(text, t)).catch(function(t) {
                console.log("An error occurred: ", t)
            });
        } else {
            processContent(scripts[i].textContent);
        }
    }
    var pageContent = document.documentElement.outerHTML;
    processContent(pageContent, 'Page content');

    function writeResults() {
        var div = document.createElement("div");
        div.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background:#f0f8ff;color:#333;overflow:auto;z-index:9999;padding:20px;font-family:Arial,sans-serif;";
        var content = "<h2 style='color:#4a69bd;'>Endpoints Found: " + results.size + "</h2>";
        content += "<div style='display:grid;grid-template-columns:1fr 1fr;gap:10px;'>";
        content += Array.from(results).map(endpoint => {
            var fullUrl = endpoint.startsWith("http") ? endpoint : window.location.origin + endpoint;
            return "<div style='background:#fff;margin-bottom:10px;padding:10px;border-left:5px solid #4a69bd;'>" + endpoint + "</div><div style='background:#fff;margin-bottom:10px;padding:10px;border-left:5px solid #4a69bd;'><a href='" + fullUrl + "' target='_blank' style='color:#4a69bd;text-decoration:none;word-break:break-all;'>" + fullUrl + "</a></div>"
        }).join("");
        content += "</div>";
        content += "<h2 style='color:#4a69bd;margin-top:20px;'>Parameters Found:</h2>";
        content += "<div style='display:grid;grid-template-columns:1fr 1fr;gap:10px;'>";
        paramMap.forEach((sources, param) => {
            content += "<div style='background:#fff;margin-bottom:10px;padding:10px;border-left:5px solid #4a69bd;'>" + param + "</div><div style='background:#fff;margin-bottom:10px;padding:10px;border-left:5px solid #4a69bd;'>" + sources.join('<br>') + "</div>";
        });
        content += "</div>";
        content += "<h2 style='color:#4a69bd;margin-top:20px;'>JS Files Found: " + jsFiles.size + "</h2>";
        content += "<div style='display:grid;grid-template-columns:1fr;gap:10px;'>";
        jsFiles.forEach(file => {
            var fullUrl = file.startsWith("http") ? file : window.location.origin + file;
            content += "<div style='background:#fff;margin-bottom:10px;padding:10px;border-left:5px solid #4a69bd;'><a href='" + fullUrl + "' target='_blank' style='color:#4a69bd;text-decoration:none;word-break:break-all;'>" + file + "</a></div>";
        });
        content += "</div>";
        div.innerHTML = content;
        var closeBtn = document.createElement("button");
        closeBtn.textContent = "Close";
        closeBtn.style.cssText = "position:fixed;top:10px;right:10px;background:#4a69bd;color:white;border:none;padding:10px 20px;cursor:pointer;";
        closeBtn.onclick = function() {
            document.body.removeChild(div);
        };
        div.appendChild(closeBtn);
        document.body.appendChild(div)
    }
    setTimeout(writeResults, 3000);
})();