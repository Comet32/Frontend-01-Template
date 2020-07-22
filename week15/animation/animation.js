export class Timeline {
  constructor() {
    this.state = 'initialized';
    this.animations = [];
    this.requestID = null;
    this.startTime = 0;
    this.pauseTime = 0;
  }

  // tick 是🕙走一格所发出的滴答声的意思，一般将每帧执行的函数都用这个名称
  tick() {
    console.log('tick');
    // start 之后所经过的时间
    let t = Date.now() - this.startTime;
    console.log('t', t);
    console.log('this.state', this.state);

    let animations = this.animations.filter((animation) => !animation.finished);

    for (const animation of this.animations) {
      let { object, property, start, end, duration, delay, timingFunction, template } = animation;
      // 如果小于延迟则跳过动画
      if (t <= delay) continue;
      // 如果动画开始到现在的时间已经超过了动画时间和延迟动画时间之和，那么就将时间设置为延迟和动画持续之间和，接着给这个动画设置一个完成的状态
      if (t > duration + delay) {
        t = delay + duration;
        animation.finished = true;
      }

      // t - delay 是动画时间
      let progression = timingFunction((t - delay) / duration); // 0 ~ 1 之间的比例
      // `(end - start)` 是变化区间的最大值
      let value = start + progression * (end - start);

      object[property] = template(value);
    }

    if (animations.length) {
      // 经过测试，传入的回调会在下一帧，也就是 16ms 之后执行，而不是立即执行。
      this.requestID = requestAnimationFrame(() => {
        // 为了解决 this 问题，需要放到箭头函数中调用
        this.tick();
      });
    }
  }

  start() { 
    if(this.state !== 'initialized') return;

    this.state = 'playing';
    this.startTime = Date.now();
    this.animations.forEach((a) => (a.finished = false));
    this.pauseTime = 0;
    this.tick();
  }

  resume() {
    if(this.state !== 'paused') return;

    this.state = 'playing';
    if (this.pauseTime) {
      this.startTime = Date.now() - (this.pauseTime - this.startTime);
      this.tick();
    }
  }

  pause() {
    if(this.state !== 'playing') return;
    
    this.state = 'paused';
    this.pauseTime = Date.now();
    if (this.requestID) {
      cancelAnimationFrame(this.requestID);
    }
  }

  add(animation) {
    this.animations.push(animation);
  }
}

export class Animation {
  // 由于有了 Timeline，我们可以将 Animation 当作接收数据并存储在内部的工具
  constructor(object, property, template, start, end, duration, delay, timingFunction) {
    this.object = object; // 动画作用的 DOM 对象的 style
    this.property = property; // style 改变的 css 属性
    this.template = template; // 用于转换 css 属性
    this.start = start; // 属性的开始状态
    this.end = end; // 属性的结束状态
    this.duration = duration; // 动画持续时间
    this.delay = delay ?? 0; // 延迟时间
    this.timingFunction = timingFunction; // 动画函数，决定动画的改变过程
  }
}
