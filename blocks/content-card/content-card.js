import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    imageRow,
    contentRow,
    ctaRow,
  ] = [...block.children];

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

  if (!picture) {
    block.classList.add('content-card-no-image');
  }

  const content = document.createElement('div');
  content.className = 'content-card-content';

  /* Content Field
   *
   * <p>Overline</p>
   * <h1>Title</h1>
   * <p>Description</p>
   */

  if (contentRow) {
    const container = document.createElement('div');
    container.innerHTML = contentRow.innerHTML;

    const overline = container.querySelector('p');
    const title = container.querySelector(
      'h1, h2, h3, h4, h5, h6',
    );

    const paragraphs = [...container.querySelectorAll('p')];

    if (overline) {
      overline.classList.add('content-card-overline');
      content.append(overline);
    }

    if (title) {
      title.classList.add('content-card-title');
      content.append(title);
    }

    if (paragraphs.length > 1) {
      const description = document.createElement('div');
      description.className = 'content-card-description';

      paragraphs.slice(1).forEach((paragraph) => {
        description.append(paragraph.cloneNode(true));
      });

      content.append(description);
    }
  }

  /* CTA Links */

  /* CTA Links */

  if (ctaRow) {
    const ctaList = document.createElement('ul');
    ctaList.className = 'content-card-ctas';

    const links = ctaRow.querySelectorAll('a');

    links.forEach((link) => {
      const li = document.createElement('li');

      const arrow = document.createElement('span');
      arrow.className = 'content-card-cta-arrow';
      arrow.textContent = '→';

      link.classList.add('content-card-cta-link');
      link.append(arrow);

      li.append(link);
      ctaList.append(li);
    });

    if (ctaList.children.length) {
      content.append(ctaList);
    }
  }

  block.replaceChildren();

  if (picture) {
    const mediaWrapper = document.createElement('div');
    mediaWrapper.className = 'content-card-media';

    mediaWrapper.append(picture);
    block.append(mediaWrapper);
  }

  block.append(content);
}
