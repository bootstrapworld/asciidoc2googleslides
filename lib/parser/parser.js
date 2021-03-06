"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _markdownIt = _interopRequireDefault(require("markdown-it"));

var _markdownItAttrs = _interopRequireDefault(require("markdown-it-attrs"));

var _markdownItLazyHeaders = _interopRequireDefault(require("markdown-it-lazy-headers"));

var _markdownItEmoji = _interopRequireDefault(require("markdown-it-emoji"));

var _markdownItExpandTabs = _interopRequireDefault(require("markdown-it-expand-tabs"));

var _markdownItVideo = _interopRequireDefault(require("markdown-it-video"));

var _markdownItFence = _interopRequireDefault(require("markdown-it-fence"));

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
function generatedImage(md) {
  return (0, _markdownItFence.default)(md, 'generated_image', {
    marker: '$',
    validate: () => true
  });
}

const mdOptions = {
  html: true,
  langPrefix: 'highlight ',
  linkify: false,
  breaks: false
};
const parser = (0, _markdownIt.default)(mdOptions).use(_markdownItAttrs.default).use(_markdownItLazyHeaders.default).use(_markdownItEmoji.default, {
  shortcuts: {}
}).use(_markdownItExpandTabs.default, {
  tabWidth: 4
}).use(generatedImage).use(_markdownItVideo.default, {
  youtube: {
    width: 640,
    height: 390
  }
});

function parseMarkdown(markdown) {
  return parser.parse(markdown, {});
}

var _default = parseMarkdown;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wYXJzZXIvcGFyc2VyLnRzIl0sIm5hbWVzIjpbImdlbmVyYXRlZEltYWdlIiwibWQiLCJtYXJrZXIiLCJ2YWxpZGF0ZSIsIm1kT3B0aW9ucyIsImh0bWwiLCJsYW5nUHJlZml4IiwibGlua2lmeSIsImJyZWFrcyIsInBhcnNlciIsInVzZSIsImF0dHJzIiwibGF6eUhlYWRlcnMiLCJlbW9qaSIsInNob3J0Y3V0cyIsImV4cGFuZFRhYnMiLCJ0YWJXaWR0aCIsInZpZGVvIiwieW91dHViZSIsIndpZHRoIiwiaGVpZ2h0IiwicGFyc2VNYXJrZG93biIsIm1hcmtkb3duIiwicGFyc2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFjQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQXJCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVVBLFNBQVNBLGNBQVQsQ0FBd0JDLEVBQXhCLEVBQWtDO0FBQzlCLFNBQU8sOEJBQVlBLEVBQVosRUFBZ0IsaUJBQWhCLEVBQW1DO0FBQ3RDQyxJQUFBQSxNQUFNLEVBQUUsR0FEOEI7QUFFdENDLElBQUFBLFFBQVEsRUFBRSxNQUFNO0FBRnNCLEdBQW5DLENBQVA7QUFJSDs7QUFFRCxNQUFNQyxTQUFTLEdBQUc7QUFDZEMsRUFBQUEsSUFBSSxFQUFFLElBRFE7QUFFZEMsRUFBQUEsVUFBVSxFQUFFLFlBRkU7QUFHZEMsRUFBQUEsT0FBTyxFQUFFLEtBSEs7QUFJZEMsRUFBQUEsTUFBTSxFQUFFO0FBSk0sQ0FBbEI7QUFPQSxNQUFNQyxNQUFNLEdBQUcseUJBQVdMLFNBQVgsRUFDVk0sR0FEVSxDQUNOQyx3QkFETSxFQUVWRCxHQUZVLENBRU5FLDhCQUZNLEVBR1ZGLEdBSFUsQ0FHTkcsd0JBSE0sRUFHQztBQUFFQyxFQUFBQSxTQUFTLEVBQUU7QUFBYixDQUhELEVBSVZKLEdBSlUsQ0FJTkssNkJBSk0sRUFJTTtBQUFFQyxFQUFBQSxRQUFRLEVBQUU7QUFBWixDQUpOLEVBS1ZOLEdBTFUsQ0FLTlYsY0FMTSxFQU1WVSxHQU5VLENBTU5PLHdCQU5NLEVBTUM7QUFBRUMsRUFBQUEsT0FBTyxFQUFFO0FBQUVDLElBQUFBLEtBQUssRUFBRSxHQUFUO0FBQWNDLElBQUFBLE1BQU0sRUFBRTtBQUF0QjtBQUFYLENBTkQsQ0FBZjs7QUFRQSxTQUFTQyxhQUFULENBQXVCQyxRQUF2QixFQUFrRDtBQUM5QyxTQUFPYixNQUFNLENBQUNjLEtBQVAsQ0FBYUQsUUFBYixFQUF1QixFQUF2QixDQUFQO0FBQ0g7O2VBRWNELGEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxOSBHb29nbGUgSW5jLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQgbWFya2Rvd25JdCBmcm9tICdtYXJrZG93bi1pdCc7XG5pbXBvcnQgVG9rZW4gZnJvbSAnbWFya2Rvd24taXQvbGliL3Rva2VuJztcbmltcG9ydCBhdHRycyBmcm9tICdtYXJrZG93bi1pdC1hdHRycyc7XG5pbXBvcnQgbGF6eUhlYWRlcnMgZnJvbSAnbWFya2Rvd24taXQtbGF6eS1oZWFkZXJzJztcbmltcG9ydCBlbW9qaSBmcm9tICdtYXJrZG93bi1pdC1lbW9qaSc7XG5pbXBvcnQgZXhwYW5kVGFicyBmcm9tICdtYXJrZG93bi1pdC1leHBhbmQtdGFicyc7XG5pbXBvcnQgdmlkZW8gZnJvbSAnbWFya2Rvd24taXQtdmlkZW8nO1xuaW1wb3J0IGN1c3RvbUZlbmNlIGZyb20gJ21hcmtkb3duLWl0LWZlbmNlJztcbmZ1bmN0aW9uIGdlbmVyYXRlZEltYWdlKG1kKTogdm9pZCB7XG4gICAgcmV0dXJuIGN1c3RvbUZlbmNlKG1kLCAnZ2VuZXJhdGVkX2ltYWdlJywge1xuICAgICAgICBtYXJrZXI6ICckJyxcbiAgICAgICAgdmFsaWRhdGU6ICgpID0+IHRydWUsXG4gICAgfSk7XG59XG5cbmNvbnN0IG1kT3B0aW9ucyA9IHtcbiAgICBodG1sOiB0cnVlLFxuICAgIGxhbmdQcmVmaXg6ICdoaWdobGlnaHQgJyxcbiAgICBsaW5raWZ5OiBmYWxzZSxcbiAgICBicmVha3M6IGZhbHNlLFxufTtcblxuY29uc3QgcGFyc2VyID0gbWFya2Rvd25JdChtZE9wdGlvbnMpXG4gICAgLnVzZShhdHRycylcbiAgICAudXNlKGxhenlIZWFkZXJzKVxuICAgIC51c2UoZW1vamksIHsgc2hvcnRjdXRzOiB7fSB9KVxuICAgIC51c2UoZXhwYW5kVGFicywgeyB0YWJXaWR0aDogNCB9KVxuICAgIC51c2UoZ2VuZXJhdGVkSW1hZ2UpXG4gICAgLnVzZSh2aWRlbywgeyB5b3V0dWJlOiB7IHdpZHRoOiA2NDAsIGhlaWdodDogMzkwIH0gfSk7XG5cbmZ1bmN0aW9uIHBhcnNlTWFya2Rvd24obWFya2Rvd246IHN0cmluZyk6IFRva2VuW10ge1xuICAgIHJldHVybiBwYXJzZXIucGFyc2UobWFya2Rvd24sIHt9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgcGFyc2VNYXJrZG93bjtcbiJdfQ==
//# sourceMappingURL=parser.js.map