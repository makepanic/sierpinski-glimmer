import Component, {tracked} from '@glimmer/component';

export default class MyApp extends Component {
 @tracked seconds = 0;
 intervalId = -1;

 @tracked elapsed = 0;

 start = Date.now();

  didInsertElement(){
    this.intervalId = setInterval(this.tick.bind(this), 1000);
    this.tickElapsed();
  }

  tickElapsed(){
    this.elapsed = Date.now() - this.start;
    requestAnimationFrame(this.tickElapsed.bind(this));
  }

  tick(){
    this.seconds = (this.seconds % 10) + 1;
  }

  @tracked('elapsed')
  get style(){
    const elapsed = this.elapsed;
    const t = (elapsed / 1000) % 10;
    const scale = 1 + (t > 5 ? 10 - t : t) / 10;
    const transform = 'scaleX(' + (scale / 2.1) + ') scaleY(0.7) translateZ(0.1px)';
    return `transform: ${transform}`;
  }
}
