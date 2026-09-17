import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rows = [...block.children];
  const [imageRow, altRow, overlineRow, titleRow, descriptionRow, ctaItemsRow] = rows;

  const image = imageRow?.querySelector('img');
  const alt = altRow?.textContent.trim() || image?.alt || '';
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

  const ctas = [...(ctaItemsRow?.querySelectorAll('a') || [])].map((link) => ({
    label: link.textContent.trim(),
    url: link.href || link.getAttribute('href'),
  })).filter(({ label, url }) => label && url);

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

  if (ctas.length) {
    const ctaList = document.createElement('ul');
    ctaList.className = 'banner3-ctas';

    ctas.forEach(({ label, url }) => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = url;
      link.textContent = label;

      const arrow = document.createElement('span');
      arrow.className = 'banner3-cta-arrow';
      arrow.setAttribute('aria-hidden', 'true');
      arrow.textContent = '→';
      link.append(arrow);
      item.append(link);
      ctaList.append(item);
    });

    content.append(ctaList);
  }

  block.classList.add('banner3');

  block.replaceChildren(
    ...(picture ? [picture, content] : [content]),
  );
}
