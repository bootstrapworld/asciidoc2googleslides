"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _debug = _interopRequireDefault(require("debug"));

var _sharp = _interopRequireDefault(require("sharp"));

var _tmpPromise = _interopRequireDefault(require("tmp-promise"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2019 Google Inc.
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

_tmpPromise.default.setGracefulCleanup();

async function renderSVG(image) {
  debug('Generating SVG', image);
  let path = await _tmpPromise.default.tmpName({
    postfix: '.png'
  });
  let buffer = Buffer.from(image.source);
  await (0, _sharp.default)(buffer, {
    density: 2400
  }).png().toFile(path);
  return path;
}

var _default = renderSVG;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbWFnZXMvc3ZnLnRzIl0sIm5hbWVzIjpbImRlYnVnIiwidG1wIiwic2V0R3JhY2VmdWxDbGVhbnVwIiwicmVuZGVyU1ZHIiwiaW1hZ2UiLCJwYXRoIiwidG1wTmFtZSIsInBvc3RmaXgiLCJidWZmZXIiLCJCdWZmZXIiLCJmcm9tIiwic291cmNlIiwiZGVuc2l0eSIsInBuZyIsInRvRmlsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQWFBOztBQUNBOztBQUNBOzs7O0FBZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFLQSxNQUFNQSxLQUFLLEdBQUcsb0JBQU0sWUFBTixDQUFkOztBQUNBQyxvQkFBSUMsa0JBQUo7O0FBRUEsZUFBZUMsU0FBZixDQUF5QkMsS0FBekIsRUFBaUQ7QUFDN0NKLEVBQUFBLEtBQUssQ0FBQyxnQkFBRCxFQUFtQkksS0FBbkIsQ0FBTDtBQUNBLE1BQUlDLElBQUksR0FBRyxNQUFNSixvQkFBSUssT0FBSixDQUFZO0FBQUVDLElBQUFBLE9BQU8sRUFBRTtBQUFYLEdBQVosQ0FBakI7QUFDQSxNQUFJQyxNQUFNLEdBQUdDLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZTixLQUFLLENBQUNPLE1BQWxCLENBQWI7QUFDQSxRQUFNLG9CQUFNSCxNQUFOLEVBQWM7QUFBRUksSUFBQUEsT0FBTyxFQUFFO0FBQVgsR0FBZCxFQUNEQyxHQURDLEdBRURDLE1BRkMsQ0FFTVQsSUFGTixDQUFOO0FBR0EsU0FBT0EsSUFBUDtBQUNIOztlQUVjRixTIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTkgR29vZ2xlIEluYy5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbmltcG9ydCBEZWJ1ZyBmcm9tICdkZWJ1Zyc7XG5pbXBvcnQgc2hhcnAgZnJvbSAnc2hhcnAnO1xuaW1wb3J0IHRtcCBmcm9tICd0bXAtcHJvbWlzZSc7XG5cbmNvbnN0IGRlYnVnID0gRGVidWcoJ21kMmdzbGlkZXMnKTtcbnRtcC5zZXRHcmFjZWZ1bENsZWFudXAoKTtcblxuYXN5bmMgZnVuY3Rpb24gcmVuZGVyU1ZHKGltYWdlKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBkZWJ1ZygnR2VuZXJhdGluZyBTVkcnLCBpbWFnZSk7XG4gICAgbGV0IHBhdGggPSBhd2FpdCB0bXAudG1wTmFtZSh7IHBvc3RmaXg6ICcucG5nJyB9KTtcbiAgICBsZXQgYnVmZmVyID0gQnVmZmVyLmZyb20oaW1hZ2Uuc291cmNlKTtcbiAgICBhd2FpdCBzaGFycChidWZmZXIsIHsgZGVuc2l0eTogMjQwMCB9KVxuICAgICAgICAucG5nKClcbiAgICAgICAgLnRvRmlsZShwYXRoKTtcbiAgICByZXR1cm4gcGF0aDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgcmVuZGVyU1ZHO1xuIl19
//# sourceMappingURL=svg.js.map