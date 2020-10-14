let ttys = require('ttys');
let { stdin, stdout } = ttys;

// 通过设置 RawMode 让它变成一个单个的输入 key
// without this, we would only get streams once enter is pressed
stdin.setRawMode(true);

// resume stdin in the parent process (node app won't quit all by itself
// unless an error or process.exit() happens)
stdin.resume();

// i don't want binary, do you?
stdin.setEncoding('utf8');

// 实现在终端中光标的上下移动来打印一些东西，然后实现多选项进行选择的交互
function getChar() {
  return new Promise((resolve, reject) => {
    stdin.once('data', function (key) {
      resolve(key);
    });
  });
}

function up(n = 1) {
  stdout.write('\033[' + n + 'A');
}

function down(n = 1) {
  stdout.write('\033[' + n + 'B');
}

function right(n = 1) {
  stdout.write('\033[' + n + 'C');
}

function left(n = 1) {
  stdout.write('\033[' + n + 'D');
}

void (async function () {
  stdout.write('Which framework do you want to use?\n');
  let answer = await select(['vue', 'react', 'angular']);
  stdout.write('You selected ' + answer + '\n');
  process.exit();
})();

async function select(choices) {
  let selected = 0;
  for (let i = 0; i < choices.length; i++) {
    let choice = choices[i];
    stdout.write(`${selected === i ? '[x]' : '[ ]'}` + choice + '\n');
  }
  up(choices.length);
  right();
  while (true) {
    // 获取输入字符
    let char = await getChar();
    // 当键入 `ctrl + c` 时退出进程
    if (char === '\u0003') {
      process.exit();
    }

    if (char === 'w' && selected > 0) {
      stdout.write(' ');
      left();
      selected--;
      up();
      stdout.write('x');
      left();
    }

    if (char === 's' && selected < choices.length - 1) {
      stdout.write(' ');
      left();
      selected++;
      down();
      stdout.write('x');
      left();
    }

    if (char === '\r') {
      down(choices.length - selected);
      left();
      return choices[selected];
    }

    // console.log(
    //   char.split('').map((c) => c.charCodeAt(0)),
    // );
  }
}
