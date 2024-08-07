class Tooltip {
  static tooltip;

  constructor() {
    if (Tooltip.tooltip) {
      return Tooltip.tooltip;
    }
    Tooltip.tooltip = this;
  }

  createElement() {
    const element = document.createElement('div');
    element.className = 'tooltip';
    return element;
  }

  initialize () {
    this.element = this.createElement();
    document.addEventListener('pointerover', this.onPointer);
    document.addEventListener('pointerout', this.onPointerOut);
    document.addEventListener('pointermove', this.onPointerMove);
  }

  render (textContent = '') {
    this.element.innerHTML = textContent;
    document.body.append(this.element);
  }

  onPointer = (event) => {
    const tooltip = event.target.dataset.tooltip;
    if (!tooltip) return;
    this.render(tooltip);
  }

  onPointerMove = (event) => {
    const tooltip = event.target.dataset.tooltip;
    if (!tooltip) return;

    this.element.style.top = event.clientY + 'px';
    this.element.style.left = event.clientX + 'px';
  }

  onPointerOut = (event) => {
    const tooltip = event.target.dataset.tooltip;
    if (tooltip) return;
    this.hideTooltip();
  }

  hideTooltip () {
    this.element.remove();
  }

  destroy () {
    document.removeEventListener('pointerover', this.onPointer);
    document.removeEventListener('pointerout', this.onPointerOut);
    document.removeEventListener('pointermove', this.onPointerMove);
    this.hideTooltip();
  }
}

export default Tooltip;
