const scaleDescriptions = {
  '5': 'Evident in nearly all situations <code>91–100%</code>',
  '4': 'Evident most of the time <code>61–90%</code>',
  '3': 'Evident about half the time <code>31–60%</code>',
  '2': 'Infrequently demonstrated <code>11–30%</code>',
  '1': 'Seldom demonstrated <code>0–10%</code>'
};

document.getElementById('scale').addEventListener('change', function() {
  const scaleInfo = document.getElementById('scaleInfo');
  scaleInfo.innerHTML = scaleDescriptions[this.value];
});

document.getElementById('evaluateBtn').addEventListener('click', async () => {
  const scale = document.getElementById('scale').value;
  const statusDiv = document.getElementById('status');
  const button = document.getElementById('evaluateBtn');
  
  button.disabled = true;
  button.textContent = 'Processing...';
  
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (!tab.url.includes('pup.edu.ph')) {
      statusDiv.className = 'status error';
      statusDiv.textContent = 'Not on evaluation page';
      button.disabled = false;
      button.textContent = 'Run Evaluation';
      return;
    }

    chrome.tabs.sendMessage(tab.id, { action: 'evaluate', scale: scale }, (response) => {
      if (chrome.runtime.lastError) {
        statusDiv.className = 'status error';
        statusDiv.textContent = 'Refresh page and try again';
      } else if (response.success) {
        statusDiv.className = 'status success';
        statusDiv.textContent = `Complete — ${response.count} items filled`;
      } else {
        statusDiv.className = 'status error';
        statusDiv.textContent = response.message;
      }
      
      button.disabled = false;
      button.textContent = 'Run Evaluation';
    });
  } catch (error) {
    statusDiv.className = 'status error';
    statusDiv.textContent = 'Error: ' + error.message;
    button.disabled = false;
    button.textContent = 'Run Evaluation';
  }
});