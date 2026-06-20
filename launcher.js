document.getElementById('openBloxd').addEventListener('click', ()=>{
  window.open('https://bloxd.io','_blank');
});

document.getElementById('openWithOverlay').addEventListener('click', ()=>{
  // Open bloxd.io in a new tab and keep this launcher as the controller UI.
  window.open('https://bloxd.io','_blank');
  alert('Bloxd.io opened in a new tab. Use this launcher to open modes and run local code reviews.');
});

document.getElementById('runReview').addEventListener('click', async ()=>{
  const code = document.getElementById('codeArea').value;
  const resultEl = document.getElementById('reviewResult');
  resultEl.textContent = 'Running local review...';

  try{
    const resp = await fetch('http://127.0.0.1:8765/review',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({filename:'pasted-snippet',code})});
    if(!resp.ok) throw new Error('No local reviewer running');
    const json = await resp.json();
    resultEl.textContent = JSON.stringify(json,null,2);
  }catch(err){
    resultEl.textContent = 'Local reviewer not available. Run ai_reviewer.py in this repo to enable.';
  }
});
