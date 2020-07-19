import { createElement, Text, Wrapper } from './createElement.js'; // 这里看到没有调用的透明变量是 VSC 给我们的提示，其实是调用了的。
import { Carousel } from './carousel.vue';

let imgUrls = [
  'https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg',
  'https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg',
  'https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg',
  'https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg',
];

let component = <Carousel data={imgUrls} />;

component.mountTo(document.body);
