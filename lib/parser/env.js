"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Context = void 0;

var _utils = require("../utils");

var _extend = _interopRequireDefault(require("extend"));

var _ = _interopRequireWildcard(require("lodash"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Context {
  constructor(css) {
    _defineProperty(this, "slides", []);

    _defineProperty(this, "currentSlide", void 0);

    _defineProperty(this, "text", void 0);

    _defineProperty(this, "styles", [{}]);

    _defineProperty(this, "listDepth", 0);

    _defineProperty(this, "css", void 0);

    _defineProperty(this, "markerParagraph", false);

    _defineProperty(this, "row", []);

    _defineProperty(this, "table", void 0);

    _defineProperty(this, "list", void 0);

    _defineProperty(this, "inlineHtmlContext", void 0);

    _defineProperty(this, "images", []);

    _defineProperty(this, "videos", []);

    this.css = css;
    this.startSlide();
  }

  done() {
    this.endSlide();
  }

  startTextBlock() {
    this.text = {
      rawText: '',
      textRuns: [],
      listMarkers: [],
      big: false
    };
  }

  appendText(content) {
    this.text.rawText += content;
  }

  endSlide() {
    if (this.currentSlide) {
      if (this.images.length || this.videos.length || this.text && this.text.rawText.trim().length) {
        this.currentSlide.bodies.push({
          text: this.text,
          images: this.images,
          videos: this.videos
        });
        this.images = [];
        this.videos = [];
      }

      this.slides.push(this.currentSlide);
    }

    this.currentSlide = undefined;
    this.text = undefined;
  }

  startSlide() {
    this.currentSlide = {
      objectId: (0, _utils.uuid)(),
      customLayout: null,
      title: null,
      subtitle: null,
      backgroundImage: null,
      bodies: [],
      tables: [],
      notes: null
    };
  }

  currentStyle() {
    return this.styles[this.styles.length - 1];
  }

  startStyle(newStyle) {
    const previousStyle = this.currentStyle();
    const style = (0, _extend.default)({}, newStyle, previousStyle);
    style.start = this.text.rawText.length;
    this.styles.push(style);
  }

  endStyle() {
    const style = this.styles.pop();
    style.end = this.text.rawText.length;

    if (style.start == style.end) {
      return; // Ignore empty ranges
    }

    if (_.isEmpty(_.keys(_.omit(style, 'start', 'end')))) {
      return; // Ignore ranges with no style
    }

    if (_.find(this.text.textRuns, _.matches(style))) {
      return; // Ignore duplicate ranges
    }

    this.text.textRuns.push(style);
  }

}

exports.Context = Context;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wYXJzZXIvZW52LnRzIl0sIm5hbWVzIjpbIkNvbnRleHQiLCJjb25zdHJ1Y3RvciIsImNzcyIsInN0YXJ0U2xpZGUiLCJkb25lIiwiZW5kU2xpZGUiLCJzdGFydFRleHRCbG9jayIsInRleHQiLCJyYXdUZXh0IiwidGV4dFJ1bnMiLCJsaXN0TWFya2VycyIsImJpZyIsImFwcGVuZFRleHQiLCJjb250ZW50IiwiY3VycmVudFNsaWRlIiwiaW1hZ2VzIiwibGVuZ3RoIiwidmlkZW9zIiwidHJpbSIsImJvZGllcyIsInB1c2giLCJzbGlkZXMiLCJ1bmRlZmluZWQiLCJvYmplY3RJZCIsImN1c3RvbUxheW91dCIsInRpdGxlIiwic3VidGl0bGUiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJ0YWJsZXMiLCJub3RlcyIsImN1cnJlbnRTdHlsZSIsInN0eWxlcyIsInN0YXJ0U3R5bGUiLCJuZXdTdHlsZSIsInByZXZpb3VzU3R5bGUiLCJzdHlsZSIsInN0YXJ0IiwiZW5kU3R5bGUiLCJwb3AiLCJlbmQiLCJfIiwiaXNFbXB0eSIsImtleXMiLCJvbWl0IiwiZmluZCIsIm1hdGNoZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUF1QkE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7QUFHTyxNQUFNQSxPQUFOLENBQWM7QUFlVkMsRUFBQUEsV0FBUCxDQUFtQkMsR0FBbkIsRUFBb0M7QUFBQSxvQ0FkRCxFQWNDOztBQUFBOztBQUFBOztBQUFBLG9DQVhELENBQUMsRUFBRCxDQVdDOztBQUFBLHVDQVZqQixDQVVpQjs7QUFBQTs7QUFBQSw2Q0FSWCxLQVFXOztBQUFBLGlDQVBMLEVBT0s7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUEsb0NBSEQsRUFHQzs7QUFBQSxvQ0FGRCxFQUVDOztBQUNoQyxTQUFLQSxHQUFMLEdBQVdBLEdBQVg7QUFDQSxTQUFLQyxVQUFMO0FBQ0g7O0FBRU1DLEVBQUFBLElBQVAsR0FBb0I7QUFDaEIsU0FBS0MsUUFBTDtBQUNIOztBQUVNQyxFQUFB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LENBQVVFLFFBQWpCLEVBQTJCK0IsQ0FBQyxDQUFDSyxPQUFGLENBQVVWLEtBQVYsQ0FBM0IsQ0FBSixFQUFrRDtBQUM5QyxhQUQ4QyxDQUN0QztBQUNYOztBQUNELFNBQUs1QixJQUFMLENBQVVFLFFBQVYsQ0FBbUJXLElBQW5CLENBQXdCZSxLQUF4QjtBQUNIOztBQTNGZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxOSBHb29nbGUgSW5jLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQge1xuICAgIFNsaWRlRGVmaW5pdGlvbixcbiAgICBUZXh0RGVmaW5pdGlvbixcbiAgICBTdHlsZURlZmluaXRpb24sXG4gICAgVGFibGVEZWZpbml0aW9uLFxuICAgIExpc3REZWZpbml0aW9uLFxuICAgIEltYWdlRGVmaW5pdGlvbixcbiAgICBWaWRlb0RlZmluaXRpb24sXG59IGZyb20gJy4uL3NsaWRlcyc7XG5pbXBvcnQgeyB1dWlkIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IGV4dGVuZCBmcm9tICdleHRlbmQnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgU3R5bGVzaGVldCB9IGZyb20gJy4vY3NzJztcblxuZXhwb3J0IGNsYXNzIENvbnRleHQge1xuICAgIHB1YmxpYyBzbGlkZXM6IFNsaWRlRGVmaW5pdGlvbltdID0gW107XG4gICAgcHVibGljIGN1cnJlbnRTbGlkZT86IFNsaWRlRGVmaW5pdGlvbjtcbiAgICBwdWJsaWMgdGV4dD86IFRleHREZWZpbml0aW9uO1xuICAgIHB1YmxpYyBzdHlsZXM6IFN0eWxlRGVmaW5pdGlvbltdID0gW3t9XTtcbiAgICBwdWJsaWMgbGlzdERlcHRoID0gMDtcbiAgICBwdWJsaWMgY3NzPzogU3R5bGVzaGVldDtcbiAgICBwdWJsaWMgbWFya2VyUGFyYWdyYXBoID0gZmFsc2U7XG4gICAgcHVibGljIHJvdzogVGV4dERlZmluaXRpb25bXSA9IFtdO1xuICAgIHB1YmxpYyB0YWJsZT86IFRhYmxlRGVmaW5pdGlvbjtcbiAgICBwdWJsaWMgbGlzdD86IExpc3REZWZpbml0aW9uO1xuICAgIHB1YmxpYyBpbmxpbmVIdG1sQ29udGV4dD86IG9iamVjdDtcbiAgICBwdWJsaWMgaW1hZ2VzOiBJbWFnZURlZmluaXRpb25bXSA9IFtdO1xuICAgIHB1YmxpYyB2aWRlb3M6IFZpZGVvRGVmaW5pdGlvbltdID0gW107XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoY3NzOiBTdHlsZXNoZWV0KSB7XG4gICAgICAgIHRoaXMuY3NzID0gY3NzO1xuICAgICAgICB0aGlzLnN0YXJ0U2xpZGUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZG9uZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5lbmRTbGlkZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGFydFRleHRCbG9jaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50ZXh0ID0ge1xuICAgICAgICAgICAgcmF3VGV4dDogJycsXG4gICAgICAgICAgICB0ZXh0UnVuczogW10sXG4gICAgICAgICAgICBsaXN0TWFya2VyczogW10sXG4gICAgICAgICAgICBiaWc6IGZhbHNlLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHB1YmxpYyBhcHBlbmRUZXh0KGNvbnRlbnQ6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnRleHQucmF3VGV4dCArPSBjb250ZW50O1xuICAgIH1cblxuICAgIHB1YmxpYyBlbmRTbGlkZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFNsaWRlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pbWFnZXMubGVuZ3RoIHx8IHRoaXMudmlkZW9zLmxlbmd0aCB8fCAodGhpcy50ZXh0ICYmIHRoaXMudGV4dC5yYXdUZXh0LnRyaW0oKS5sZW5ndGgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U2xpZGUuYm9kaWVzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiB0aGlzLnRleHQsXG4gICAgICAgICAgICAgICAgICAgIGltYWdlczogdGhpcy5pbWFnZXMsXG4gICAgICAgICAgICAgICAgICAgIHZpZGVvczogdGhpcy52aWRlb3MsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZXMgPSBbXTtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZGVvcyA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zbGlkZXMucHVzaCh0aGlzLmN1cnJlbnRTbGlkZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdXJyZW50U2xpZGUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMudGV4dCA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhcnRTbGlkZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U2xpZGUgPSB7XG4gICAgICAgICAgICBvYmplY3RJZDogdXVpZCgpLFxuICAgICAgICAgICAgY3VzdG9tTGF5b3V0OiBudWxsLFxuICAgICAgICAgICAgdGl0bGU6IG51bGwsXG4gICAgICAgICAgICBzdWJ0aXRsZTogbnVsbCxcbiAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogbnVsbCxcbiAgICAgICAgICAgIGJvZGllczogW10sXG4gICAgICAgICAgICB0YWJsZXM6IFtdLFxuICAgICAgICAgICAgbm90ZXM6IG51bGwsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHVibGljIGN1cnJlbnRTdHlsZSgpOiBTdHlsZURlZmluaXRpb24ge1xuICAgICAgICByZXR1cm4gdGhpcy5zdHlsZXNbdGhpcy5zdHlsZXMubGVuZ3RoIC0gMV07XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXJ0U3R5bGUobmV3U3R5bGU6IFN0eWxlRGVmaW5pdGlvbik6IHZvaWQge1xuICAgICAgICBjb25zdCBwcmV2aW91c1N0eWxlID0gdGhpcy5jdXJyZW50U3R5bGUoKTtcbiAgICAgICAgY29uc3Qgc3R5bGUgPSBleHRlbmQoe30sIG5ld1N0eWxlLCBwcmV2aW91c1N0eWxlKTtcbiAgICAgICAgc3R5bGUuc3RhcnQgPSB0aGlzLnRleHQucmF3VGV4dC5sZW5ndGg7XG4gICAgICAgIHRoaXMuc3R5bGVzLnB1c2goc3R5bGUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBlbmRTdHlsZSgpOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgc3R5bGUgPSB0aGlzLnN0eWxlcy5wb3AoKTtcbiAgICAgICAgc3R5bGUuZW5kID0gdGhpcy50ZXh0LnJhd1RleHQubGVuZ3RoO1xuICAgICAgICBpZiAoc3R5bGUuc3RhcnQgPT0gc3R5bGUuZW5kKSB7XG4gICAgICAgICAgICByZXR1cm47IC8vIElnbm9yZSBlbXB0eSByYW5nZXNcbiAgICAgICAgfVxuICAgICAgICBpZiAoXy5pc0VtcHR5KF8ua2V5cyhfLm9taXQoc3R5bGUsICdzdGFydCcsICdlbmQnKSkpKSB7XG4gICAgICAgICAgICByZXR1cm47IC8vIElnbm9yZSByYW5nZXMgd2l0aCBubyBzdHlsZVxuICAgICAgICB9XG4gICAgICAgIGlmIChfLmZpbmQodGhpcy50ZXh0LnRleHRSdW5zLCBfLm1hdGNoZXMoc3R5bGUpKSkge1xuICAgICAgICAgICAgcmV0dXJuOyAvLyBJZ25vcmUgZHVwbGljYXRlIHJhbmdlc1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudGV4dC50ZXh0UnVucy5wdXNoKHN0eWxlKTtcbiAgICB9XG59XG4iXX0=
//# sourceMappingURL=env.js.map