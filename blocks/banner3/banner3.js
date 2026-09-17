import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    imageRow,
    overlineRow,
    titleRow,
    descriptionRow,
  ] = [...block.children];

  const image = imageRow?.querySelector('img');
  const alt = image?.alt || '';
  const overline = overlineRow?.textContent.trim();
  const title = titleRow?.textContent.trim();
  const description = descriptionRow?.innerHTML.trim();

  let picture = image?.closest('picture');

  if (image) {
    const optimizedPicture = createOptimizedPicture(
      image.src,
      alt,
      false,
      [{ width: '2000' }],
    );

    moveInstrumentation(
      image,
      optimizedPicture.querySelector('img'),
    );

    picture?.replaceWith(optimizedPicture);
    picture = optimizedPicture;
  }

  const content = document.createElement('div');
  content.className = 'banner3-content';

  if (overline) {
    const overlineElement = document.createElement('div');
    overlineElement.className = 'banner3-overline';
    overlineElement.textContent = overline;
    content.append(overlineElement);
  }

  if (title) {
    const titleElement = document.createElement('h1');
    titleElement.className = 'banner3-title';
    titleElement.textContent = title;
    content.append(titleElement);
  }

  if (description) {
    const descriptionElement = document.createElement('div');
    descriptionElement.className = 'banner3-description';
    descriptionElement.innerHTML = description;
    content.append(descriptionElement);
  }

  block.classList.add('banner3');

  block.replaceChildren(
    ...(picture ? [picture, content] : [content]),
  );
}
