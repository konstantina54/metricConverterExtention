// Function to convert imperial to metric
function convertToMetric(text) {
  const conversions = {
    ft: value => `${(value * 0.3048).toFixed(2)} m`,
    in: value => `${(value * 2.54).toFixed(2)} cm`,
    lb: value => `${(value * 0.453592).toFixed(2)} kg`,
    oz: value => `${(value * 28.3495).toFixed(2)} g`,
    mi: value => `${(value * 1.60934).toFixed(2)} km`
  };

  const regex = /\b(\d+(?:\.\d+)?)\s*(ft|in|lb|oz|mi)\b/gi;

  return text.replace(regex, (match, num, unit) => {
    const convert = conversions[unit.toLowerCase()];
    return convert ? `${num} ${unit} (${convert(parseFloat(num))})` : match;
  });
}

// Handle "Convert Page" button click
document.getElementById("convertPage").addEventListener("click", () => {
  chrome.scripting.executeScript({
    target: { allFrames: true },
    func: () => {
      const conversions = {
        ft: value => `${(value * 0.3048).toFixed(2)} m`,
        in: value => `${(value * 2.54).toFixed(2)} cm`,
        lb: value => `${(value * 0.453592).toFixed(2)} kg`,
        oz: value => `${(value * 28.3495).toFixed(2)} g`,
        mi: value => `${(value * 1.60934).toFixed(2)} km`
      };

      const regex = /\b(\d+(?:\.\d+)?)\s*(ft|in|lb|oz|mi)\b/gi;

      function replaceText(node) {
        if (node.nodeType === Node.TEXT_NODE) {
          node.textContent = node.textContent.replace(regex, (match, num, unit) => {
            const convert = conversions[unit.toLowerCase()];
            return convert ? `${num} ${unit} (${convert(parseFloat(num))})` : match;
          });
        } else {
          node.childNodes.forEach(replaceText);
        }
      }

      replaceText(document.body);
    }
  });
});

// Handle "Convert Text" button click
document.getElementById("convertText").addEventListener("click", () => {
  const inputText = document.getElementById("inputText").value;
  const output = convertToMetric(inputText);
  document.getElementById("output").textContent = output || "No valid measurements found.";
});
