function logResourceTimings(resourceType) {
    console.group(resourceType);

    var resourceList = window.performance.getEntriesByType("resource");
    for (i = 0; i < resourceList.length; i++) {
        if (resourceList[i].initiatorType == resourceType) {
            console.log("Name: " + resourceList[i].name + ", Duration: " + resourceList[i].duration);
        }
    }

    console.groupEnd();
}

function logPageTimings() {
    let timing = window.performance.timing;
    console.group("Page");
    console.log("DNS Time: " + (timing.domainLookupEnd - timing.domainLookupStart));
    console.log("Connection Time: " + (timing.connectEnd - timing.connectStart));
    console.log("Request Time: " + (timing.responseEnd - timing.requestStart));
    console.log("Fetch Time: " + (timing.responseEnd - timing.fetchStart));
    console.log("Render Time: " + (timing.domComplete - timing.domLoading));
    console.log("User Time: " + (timing.loadEventEnd - timing.navigationStart));
    console.groupEnd();
}

function logPerformance() {
    if (window.performance && window.performance.timing) {
        logPageTimings();
    } else {
        console.log("Page Timing API is not present");
    }

    if (window.performance && window.performance.getEntriesByName) {
        logResourceTimings("img");
        logResourceTimings("link");
        logResourceTimings("script");
    } else {
        console.log("Resource Timing API is not present");
    }
}

//all images have finished loading once onload is called
//but set a timeout, so that the load event finishes, and all page timers complete (some end after onload finishes)
window.onload = setTimeout(logPerformance, 500);