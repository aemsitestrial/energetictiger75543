export default function decorate(block) {
  const rows = [...block.children];

  const [
    imageRow,
    overlineRow,
    titleRow,
    descriptionRow,
    cta1LabelRow,
    cta1LinkRow,
    cta2LabelRow,
    cta2LinkRow,
  ] = rows;

  // Read authored values
  const image = imageRow?.querySelector('img');
  const overline = overlineRow?.textContent.trim();
  const title = titleRow?.textContent.trim();
  const description = descriptionRow?.innerHTML.trim();

  const cta1Label = cta1LabelRow?.textContent.trim();
  const cta1Link = cta1LinkRow?.textContent.trim();

  const cta2Label = cta2LabelRow?.textContent.trim();
  const cta2Link = cta2LinkRow?.textContent.trim();

  // Create banner structure
  const content = document.createElement('div');
  content.className = 'banner3-content';

  // Overline
  if (overline) {
    const overlineElement = document.createElement('div');
    overlineElement.className = 'banner3-overline';
    overlineElement.textContent = overline;
    content.append(overlineElement);
  }

  // Title
  if (title) {
    const titleElement = document.createElement('h1');
    titleElement.className = 'banner3-title';
    titleElement.textContent = title;
    content.append(titleElement);
  }

  // Description
  if (description) {
    const descriptionElement = document.createElement('div');
    descriptionElement.className = 'banner3-description';
    descriptionElement.innerHTML = description;
    content.append(descriptionElement);
  }

  // CTA container
  const ctaContainer = document.createElement('div');
  ctaContainer.className = 'banner3-ctas';

  // CTA 1
  if (cta1Label && cta1Link) {
    const cta1 = document.createElement('a');
    cta1.className = 'banner3-cta banner3-cta-primary';
    cta1.href = cta1Link;
    cta1.textContent = cta1Label;
    ctaContainer.append(cta1);
  }

  // CTA 2
  if (cta2Label && cta2Link) {
    const cta2 = document.createElement('a');
    cta2.className = 'banner3-cta banner3-cta-secondary';
    cta2.href = cta2Link;
    cta2.textContent = cta2Label;
    ctaContainer.append(cta2);
  }

  if (ctaContainer.children.length > 0) {
    content.append(ctaContainer);
  }

  // Clear original block content
  block.innerHTML = '';

  // Background image
  if (image?.src) {
    block.style.backgroundImage = `url("${image.src}")`;
  }

  block.append(content);
}
