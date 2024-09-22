 let config = {}; 
    function setupConfig(configContent) {
      try {
        config = eval(`(${configContent})`);
      } catch (error) {
        console.error('Failed to parse config:', error.message);
      }
    }

    function objectToCSS(obj) {
      let css = '';
      for (const property in obj) {
        const value = obj[property];
        const cssProperty = property.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
        css += `${cssProperty}: ${value}; `;
      }
      return css;
    }

    function processJStyle() {
      const jstyleTags = document.querySelectorAll('JStyle');

      jstyleTags.forEach(tag => {
          tag.style.display = 'none'
        const styleContent = tag.textContent.trim();

        const configMatch = styleContent.match(/config::\s*({[\s\S]*?})/);
        if (configMatch) {
          const configContent = configMatch[1];
          setupConfig(configContent);
        }

        const contentWithoutConfig = styleContent.replace(/config::\s*({[\s\S]*?})/, '').trim();
        
        let elementsArray;
        try {
          elementsArray = eval(contentWithoutConfig);
        } catch (error) {
          console.error('Error evaluating elements:', error.message);
          return;
        }

        elementsArray.forEach(elementData => {
          const element = document.createElement(elementData.tag || 'div');

          for (const key in elementData) {
            if (key === 'style') {
              const css = objectToCSS(elementData.style);
              element.style.cssText = css;
            } else if (key === 'innerText') {
              element.innerText = elementData[key];
            } else if (key === 'parent') {
              const parentElement = document.getElementById(elementData[key]);
              if (parentElement) {
                parentElement.appendChild(element);
              }
              return;
            } else {
              element.setAttribute(key, elementData[key]);
            }
          }

          if (!elementData.parent) {
            document.body.appendChild(element);
          }
        });
      });
    }
  processJStyle();
