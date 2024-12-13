(() => {
    const imperialToMetricMap = {
      in: value => `${(value * 2.54).toFixed(2)} cm`,
      inch: value => `${(value * 2.54).toFixed(2)} cm`,
      ft: value => `${(value * 0.3048).toFixed(2)} m`,
      foot: value => `${(value * 0.3048).toFixed(2)} m`,
      feet: value => `${(value * 0.3048).toFixed(2)} m`,
      yd: value => `${(value * 0.9144).toFixed(2)} m`,
      yard: value => `${(value * 0.9144).toFixed(2)} m`,
      mi: value => `${(value * 1.60934).toFixed(2)} km`,
      mile: value => `${(value * 1.60934).toFixed(2)} km`,
      oz: value => `${(value * 28.3495).toFixed(2)} g`,
      ounce: value => `${(value * 28.3495).toFixed(2)} g`,
      lb: value => `${(value * 0.453592).toFixed(2)} kg`,
      pound: value => `${(value * 0.453592).toFixed(2)} kg`,
      ton: value => `${(value * 907.18474).toFixed(2)} kg`,
      tsp: value => `${(value * 4.92892).toFixed(2)} ml`,
      tablespoon: value => `${(value * 14.7868).toFixed(2)} ml`,
      cup: value => `${(value * 236.588).toFixed(2)} ml`,
      pt: value => `${(value * 473.176).toFixed(2)} ml`,
      pint: value => `${(value * 473.176).toFixed(2)} ml`,
      qt: value => `${(value * 946.353).toFixed(2)} ml`,
      quart: value => `${(value * 946.353).toFixed(2)} ml`,
      gal: value => `${(value * 3.78541).toFixed(2)} l`,
      gallon: value => `${(value * 3.78541).toFixed(2)} l`
    };
  
    const imperialRegex = /\b(\d+(\.\d+)?)\s?(in|inch|ft|foot|feet|yd|yard|mi|mile|oz|ounce|lb|pound|ton|tsp|teaspoon|tbsp|tablespoon|cup|pt|pint|qt|quart|gal|gallon)\b/gi;
  
    const convertText = (text) => {
      return text.replace(imperialRegex, (match, value, _, unit) => {
        const lowerUnit = unit.toLowerCase();
        if (imperialToMetricMap[lowerUnit]) {
          console.log("Content script loaded successfully");
          return imperialToMetricMap[lowerUnit](parseFloat(value));
        }
        return match;
      });
    };
  
    const walkDOM = (node) => {
      if (node.nodeType === 3) { // Text node
        node.nodeValue = convertText(node.nodeValue);
      } else if (node.nodeType === 1 && node.childNodes && !['SCRIPT', 'STYLE'].includes(node.tagName)) {
        node.childNodes.forEach(walkDOM);
      }
    };
  
    walkDOM(document.body);
  })();
  