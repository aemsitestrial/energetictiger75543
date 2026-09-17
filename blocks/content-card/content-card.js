import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [imageRow, altRow, titleRow, descriptionRow] = [...block.children];
  const image = imageRow?.querySelector('img');
  const alt = altRow?.textContent.trim() || image?.alt || '';
  const title = titleRow?.textContent.trim();
  const description = descriptionRow?.innerHTML.trim();
  let picture = image?.closest('picture');

  if (image) {
    const optimizedPicture = createOptimizedPicture(image.src, alt, false, [{ width: '750' }]);
    moveInstrumentation(image, optimizedPicture.querySelector('img'));
    picture.replaceWith(optimizedPicture);
    picture = optimizedPicture;
  }

  const titleElement = document.createElement('h3');
  titleElement.textContent = title;

  const content = document.createElement('div');
  content.className = 'content-card-content';
  content.append(titleElement);

  if (description) {
    const descriptionElement = document.createElement('div');
    descriptionElement.className = 'content-card-description';
    descriptionElement.innerHTML = description;
    content.append(descriptionElement);
  }

  block.classList.add('content-card');
  block.replaceChildren(...(picture ? [picture, content] : [content]));
}
