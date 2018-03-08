import Component, {tracked} from '@glimmer/component';

export default class Dot extends Component {
  @tracked hover = false;

  @tracked('hover')
  get style() {
    const s = this.args.size * 1.3;

    if (isNaN(this.args.y)) {
      console.log(`dot ${this.args.x} ${this.args.y}`);
    }

    return `
      width: ${s}px;
      height: ${s}px;
      left: ${this.args.x}px;
      top: ${this.args.y}px;
      border-radius: ${s / 2}px;
      line-height: ${s}px;
      background: ${this.hover ? '#ff0' : '#61dafb'}
    `;
  }

  enter() {
    this.hover = true;
  }

  leave() {
    this.hover = false;
  }
}
