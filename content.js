chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'evaluate') {
    try {
      const result = autoEvaluate(request.scale);
      sendResponse(result);
    } catch (error) {
      sendResponse({ success: false, message: error.message });
    }
  }
  return true;
});

function autoEvaluate(scale) {
  // Find all radio buttons or select elements for evaluation
  let count = 0;
  
  // Strategy 1: Look for radio buttons with value matching the scale
  const radioButtons = document.querySelectorAll(`input[type="radio"][value="${scale}"]`);
  if (radioButtons.length > 0) {
    radioButtons.forEach(radio => {
      if (!radio.checked) {
        radio.click();
        count++;
      }
    });
    return { success: true, count: count };
  }
  
  // Strategy 2: Look for select/dropdown elements
  const selects = document.querySelectorAll('select');
  if (selects.length > 0) {
    selects.forEach(select => {
      // Try to find option with matching value or text
      const options = Array.from(select.options);
      const matchingOption = options.find(opt => 
        opt.value === scale || 
        opt.value === scale.toString() ||
        opt.text.includes(scale)
      );
      
      if (matchingOption && select.value !== matchingOption.value) {
        select.value = matchingOption.value;
        select.dispatchEvent(new Event('change', { bubbles: true }));
        count++;
      }
    });
    return { success: true, count: count };
  }
  
  // Strategy 3: Look for buttons or clickable elements with scale numbers
  const buttons = document.querySelectorAll('button, a, div[onclick], span[onclick]');
  const scaleButtons = Array.from(buttons).filter(btn => 
    btn.textContent.trim() === scale || 
    btn.getAttribute('data-value') === scale ||
    btn.classList.contains(`scale-${scale}`)
  );
  
  if (scaleButtons.length > 0) {
    scaleButtons.forEach(btn => {
      btn.click();
      count++;
    });
    return { success: true, count: count };
  }
  
  // Strategy 4: Look for input fields where we can set values
  const inputs = document.querySelectorAll('input[type="number"], input[type="text"]');
  if (inputs.length > 0) {
    inputs.forEach(input => {
      if (input.max >= scale && input.min <= scale) {
        input.value = scale;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
        count++;
      }
    });
    return { success: true, count: count };
  }
  
  // If nothing found
  if (count === 0) {
    return { 
      success: false, 
      message: 'No evaluation elements found. Make sure you are on the evaluation page.' 
    };
  }
  
  return { success: true, count: count };
}