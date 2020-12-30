"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseStyleSheet = parseStyleSheet;
exports.parseInlineStyle = parseInlineStyle;
exports.updateStyleDefinition = updateStyleDefinition;

var _parseColor = _interopRequireDefault(require("parse-color"));

var _debug = _interopRequireDefault(require("debug"));

var _inlineStylesParse = _interopRequireDefault(require("inline-styles-parse"));

var _nativeCss = _interopRequireDefault(require("native-css"));

var _ = _interopRequireWildcard(require("lodash"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

function parseColorString(hexString) {
  const c = (0, _parseColor.default)(hexString);

  if (!c.rgba) {
    return;
  }

  return {
    opaqueColor: {
      rgbColor: {
        red: c.rgba[0] / 255,
        green: c.rgba[1] / 255,
        blue: c.rgba[2] / 255
      }
    }
  };
}

function normalizeKeys(css) {
  let normalized = _.mapKeys(css, (value, key) => _.camelCase(key));

  return normalized;
}

function parseStyleSheet(stylesheet) {
  return _nativeCss.default.convert(stylesheet);
}

function parseInlineStyle(inlineStyle) {
  const dummyRule = _inlineStylesParse.default.declarationsToRule(inlineStyle);

  let css = _nativeCss.default.convert(dummyRule);

  return css['dummy'];
}

function updateStyleDefinition(css, style) {
  let normalizedCss = normalizeKeys(css);

  for (let [key, value] of Object.entries(normalizedCss)) {
    switch (key) {
      case 'color':
        style.foregroundColor = parseColorString(value);
        break;

      case 'backgroundColor':
        style.backgroundColor = parseColorString(value);
        break;

      case 'fontWeight':
        if (value === 'bold') {
          style.bold = true;
        }

        break;

      case 'fontStyle':
        if (value === 'italic') {
          style.italic = true;
        }

        break;

      case 'fontStyle':
        if (value === 'underline') {
          style.underline = true;
        } else if (value === 'line-through') {
          style.strikethrough = true;
        }

        break;

      case 'fontFamily':
        style.fontFamily = value;
        break;

      case 'fontVariant':
        if (value === 'small-caps') {
          style.smallCaps = true;
        }

        break;

      case 'fontSize':
        // Font size must be expressed in points
        const match = value.match(/(\d+)(?:pt)?/);

        if (!match) {
          debug('Invalid font-size value: %s', value);
          return;
        }

        style.fontSize = {
          magnitude: Number.parseInt(match[1]),
          unit: 'PT'
        };
        break;

      default:
        debug('Ignoring CSS rule %s: %o', key, value);
    }
  }

  return style;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wYXJzZXIvY3NzLnRzIl0sIm5hbWVzIjpbImRlYnVnIiwicGFyc2VDb2xvclN0cmluZyIsImhleFN0cmluZyIsImMiLCJyZ2JhIiwib3BhcXVlQ29sb3IiLCJyZ2JDb2xvciIsInJlZCIsImdyZWVuIiwiYmx1ZSIsIm5vcm1hbGl6ZUtleXMiLCJjc3MiLCJub3JtYWxpemVkIiwiXyIsIm1hcEtleXMiLCJ2YWx1ZSIsImtleSIsImNhbWVsQ2FzZSIsInBhcnNlU3R5bGVTaGVldCIsInN0eWxlc2hlZXQiLCJuYXRpdmVDU1MiLCJjb252ZXJ0IiwicGFyc2VJbmxpbmVTdHlsZSIsImlubGluZVN0eWxlIiwiZHVtbXlSdWxlIiwiaW5saW5lU3R5bGVzUGFyc2UiLCJkZWNsYXJhdGlvbnNUb1J1bGUiLCJ1cGRhdGVTdHlsZURlZmluaXRpb24iLCJzdHlsZSIsIm5vcm1hbGl6ZWRDc3MiLCJPYmplY3QiLCJlbnRyaWVzIiwiZm9yZWdyb3VuZENvbG9yIiwiYmFja2dyb3VuZENvbG9yIiwiYm9sZCIsIml0YWxpYyIsInVuZGVybGluZSIsInN0cmlrZXRocm91Z2giLCJmb250RmFtaWx5Iiwic21hbGxDYXBzIiwibWF0Y2giLCJmb250U2l6ZSIsIm1hZ25pdHVkZSIsIk51bWJlciIsInBhcnNlSW50IiwidW5pdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBY0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7Ozs7O0FBbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBU0EsTUFBTUEsS0FBSyxHQUFHLG9CQUFNLFlBQU4sQ0FBZDs7QUFTQSxTQUFTQyxnQkFBVCxDQUEwQkMsU0FBMUIsRUFBb0Q7QUFDaEQsUUFBTUMsQ0FBQyxHQUFHLHlCQUFXRCxTQUFYLENBQVY7O0FBQ0EsTUFBSSxDQUFDQyxDQUFDLENBQUNDLElBQVAsRUFBYTtBQUNUO0FBQ0g7O0FBQ0QsU0FBTztBQUNIQyxJQUFBQSxXQUFXLEVBQUU7QUFDVEMsTUFBQUEsUUFBUSxFQUFFO0FBQ05DLFFBQUFBLEdBQUcsRUFBRUosQ0FBQyxDQUFDQyxJQUFGLENBQU8sQ0FBUCxJQUFZLEdBRFg7QUFFTkksUUFBQUEsS0FBSyxFQUFFTCxDQUFDLENBQUNDLElBQUYsQ0FBTyxDQUFQLElBQVksR0FGYjtBQUdOSyxRQUFBQSxJQUFJLEVBQUVOLENBQUMsQ0FBQ0MsSUFBRixDQUFPLENBQVAsSUFBWTtBQUhaO0FBREQ7QUFEVixHQUFQO0FBU0g7O0FBRUQsU0FBU00sYUFBVCxDQUF1QkMsR0FBdkIsRUFBOEM7QUFDMUMsTUFBSUMsVUFBVSxHQUFHQyxDQUFDLENBQUNDLE9BQUYsQ0FBVUgsR0FBVixFQUFlLENBQUNJLEtBQUQsRUFBUUMsR0FBUixLQUFnQkgsQ0FBQyxDQUFDSSxTQUFGLENBQVlELEdBQVosQ0FBL0IsQ0FBakI7O0FBQ0EsU0FBT0osVUFBUDtBQUNIOztBQUVNLFNBQVNNLGVBQVQsQ0FBeUJDLFVBQXpCLEVBQXlEO0FBQzVELFNBQU9DLG1CQUFVQyxPQUFWLENBQWtCRixVQUFsQixDQUFQO0FBQ0g7O0FBRU0sU0FBU0csZ0JBQVQsQ0FBMEJDLFdBQTFCLEVBQXdEO0FBQzNELFFBQU1DLFNBQVMsR0FBR0MsMkJBQWtCQyxrQkFBbEIsQ0FBcUNILFdBQXJDLENBQWxCOztBQUNBLE1BQUlaLEdBQUcsR0FBR1MsbUJBQVVDLE9BQVYsQ0FBa0JHLFNBQWxCLENBQVY7O0FBQ0EsU0FBT2IsR0FBRyxDQUFDLE9BQUQsQ0FBVjtBQUNIOztBQUVNLFNBQVNnQixxQkFBVCxDQUErQmhCLEdBQS9CLEVBQTZDaUIsS0FBN0MsRUFBc0Y7QUFDekYsTUFBSUMsYUFBYSxHQUFHbkIsYUFBYSxDQUFDQyxHQUFELENBQWpDOztBQUNBLE9BQUssSUFBSSxDQUFDSyxHQUFELEVBQU1ELEtBQU4sQ0FBVCxJQUF5QmUsTUFBTSxDQUFDQyxPQUFQLENBQWVGLGFBQWYsQ0FBekIsRUFBd0Q7QUFDcEQsWUFBUWIsR0FBUjtBQUNJLFdBQUssT0FBTDtBQUNJWSxRQUFBQSxLQUFLLENBQUNJLGVBQU4sR0FBd0IvQixnQkFBZ0IsQ0FBQ2MsS0FBRCxDQUF4QztBQUNBOztBQUNKLFdBQUssaUJBQUw7QUFDSWEsUUFBQUEsS0FBSyxDQUFDSyxlQUFOLEdBQXdCaEMsZ0JBQWdCLENBQUNjLEtBQUQsQ0FBeEM7QUFDQTs7QUFDSixXQUFLLFlBQUw7QUFDSSxZQUFJQSxLQUFLLEtBQUssTUFBZCxFQUFzQjtBQUNsQmEsVUFBQUEsS0FBSyxDQUFDTSxJQUFOLEdBQWEsSUFBYjtBQUNIOztBQUNEOztBQUNKLFdBQUssV0FBTDtBQUNJLFlBQUluQixLQUFLLEtBQUssUUFBZCxFQUF3QjtBQUNwQmEsVUFBQUEsS0FBSyxDQUFDTyxNQUFOLEdBQWUsSUFBZjtBQUNIOztBQUNEOztBQUNKLFdBQUssV0FBTDtBQUNJLFlBQUlwQixLQUFLLEtBQUssV0FBZCxFQUEyQjtBQUN2QmEsVUFBQUEsS0FBSyxDQUFDUSxTQUFOLEdBQWtCLElBQWxCO0FBQ0gsU0FGRCxNQUVPLElBQUlyQixLQUFLLEtBQUssY0FBZCxFQUE4QjtBQUNqQ2EsVUFBQUEsS0FBSyxDQUFDUyxhQUFOLEdBQXNCLElBQXRCO0FBQ0g7O0FBQ0Q7O0FBQ0osV0FBSyxZQUFMO0FBQ0lULFFBQUFBLEtBQUssQ0FBQ1UsVUFBTixHQUFtQnZCLEtBQW5CO0FBQ0E7O0FBQ0osV0FBSyxhQUFMO0FBQ0ksWUFBSUEsS0FBSyxLQUFLLFlBQWQsRUFBNEI7QUFDeEJhLFVBQUFBLEtBQUssQ0FBQ1csU0FBTixHQUFrQixJQUFsQjtBQUNIOztBQUNEOztBQUNKLFdBQUssVUFBTDtBQUNJO0FBQ0EsY0FBTUMsS0FBSyxHQUFJekIsS0FBRCxDQUFrQnlCLEtBQWxCLENBQXdCLGNBQXhCLENBQWQ7O0FBQ0EsWUFBSSxDQUFDQSxLQUFMLEVBQVk7QUFDUnhDLFVBQUFBLEtBQUssQ0FBQyw2QkFBRCxFQUFnQ2UsS0FBaEMsQ0FBTDtBQUNBO0FBQ0g7O0FBQ0RhLFFBQUFBLEtBQUssQ0FBQ2EsUUFBTixHQUFpQjtBQUNiQyxVQUFBQSxTQUFTLEVBQUVDLE1BQU0sQ0FBQ0MsUUFBUCxDQUFnQkosS0FBSyxDQUFDLENBQUQsQ0FBckIsQ0FERTtBQUViSyxVQUFBQSxJQUFJLEVBQUU7QUFGTyxTQUFqQjtBQUlBOztBQUNKO0FBQ0k3QyxRQUFBQSxLQUFLLENBQUMsMEJBQUQsRUFBNkJnQixHQUE3QixFQUFrQ0QsS0FBbEMsQ0FBTDtBQTdDUjtBQStDSDs7QUFDRCxTQUFPYSxLQUFQO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxOSBHb29nbGUgSW5jLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQgcGFyc2VDb2xvciBmcm9tICdwYXJzZS1jb2xvcic7XG5pbXBvcnQgRGVidWcgZnJvbSAnZGVidWcnO1xuaW1wb3J0IGlubGluZVN0eWxlc1BhcnNlIGZyb20gJ2lubGluZS1zdHlsZXMtcGFyc2UnO1xuaW1wb3J0IG5hdGl2ZUNTUyBmcm9tICduYXRpdmUtY3NzJztcbmltcG9ydCB7IENvbG9yLCBTdHlsZURlZmluaXRpb24gfSBmcm9tICcuLi9zbGlkZXMnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5jb25zdCBkZWJ1ZyA9IERlYnVnKCdtZDJnc2xpZGVzJyk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ3NzUnVsZSB7XG4gICAgW2tleTogc3RyaW5nXTogc3RyaW5nO1xufVxuZXhwb3J0IGludGVyZmFjZSBTdHlsZXNoZWV0IHtcbiAgICBba2V5OiBzdHJpbmddOiBDc3NSdWxlO1xufVxuXG5mdW5jdGlvbiBwYXJzZUNvbG9yU3RyaW5nKGhleFN0cmluZzogc3RyaW5nKTogQ29sb3Ige1xuICAgIGNvbnN0IGMgPSBwYXJzZUNvbG9yKGhleFN0cmluZyk7XG4gICAgaWYgKCFjLnJnYmEpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBvcGFxdWVDb2xvcjoge1xuICAgICAgICAgICAgcmdiQ29sb3I6IHtcbiAgICAgICAgICAgICAgICByZWQ6IGMucmdiYVswXSAvIDI1NSxcbiAgICAgICAgICAgICAgICBncmVlbjogYy5yZ2JhWzFdIC8gMjU1LFxuICAgICAgICAgICAgICAgIGJsdWU6IGMucmdiYVsyXSAvIDI1NSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplS2V5cyhjc3M6IENzc1J1bGUpOiBDc3NSdWxlIHtcbiAgICBsZXQgbm9ybWFsaXplZCA9IF8ubWFwS2V5cyhjc3MsICh2YWx1ZSwga2V5KSA9PiBfLmNhbWVsQ2FzZShrZXkpKTtcbiAgICByZXR1cm4gbm9ybWFsaXplZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlU3R5bGVTaGVldChzdHlsZXNoZWV0OiBzdHJpbmcpOiBTdHlsZXNoZWV0IHtcbiAgICByZXR1cm4gbmF0aXZlQ1NTLmNvbnZlcnQoc3R5bGVzaGVldCkgYXMgU3R5bGVzaGVldDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlSW5saW5lU3R5bGUoaW5saW5lU3R5bGU6IHN0cmluZyk6IENzc1J1bGUge1xuICAgIGNvbnN0IGR1bW15UnVsZSA9IGlubGluZVN0eWxlc1BhcnNlLmRlY2xhcmF0aW9uc1RvUnVsZShpbmxpbmVTdHlsZSk7XG4gICAgbGV0IGNzcyA9IG5hdGl2ZUNTUy5jb252ZXJ0KGR1bW15UnVsZSk7XG4gICAgcmV0dXJuIGNzc1snZHVtbXknXSBhcyBDc3NSdWxlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlU3R5bGVEZWZpbml0aW9uKGNzczogQ3NzUnVsZSwgc3R5bGU6IFN0eWxlRGVmaW5pdGlvbik6IFN0eWxlRGVmaW5pdGlvbiB7XG4gICAgbGV0IG5vcm1hbGl6ZWRDc3MgPSBub3JtYWxpemVLZXlzKGNzcyk7XG4gICAgZm9yIChsZXQgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKG5vcm1hbGl6ZWRDc3MpKSB7XG4gICAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgICAgICBjYXNlICdjb2xvcic6XG4gICAgICAgICAgICAgICAgc3R5bGUuZm9yZWdyb3VuZENvbG9yID0gcGFyc2VDb2xvclN0cmluZyh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdiYWNrZ3JvdW5kQ29sb3InOlxuICAgICAgICAgICAgICAgIHN0eWxlLmJhY2tncm91bmRDb2xvciA9IHBhcnNlQ29sb3JTdHJpbmcodmFsdWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZm9udFdlaWdodCc6XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSAnYm9sZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUuYm9sZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZm9udFN0eWxlJzpcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09ICdpdGFsaWMnKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlLml0YWxpYyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZm9udFN0eWxlJzpcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09ICd1bmRlcmxpbmUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlLnVuZGVybGluZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gJ2xpbmUtdGhyb3VnaCcpIHtcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUuc3RyaWtldGhyb3VnaCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZm9udEZhbWlseSc6XG4gICAgICAgICAgICAgICAgc3R5bGUuZm9udEZhbWlseSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZm9udFZhcmlhbnQnOlxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gJ3NtYWxsLWNhcHMnKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlLnNtYWxsQ2FwcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZm9udFNpemUnOlxuICAgICAgICAgICAgICAgIC8vIEZvbnQgc2l6ZSBtdXN0IGJlIGV4cHJlc3NlZCBpbiBwb2ludHNcbiAgICAgICAgICAgICAgICBjb25zdCBtYXRjaCA9ICh2YWx1ZSBhcyBzdHJpbmcpLm1hdGNoKC8oXFxkKykoPzpwdCk/Lyk7XG4gICAgICAgICAgICAgICAgaWYgKCFtYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICBkZWJ1ZygnSW52YWxpZCBmb250LXNpemUgdmFsdWU6ICVzJywgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN0eWxlLmZvbnRTaXplID0ge1xuICAgICAgICAgICAgICAgICAgICBtYWduaXR1ZGU6IE51bWJlci5wYXJzZUludChtYXRjaFsxXSksXG4gICAgICAgICAgICAgICAgICAgIHVuaXQ6ICdQVCcsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgZGVidWcoJ0lnbm9yaW5nIENTUyBydWxlICVzOiAlbycsIGtleSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzdHlsZTtcbn1cbiJdfQ==
//# sourceMappingURL=css.js.map