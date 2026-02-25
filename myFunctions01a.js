/*  myFunctions01a.js
    this ver.   01a02 @ 2006-03-14
    original    01a00 @ 2004-09-16
*/

// from prototype.js
if (!Array.prototype.push) {
    Array.prototype.push = function() {
        var startLength = this.length;
        for (var i = 0; i < arguments.length; i++)
            this[startLength + i] = arguments[i];
        return this.length;
    }
}

//----

function _getNextElement(refNode) {
    var nextNode = refNode.nextSibling;
    while (nextNode) {
        if (nextNode.nodeType == 1) return nextNode;    //Node.ELEMENT_NODE
        nextNode = nextNode.nextSibling;
    }
    return null;
}

function _getPrevElement(refNode) {
    var prevNode = refNode.previousSibling;
    while (prevNode) {
        if (prevNode.nodeType == 1) return prevNode;    //Node.ELEMENT_NODE
        prevNode = prevNode.previousSibling;
    }
    return null;
}

function _getAttribute(targetElement, targetAttrName) {
    if (!targetElement || targetElement.nodeType != 1) return false;
    if (targetAttrName == "class") {
        return targetElement.className;
    }
    return targetElement.getAttribute(targetAttrName);
}

function _setAttribute(targetElement, targetAttrName, targetAttrValue) {
    if (!targetElement || targetElement.nodeType != 1) return false;
    if (targetAttrName == "class") {
        targetElement.className = targetAttrValue;
        if (targetElement.className) return;
    }
    if (targetAttrName == "style") {
        if (!window.addEventListener) { //IE
            targetElement.style.cssText = targetAttrValue;
            return;
        }
    }
    targetElement.setAttribute(targetAttrName, targetAttrValue);
}
function _getInnerText(refNode) {
    var theChildNodes = refNode.childNodes,
    innerTextArray = [];
    if (theChildNodes.length == 0) return null;

    for (var i = 0; i < theChildNodes.length; i++) {
        var theChildNode = theChildNodes[i];
        if (theChildNode.hasChildNodes()) {
            innerTextArray.push(_getInnerText(theChildNode));
        } else if (theChildNode.nodeType == 3) {    //Node.TEXT_NODE
            innerTextArray.push(theChildNode.nodeValue);
        } else if (theChildNode.alt) {
            innerTextArray.push("[");
            innerTextArray.push(theChildNode.alt);
            innerTextArray.push("]");
        }
    }
    var innerText = innerTextArray.join("");
    return innerText;
}

//----

function getTextContent(e) {
    if (!e) return '';
    if (e.textContent) return e.textContent;
    if (e.innerText) return e.innerText;
    var t = _getInnerText(e);
    return (t) ? t : '';
}
