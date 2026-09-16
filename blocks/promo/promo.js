export default function decorate(block) {
  // Validate the block element exists
  if (!block || !(block instanceof Element)) {
    console.warn('Invalid block element passed to decorate()');
    return;
  }
  
  block.classList.add('promo-loaded');
}