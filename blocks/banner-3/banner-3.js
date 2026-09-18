export default function decorate(block) {
  block.classList.add('banner-3');

  const rows = [...block.children];

  // Media
  if (rows[0]) {
    rows[0].classList.add('banner-3-media');
  }

  // Content
  if (rows[1]) {
    rows[1].classList.add('banner-3-content');

    const heading = rows[1].querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) {
      heading.classList.add('banner-3-title');
    }

    const paragraphs = rows[1].querySelectorAll('p');

    if (paragraphs.length > 0) {
      paragraphs[0].classList.add('banner-3-overline');
    }

    if (paragraphs.length > 1) {
      paragraphs[1].classList.add('banner-3-description');
    }
  }

  // CTA handling
  const ctaList = block.querySelector('ul');

  if (ctaList) {
    ctaList.classList.add('banner-3-ctas');
  }
}
