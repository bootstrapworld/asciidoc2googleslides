"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _debug = _interopRequireDefault(require("debug"));

var _fs = _interopRequireDefault(require("fs"));

var _requestPromiseNative = _interopRequireDefault(require("request-promise-native"));

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
/**
 * Uploads a local file to temporary storage so it is HTTP/S accessible.
 *
 * Currently uses https://file.io for free emphemeral file hosting.
 *
 * @param {string} filePath -- Local path to image to upload
 * @returns {Promise<string>} URL to hosted image
 */

async function uploadLocalImage(filePath) {
  debug('Registering file %s', filePath);

  const stream = _fs.default.createReadStream(filePath);

  try {
    let params = {
      file: stream
    };
    let res = await _requestPromiseNative.default.post({
      url: 'https://file.io?expires=1h',
      formData: params
    });
    let responseData = JSON.parse(res);

    if (!responseData.success) {
      debug('Unable to upload file: %O', responseData);
      throw res;
    }

    debug('Temporary link: %s', responseData.link);
    return responseData.link;
  } finally {
    stream.destroy();
  }
}

var _default = uploadLocalImage;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbWFnZXMvdXBsb2FkLnRzIl0sIm5hbWVzIjpbImRlYnVnIiwidXBsb2FkTG9jYWxJbWFnZSIsImZpbGVQYXRoIiwic3RyZWFtIiwiZnMiLCJjcmVhdGVSZWFkU3RyZWFtIiwicGFyYW1zIiwiZmlsZSIsInJlcyIsInJlcXVlc3QiLCJwb3N0IiwidXJsIiwiZm9ybURhdGEiLCJyZXNwb25zZURhdGEiLCJKU09OIiwicGFyc2UiLCJzdWNjZXNzIiwibGluayIsImRlc3Ryb3kiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFjQTs7QUFDQTs7QUFDQTs7OztBQWhCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU1BLE1BQU1BLEtBQUssR0FBRyxvQkFBTSxZQUFOLENBQWQ7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLGVBQWVDLGdCQUFmLENBQWdDQyxRQUFoQyxFQUFtRTtBQUMvREYsRUFBQUEsS0FBSyxDQUFDLHFCQUFELEVBQXdCRSxRQUF4QixDQUFMOztBQUNBLFFBQU1DLE1BQU0sR0FBR0MsWUFBR0MsZ0JBQUgsQ0FBb0JILFFBQXBCLENBQWY7O0FBQ0EsTUFBSTtBQUNBLFFBQUlJLE1BQU0sR0FBRztBQUNUQyxNQUFBQSxJQUFJLEVBQUVKO0FBREcsS0FBYjtBQUdBLFFBQUlLLEdBQUcsR0FBRyxNQUFNQyw4QkFBUUMsSUFBUixDQUFhO0FBQ3pCQyxNQUFBQSxHQUFHLEVBQUUsNEJBRG9CO0FBRXpCQyxNQUFBQSxRQUFRLEVBQUVOO0FBRmUsS0FBYixDQUFoQjtBQUlBLFFBQUlPLFlBQVksR0FBR0MsSUFBSSxDQUFDQyxLQUFMLENBQVdQLEdBQVgsQ0FBbkI7O0FBQ0EsUUFBSSxDQUFDSyxZQUFZLENBQUNHLE9BQWxCLEVBQTJCO0FBQ3ZCaEIsTUFBQUEsS0FBSyxDQUFDLDJCQUFELEVBQThCYSxZQUE5QixDQUFMO0FBQ0EsWUFBTUwsR0FBTjtBQUNIOztBQUNEUixJQUFBQSxLQUFLLENBQUMsb0JBQUQsRUFBdUJhLFlBQVksQ0FBQ0ksSUFBcEMsQ0FBTDtBQUNBLFdBQU9KLFlBQVksQ0FBQ0ksSUFBcEI7QUFDSCxHQWZELFNBZVU7QUFDTmQsSUFBQUEsTUFBTSxDQUFDZSxPQUFQO0FBQ0g7QUFDSjs7ZUFFY2pCLGdCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTkgR29vZ2xlIEluYy5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuaW1wb3J0IERlYnVnIGZyb20gJ2RlYnVnJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgcmVxdWVzdCBmcm9tICdyZXF1ZXN0LXByb21pc2UtbmF0aXZlJztcblxuY29uc3QgZGVidWcgPSBEZWJ1ZygnbWQyZ3NsaWRlcycpO1xuXG4vKipcbiAqIFVwbG9hZHMgYSBsb2NhbCBmaWxlIHRvIHRlbXBvcmFyeSBzdG9yYWdlIHNvIGl0IGlzIEhUVFAvUyBhY2Nlc3NpYmxlLlxuICpcbiAqIEN1cnJlbnRseSB1c2VzIGh0dHBzOi8vZmlsZS5pbyBmb3IgZnJlZSBlbXBoZW1lcmFsIGZpbGUgaG9zdGluZy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZmlsZVBhdGggLS0gTG9jYWwgcGF0aCB0byBpbWFnZSB0byB1cGxvYWRcbiAqIEByZXR1cm5zIHtQcm9taXNlPHN0cmluZz59IFVSTCB0byBob3N0ZWQgaW1hZ2VcbiAqL1xuYXN5bmMgZnVuY3Rpb24gdXBsb2FkTG9jYWxJbWFnZShmaWxlUGF0aDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBkZWJ1ZygnUmVnaXN0ZXJpbmcgZmlsZSAlcycsIGZpbGVQYXRoKTtcbiAgICBjb25zdCBzdHJlYW0gPSBmcy5jcmVhdGVSZWFkU3RyZWFtKGZpbGVQYXRoKTtcbiAgICB0cnkge1xuICAgICAgICBsZXQgcGFyYW1zID0ge1xuICAgICAgICAgICAgZmlsZTogc3RyZWFtLFxuICAgICAgICB9O1xuICAgICAgICBsZXQgcmVzID0gYXdhaXQgcmVxdWVzdC5wb3N0KHtcbiAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vZmlsZS5pbz9leHBpcmVzPTFoJyxcbiAgICAgICAgICAgIGZvcm1EYXRhOiBwYXJhbXMsXG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgcmVzcG9uc2VEYXRhID0gSlNPTi5wYXJzZShyZXMpO1xuICAgICAgICBpZiAoIXJlc3BvbnNlRGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgICBkZWJ1ZygnVW5hYmxlIHRvIHVwbG9hZCBmaWxlOiAlTycsIHJlc3BvbnNlRGF0YSk7XG4gICAgICAgICAgICB0aHJvdyByZXM7XG4gICAgICAgIH1cbiAgICAgICAgZGVidWcoJ1RlbXBvcmFyeSBsaW5rOiAlcycsIHJlc3BvbnNlRGF0YS5saW5rKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlRGF0YS5saW5rO1xuICAgIH0gZmluYWxseSB7XG4gICAgICAgIHN0cmVhbS5kZXN0cm95KCk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB1cGxvYWRMb2NhbEltYWdlO1xuIl19
//# sourceMappingURL=upload.js.map