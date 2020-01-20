"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FileUploader = exports.FileUploadButton = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _async = _interopRequireDefault(require("async"));

require("./style.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var FileUploadButton = function FileUploadButton(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === void 0 ? 'fileUploaderButton' : _ref$className,
      style = _ref.style,
      _ref$label = _ref.label,
      label = _ref$label === void 0 ? 'Upload File' : _ref$label,
      _ref$accept = _ref.accept,
      accept = _ref$accept === void 0 ? '.png, .jpeg, .gif, .jpg' : _ref$accept,
      _ref$multiple = _ref.multiple,
      multiple = _ref$multiple === void 0 ? false : _ref$multiple,
      maxSizeMB = _ref.maxSizeMB,
      onChange = _ref.onChange,
      onError = _ref.onError;
  var inputRef = (0, _react.useRef)(null);
  return _react.default.createElement("div", null, _react.default.createElement(FileUploader, {
    inputRef: inputRef,
    accept: accept,
    multiple: multiple,
    maxSizeMB: maxSizeMB,
    onChange: onChange,
    onError: onError,
    isHidden: true
  }), _react.default.createElement("button", {
    className: className,
    style: style,
    onClick: function onClick() {
      return inputRef.current.click();
    }
  }, label));
};

exports.FileUploadButton = FileUploadButton;

var FileUploader = function FileUploader(_ref2) {
  var inputRef = _ref2.inputRef,
      _ref2$accept = _ref2.accept,
      accept = _ref2$accept === void 0 ? '.png, .jpeg, .gif, .jpg' : _ref2$accept,
      _ref2$multiple = _ref2.multiple,
      multiple = _ref2$multiple === void 0 ? false : _ref2$multiple,
      maxSizeMB = _ref2.maxSizeMB,
      onChange = _ref2.onChange,
      onError = _ref2.onError,
      _ref2$isHidden = _ref2.isHidden,
      isHidden = _ref2$isHidden === void 0 ? false : _ref2$isHidden;

  var onFileUpload = function onFileUpload(_ref3) {
    var files = _ref3.target.files;
    if (!files || files.length <= 0) return;
    var uploadedFiles = [];

    _async.default.each(files, function (file, callback) {
      if (maxSizeMB && file.size > maxSizeMB * 1000000) {
        return callback("'".concat(file.name, "' is too large, file must be ").concat(maxSizeMB, " Mb or below."));
      }

      var reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onerror = function (err) {
        return callback(err);
      };

      reader.onloadend = function () {
        uploadedFiles.push(file);
        callback();
      };
    }, function (err) {
      if (err) {
        if (onError) onError(err);
      } else {
        onChange(uploadedFiles);
      }
    });
  };

  return _react.default.createElement("input", {
    type: "file",
    style: {
      display: isHidden ? 'none' : 'block'
    },
    ref: inputRef,
    onChange: onFileUpload,
    accept: accept,
    multiple: multiple
  });
};

exports.FileUploader = FileUploader;
FileUploadButton.propTypes = {
  label: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element]),
  accept: _propTypes.default.string.isRequired,
  multiple: _propTypes.default.bool,
  maxSizeMB: _propTypes.default.number,
  onChange: _propTypes.default.func.isRequired,
  onError: _propTypes.default.func,
  isHidden: _propTypes.default.bool
};
FileUploader.propTypes = {
  accept: _propTypes.default.string,
  multiple: _propTypes.default.bool.isRequired,
  maxSizeMB: _propTypes.default.number,
  onChange: _propTypes.default.func.isRequired,
  onError: _propTypes.default.func,
  isHidden: _propTypes.default.bool
};