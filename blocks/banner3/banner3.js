export default function decorate(block) {
  block.classList.add('banner3');

  const rows = [...block.children];

  if (rows[0]) {
    rows[0].classList.add('banner3-media');
  }

  if (rows[1]) {
    rows[1].classList.add('banner3-content');
  }

  if (rows[2]) {
    rows[2].classList.add('banner3-ctas');
  }
}
