import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    imageRow,
    contentRow,
    ctaRow,
    variantRow,
  ] = [...block.children];

  const [background = 'gradient', alignment = 'left'] = variantRow
    ?.textContent.trim().toLowerCase().split('-') || [];

  let picture;

  const image = imageRow?.querySelector('img');

  if (image) {
    picture = image.closest('picture');

    const optimizedPicture = createOptimizedPicture(
      image.src,
      image.alt || '',
      false,
      [{ width: '1200' }],
    );

    moveInstrumentation(
      image,
      optimizedPicture.querySelector('img'),
    );

    picture.replaceWith(optimizedPicture);
    picture = optimizedPicture;
  }

  const backgroundVariants = ['white', 'black', 'gradient'];
  const alignmentVariants = ['left', 'right'];

  block.classList.add(
    'content-card',
    `content-card--${backgroundVariants.includes(background) ? background : 'gradient'}`,
    `content-card--content-${alignmentVariants.includes(alignment) ? alignment : 'left'}`,
  );

  const content = document.createElement('div');
  content.className = 'content-card-content';

  /* Content Field:
   * <p>Overline</p>
   * <h1>Title</h1>
   * <p>Description</p>
   */

  if (contentRow) {
    const container = document.createElement('div');
    container.innerHTML = contentRow.innerHTML;

    const title = container.querySelector(
      'h1, h2, h3, h4, h5, h6',
    );

    const paragraphs = [...container.querySelectorAll('p')];

    if (paragraphs.length > 0) {
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

  /* CTA Links Rich Text */

  if (ctaRow) {
    const links = [...ctaRow.querySelectorAll('a')];

    if (links.length) {
      const ctaList = document.createElement('ul');
      ctaList.className = 'content-card-ctas';

      links.forEach((link) => {
        const li = document.createElement('li');

        const anchor = link.cloneNode(true);

        const arrow = document.createElement('span');
        arrow.className = 'content-card-cta-arrow';
        arrow.textContent = '→';

        anchor.append(arrow);

        li.append(anchor);
        ctaList.append(li);
      });

      content.append(ctaList);
    }
  }

  /* Layout */

  const layout = document.createElement('div');
  layout.className = 'content-card-layout';

  const textColumn = document.createElement('div');
  textColumn.className = 'content-card-text';

  textColumn.append(content);
  layout.append(textColumn);

  if (picture) {
    const mediaWrapper = document.createElement('div');
    mediaWrapper.className = 'content-card-media';

    mediaWrapper.append(picture);
    layout.append(mediaWrapper);
  }

  block.replaceChildren();
  block.append(layout);
}
