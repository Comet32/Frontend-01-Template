// let ele = document.querySelector('div');
// enableGesture(document.body);

// 添加 export 形成模块
export function enableGesture(ele) {
  let contexts = Object.create(null);
  // 用 MOUSE_SYMBOL 作为 mouse 事件存储的上下文的 key ，避免与 touch 事件中用 `identifier` 作为上下文的 key 产生冲突
  // 鼠标只需要考虑一个初始位置即可，因为只有一个指针，所以只用 MOUSE_SYMBOL 来表示即可。
  let MOUSE_SYMBOL = Symbol('mouse');

  // 不等于 null 则为 undefined ，说明没有 touchstart 事件，是 pc 端。只在 pc 端绑定 mouse 事件
  if (document.ontouchstart !== null)
    ele.addEventListener('mousedown', (event) => {
      // 下一次的开始会将之前的覆盖掉
      contexts[MOUSE_SYMBOL] = Object.create(null);

      start(event, contexts[MOUSE_SYMBOL]);

      let mousemove = (event) => {
        move(event, contexts[MOUSE_SYMBOL]);
      };

      let mouseup = (event) => {
        end(event, contexts[MOUSE_SYMBOL]);
        document.removeEventListener('mousemove', mousemove);
        document.removeEventListener('mouseup', mouseup);
      };

      document.addEventListener('mousemove', mousemove);
      document.addEventListener('mouseup', mouseup);
    });

  // touch event
  // touch 天然就有目标锁定的能力
  ele.addEventListener('touchstart', (event) => {
    for (let touch of event.changedTouches) {
      // 创建上下文时，要在行为最开始的创建
      contexts[touch.identifier] = Object.create(null);
      start(touch, contexts[touch.identifier]);
    }
  });

  ele.addEventListener('touchmove', (event) => {
    for (let touch of event.changedTouches) {
      move(touch, contexts[touch.identifier]);
    }
  });

  ele.addEventListener('touchend', (event) => {
    for (let touch of event.changedTouches) {
      end(touch, contexts[touch.identifier]);
      // 删除的时候，需要在行为结束的地方删除
      delete contexts[touch.identifier];
    }
  });

  // touchend 和 touchcancel 有且只会触发一个
  // 屏幕上突然的弹窗或着手势被识别为系统手势就会触发 touchcancel
  ele.addEventListener('touchcancel', (event) => {
    for (let touch of event.changedTouches) {
      cancel(touch, contexts[touch.identifier]);
      delete contexts[touch.identifier];
    }
  });

  // 使用 context 主要是为了解决 touch 事件中存在多点触碰的情况，否则是可以在该模块中用唯一的 `startX` 和 `startY` 来表示初始位置
  let start = (point, context) => {
    ele.dispatchEvent(
      new CustomEvent('gesturestart', {
        startX: point.clientX,
        startY: point.clientY,
        clientX: point.clientX,
        clientY: point.clientY,
      }),
    );

    context.startX = point.clientX;
    context.startY = point.clientY;
    context.moves = [];
    //三个分支，三个状态
    context.isTap = true;
    context.isPan = false;
    context.isPress = false;
    // 0.5s 之后如果还处于开始阶段则将其状态切换为 Press
    context.timeoutID = setTimeout(() => {
      // 如果已经是 pan 状态则直接中断后面的状态切换，因为一旦进入 pan 状态也就无法再切换到 press
      if (context.isPan) return;
      context.isTap = false;
      context.isPan = false;
      context.isPress = true;
      ele.dispatchEvent(new CustomEvent('pressstart', {}));
    }, 500);
  };

  let move = (point, context) => {
    let { startX, startY } = context;
    let dx = point.clientX - startX; // 移动的距离
    let dy = point.clientY - startY;

    // 这里是计算直角三角形斜边的公式，a**2 + b**2 = c**2
    if (dx ** 2 + dy ** 2 > 100 && !context.isPan) {
      if ((context.isPress = false)) {
        ele.dispatchEvent(new CustomEvent('presscancel', {}));
      }

      context.isTap = false;
      context.isPan = true;
      context.isPress = false;

      ele.dispatchEvent(
        new CustomEvent('panstart', {
          // pan start 时要存储开始位置，因为已经移动了 10px 的距离
          startX,
          startY,
          clientX: point.clientX,
          clientY: point.clientY,
        }),
      );
    }

    // 如果已经移动超过 10px
    if (context.isPan) {
      context.moves.push({ dx, dy, t: Date.now() });
      // 过滤掉 300ms 之前的移动记录
      context.moves = context.moves.filter((record) => Date.now() - record.t < 300);
      let event = new CustomEvent('pan');
      Object.assign(event, {
        // pan start 时要存储开始位置，因为已经移动了 10px 的距离
        startX,
        startY,
        clientX: point.clientX,
        clientY: point.clientY,
      });
      ele.dispatchEvent(event);
    }

    // console.log('move', { dx, dy });
  };

  let end = (point, context) => {
    // 离开屏幕时移动的距离
    let dx = point.clientX - context.startX;
    let dy = point.clientY - context.startY;

    if (context.isTap) {
      ele.dispatchEvent(new CustomEvent('tap', {}));
    }

    if (context.isPan) {
      // index 为 0 的 record 是 300ms 的最开始的位置
      let record = context.moves[0];
      // 用 300ms 内移动的距离 / 移动的时间，来获取 300ms 内的速度
      let time = Date.now() - record.t;
      console.log('time', time);
      let distance = Math.sqrt((record.dx - dx) ** 2 + (record.dy - dy) ** 2);
      let speed = distance / time;
      let isFlick = speed > 1 ;
      if (isFlick) {
        ele.dispatchEvent(
          new CustomEvent('flick', {
            detail: {
              // pan start 时要存储开始位置，因为已经移动了 10px 的距离
              startX: context.startX,
              startY: context.startY,
              clientX: point.clientX,
              clientY: point.clientY,
              speed,
              isFlick,
            },
          }),
        );
      }

      let event = new CustomEvent('panend');
      Object.assign(event, {
        // pan start 时要存储开始位置，因为已经移动了 10px 的距离
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX, 
        clientY: point.clientY,
        speed,
        isFlick,
      });
      ele.dispatchEvent(event);
    }

    if (context.isPress) {
      ele.dispatchEvent(new CustomEvent('pressend', {}));
    }
    clearTimeout(context.timeoutID);
  };

  let cancel = (point, context) => {
    ele.dispatchEvent(new CustomEvent('canceled', {}));
    clearTimeout(context.timeoutID);
  };
}
