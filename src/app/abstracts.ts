import {Abstract} from './abstract';

export const ABSTRACTS: Abstract[] = [
  { title: "Lorem Ipsum", authors: ["dr. 1", "dr. 2"], citations: 1337, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.", releaseDate: (new Date()).toString() },
  { title: "Dolor sit amet", authors: ["dr. 2", "dr. 3"], citations: 3301, description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.", releaseDate: (new Date()).toString() },
  { title: "Consectetur adipiscing elit", authors: ["dr. 1", "dr. 3"], citations: 57, description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.", releaseDate: (new Date()).toString() }
];
