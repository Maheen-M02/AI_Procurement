document.getElementById('materialForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const cost = document.getElementById('cost').value;
  const quantity = document.getElementById('quantity').value;

  const responseBox = document.getElementById('result');
  responseBox.innerText = 'Thinking...';

  try {
    const response = await fetch('/ask', { // Use relative path
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
  name: String(name),
  cost: Number(cost),
  quantity: Number(quantity)
})

    });

    if (!response.ok) throw new Error(`Status ${response.status}`);

    const data = await response.json();
    responseBox.innerText = `AI Response: ${data.response || 'No response from AI.'}`;
  } catch (error) {
    responseBox.innerText = 'Error contacting the AI.';
    console.error("Fetch error:", error);
  }
});
