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
  const overline = overlineRow?.textContent.trim();
  const title = titleRow?.textContent.trim();

  let picture = image?.closest('picture');

  if (image) {
    const optimizedPicture = createOptimizedPicture(
      image.src,
      image.alt || '',
      false,
      [{ width: '2000' }],
    );

    moveInstrumentation(
      image,
      optimizedPicture.querySelector('img'),
    );

    picture.replaceWith(optimizedPicture);
    picture = optimizedPicture;
  }

  block.classList.add('content-card');

  const content = document.createElement('div');
  content.className = 'content-card-content';

  // Overline
  if (overline) {
    const overlineElement = document.createElement('div');
    overlineElement.className = 'content-card-overline';
    overlineElement.textContent = overline;
    content.append(overlineElement);
  }

  // Title
  if (title) {
    const titleElement = document.createElement('h1');
    titleElement.className = 'content-card-title';
    titleElement.textContent = title;
    content.append(titleElement);
  }

  // Description + CTA links
  if (descriptionRow) {
    const descriptionElement = document.createElement('div');
    descriptionElement.className = 'content-card-description';

    descriptionElement.innerHTML = descriptionRow.innerHTML;

    // Style any links in the rich text as CTA links
    const links = descriptionElement.querySelectorAll('a');

    if (links.length) {
      const ctaList = document.createElement('ul');
      ctaList.className = 'content-card-ctas';

      links.forEach((link) => {
        const li = document.createElement('li');

        const arrow = document.createElement('span');
        arrow.className = 'content-card-cta-arrow';
        arrow.innerHTML = '&rarr;';

        link.append(arrow);

        li.append(link);
        ctaList.append(li);

        // remove original parent paragraph
        if (link.closest('p')) {
          link.closest('p').remove();
        }
      });

      content.append(descriptionElement);
      content.append(ctaList);
    } else {
      content.append(descriptionElement);
    }
  }

  block.replaceChildren();

  if (picture) {
    picture.classList.add('content-card-media');
    block.append(picture);
  }

  block.append(content);
}
