"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _debug = _interopRequireDefault(require("debug"));

var _svg = _interopRequireDefault(require("./svg"));

var _mathjax = _interopRequireDefault(require(".//mathjax"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2018 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
const debug = (0, _debug.default)('md2gslides');
let renderers = {
  svg: _svg.default,
  math: _mathjax.default
};
/**
 * Checks to see if the image requires rasterization (e.g. SVG, MathJAX, etc)
 * @param {Image} image to generate if needed
 * @return {Promise<Image>} Promise resolved with image URL
 */

async function maybeGenerateImage(image) {
  if (image.url) {
    debug('Image already rasterized: %s', image.url);
    return image;
  }

  let filePath;
  let imageType = image.type.trim().toLowerCase();
  let renderer = renderers[imageType];

  if (renderer === undefined) {
    throw 'Unsupported generated image: ' + image.source;
  }

  filePath = await renderer(image);
  image.url = 'file://' + filePath;
  debug('Local image path: %s', image.url);
  return image;
}

var _default = maybeGenerateImage;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbWFnZXMvZ2VuZXJhdGUudHMiXSwibmFtZXMiOlsiZGVidWciLCJyZW5kZXJlcnMiLCJzdmciLCJyZW5kZXJTVkciLCJtYXRoIiwicmVuZGVyTWF0aEpheCIsIm1heWJlR2VuZXJhdGVJbWFnZSIsImltYWdlIiwidXJsIiwiZmlsZVBhdGgiLCJpbWFnZVR5cGUiLCJ0eXBlIiwidHJpbSIsInRvTG93ZXJDYXNlIiwicmVuZGVyZXIiLCJ1bmRlZmluZWQiLCJzb3VyY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFjQTs7QUFDQTs7QUFDQTs7OztBQWhCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU9BLE1BQU1BLEtBQUssR0FBRyxvQkFBTSxZQUFOLENBQWQ7QUFFQSxJQUFJQyxTQUFTLEdBQUc7QUFDWkMsRUFBQUEsR0FBRyxFQUFFQyxZQURPO0FBRVpDLEVBQUFBLElBQUksRUFBRUM7QUFGTSxDQUFoQjtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsZUFBZUMsa0JBQWYsQ0FBa0NDLEtBQWxDLEVBQW9GO0FBQ2hGLE1BQUlBLEtBQUssQ0FBQ0MsR0FBVixFQUFlO0FBQ1hSLElBQUFBLEtBQUssQ0FBQyw4QkFBRCxFQUFpQ08sS0FBSyxDQUFDQyxHQUF2QyxDQUFMO0FBQ0EsV0FBT0QsS0FBUDtBQUNIOztBQUVELE1BQUlFLFFBQUo7QUFDQSxNQUFJQyxTQUFTLEdBQUdILEtBQUssQ0FBQ0ksSUFBTixDQUFXQyxJQUFYLEdBQWtCQyxXQUFsQixFQUFoQjtBQUVBLE1BQUlDLFFBQVEsR0FBR2IsU0FBUyxDQUFDUyxTQUFELENBQXhCOztBQUNBLE1BQUlJLFFBQVEsS0FBS0MsU0FBakIsRUFBNEI7QUFDeEIsVUFBTSxrQ0FBa0NSLEtBQUssQ0FBQ1MsTUFBOUM7QUFDSDs7QUFDRFAsRUFBQUEsUUFBUSxHQUFHLE1BQU1LLFFBQVEsQ0FBQ1AsS0FBRCxDQUF6QjtBQUNBQSxFQUFBQSxLQUFLLENBQUNDLEdBQU4sR0FBWSxZQUFZQyxRQUF4QjtBQUNBVCxFQUFBQSxLQUFLLENBQUMsc0JBQUQsRUFBeUJPLEtBQUssQ0FBQ0MsR0FBL0IsQ0FBTDtBQUNBLFNBQU9ELEtBQVA7QUFDSDs7ZUFFY0Qsa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxOCBHb29nbGUgSW5jLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQgRGVidWcgZnJvbSAnZGVidWcnO1xuaW1wb3J0IHJlbmRlclNWRyBmcm9tICcuL3N2Zyc7XG5pbXBvcnQgcmVuZGVyTWF0aEpheCBmcm9tICcuLy9tYXRoamF4JztcbmltcG9ydCB7IEltYWdlRGVmaW5pdGlvbiB9IGZyb20gJy4uL3NsaWRlcyc7XG5cbmNvbnN0IGRlYnVnID0gRGVidWcoJ21kMmdzbGlkZXMnKTtcblxubGV0IHJlbmRlcmVycyA9IHtcbiAgICBzdmc6IHJlbmRlclNWRyxcbiAgICBtYXRoOiByZW5kZXJNYXRoSmF4LFxufTtcblxuLyoqXG4gKiBDaGVja3MgdG8gc2VlIGlmIHRoZSBpbWFnZSByZXF1aXJlcyByYXN0ZXJpemF0aW9uIChlLmcuIFNWRywgTWF0aEpBWCwgZXRjKVxuICogQHBhcmFtIHtJbWFnZX0gaW1hZ2UgdG8gZ2VuZXJhdGUgaWYgbmVlZGVkXG4gKiBAcmV0dXJuIHtQcm9taXNlPEltYWdlPn0gUHJvbWlzZSByZXNvbHZlZCB3aXRoIGltYWdlIFVSTFxuICovXG5hc3luYyBmdW5jdGlvbiBtYXliZUdlbmVyYXRlSW1hZ2UoaW1hZ2U6IEltYWdlRGVmaW5pdGlvbik6IFByb21pc2U8SW1hZ2VEZWZpbml0aW9uPiB7XG4gICAgaWYgKGltYWdlLnVybCkge1xuICAgICAgICBkZWJ1ZygnSW1hZ2UgYWxyZWFkeSByYXN0ZXJpemVkOiAlcycsIGltYWdlLnVybCk7XG4gICAgICAgIHJldHVybiBpbWFnZTtcbiAgICB9XG5cbiAgICBsZXQgZmlsZVBhdGg6IHN0cmluZztcbiAgICBsZXQgaW1hZ2VUeXBlID0gaW1hZ2UudHlwZS50cmltKCkudG9Mb3dlckNhc2UoKTtcblxuICAgIGxldCByZW5kZXJlciA9IHJlbmRlcmVyc1tpbWFnZVR5cGVdO1xuICAgIGlmIChyZW5kZXJlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93ICdVbnN1cHBvcnRlZCBnZW5lcmF0ZWQgaW1hZ2U6ICcgKyBpbWFnZS5zb3VyY2U7XG4gICAgfVxuICAgIGZpbGVQYXRoID0gYXdhaXQgcmVuZGVyZXIoaW1hZ2UpO1xuICAgIGltYWdlLnVybCA9ICdmaWxlOi8vJyArIGZpbGVQYXRoO1xuICAgIGRlYnVnKCdMb2NhbCBpbWFnZSBwYXRoOiAlcycsIGltYWdlLnVybCk7XG4gICAgcmV0dXJuIGltYWdlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBtYXliZUdlbmVyYXRlSW1hZ2U7XG4iXX0=
//# sourceMappingURL=generate.js.map