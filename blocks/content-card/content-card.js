import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    imageRow,
    headlineRow,
    descriptionRow,
    ctaRow,
  ] = [...block.children];

  /* Image */

  const image = imageRow?.querySelector('img');
  let picture = image?.closest('picture');

  if (image && picture) {
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

  /* Content Wrapper */

  const content = document.createElement('div');
  content.className = 'content-card-content';

  /* Headline (Overline + Title) */

  if (headlineRow) {
    const headlineContainer = document.createElement('div');
    headlineContainer.innerHTML = headlineRow.innerHTML;

    const overline = headlineContainer.querySelector('p');
    const title = headlineContainer.querySelector(
      'h1, h2, h3, h4, h5, h6',
    );

    if (overline) {
      overline.classList.add('content-card-overline');
      content.append(overline);
    }

    if (title) {
      title.classList.add('content-card-title');
      content.append(title);
    }
  }

  /* Description */

  if (descriptionRow?.innerHTML.trim()) {
    const description = document.createElement('div');
    description.className = 'content-card-description';
    description.innerHTML = descriptionRow.innerHTML;

    content.append(description);
  }

  /* CTA Links */

  if (ctaRow?.innerHTML.trim()) {
    const ctaContainer = document.createElement('div');
    ctaContainer.innerHTML = ctaRow.innerHTML;

    const links = [...ctaContainer.querySelectorAll('a')];

    if (links.length) {
      const ctaList = document.createElement('ul');
      ctaList.className = 'content-card-ctas';

      links.forEach((link) => {
        const li = document.createElement('li');

        const arrow = document.createElement('span');
        arrow.className = 'content-card-cta-arrow';
        arrow.textContent = '→';

        link.append(arrow);

        li.append(link);
        ctaList.append(li);
      });

      content.append(ctaList);
    }
  }

  /* Rebuild DOM */

  block.replaceChildren();

  if (picture) {
    const mediaWrapper = document.createElement('div');
    mediaWrapper.className = 'content-card-media';

    mediaWrapper.append(picture);
    block.append(mediaWrapper);
  }

  block.append(content);
}
