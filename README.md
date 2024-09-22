<p align="center">
  **To start working with JSS, import this script into your repository**
</p>
<p align="center>
 <script id="jss">
  document.addEventListener('DOMContentLoaded', () => {
    fetch('https://raw.githubusercontent.com/jackmophin/JSS/main/jss.js')
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.text();
      })
      .then(scriptText => {
        const scriptElement = document.createElement('script');
        scriptElement.textContent = scriptText;
        document.body.appendChild(scriptElement);
      })
      .catch(error => console.error('Fetch error:', error));
  });
</script>
</p>
