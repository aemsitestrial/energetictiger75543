import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [imageRow, contentRow, ctaRow] = [...block.children];

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

  if (!picture) {
    block.classList.add('content-card-no-image');
  }

  /* Content */

  const content = document.createElement('div');
  content.className = 'content-card-content';

  if (contentRow) {
    const container = document.createElement('div');
    container.innerHTML = contentRow.innerHTML;

    const title = container.querySelector(
      'h1, h2, h3, h4, h5, h6',
    );

    const paragraphs = [...container.querySelectorAll('p')];

    if (paragraphs.length) {
      const overline = document.createElement('div');
      overline.className = 'content-card-overline';
      overline.textContent = paragraphs[0].textContent.trim();
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

  if (ctaRow) {
    const ctaList = document.createElement('ul');
    ctaList.className = 'content-card-ctas';

    const ctaItems = [...ctaRow.querySelectorAll(':scope > div')];

    ctaItems.forEach((item) => {
      const cells = [...item.children];

      if (cells.length >= 2) {
        const label = cells[0]?.textContent?.trim();
        const url = cells[1]?.textContent?.trim();

        if (label && url) {
          const li = document.createElement('li');

          const link = document.createElement('a');
          link.href = url;
          link.textContent = label;

          const arrow = document.createElement('span');
          arrow.className = 'content-card-cta-arrow';
          arrow.textContent = '→';

          link.append(arrow);
          li.append(link);
          ctaList.append(li);
        }
      }
    });

    if (ctaList.children.length) {
      content.append(ctaList);
    }
  }

  /* Rebuild block */

  block.replaceChildren();

  if (picture) {
    const mediaWrapper = document.createElement('div');
    mediaWrapper.className = 'content-card-media';
    mediaWrapper.append(picture);
    block.append(mediaWrapper);
  }

  block.append(content);
}
