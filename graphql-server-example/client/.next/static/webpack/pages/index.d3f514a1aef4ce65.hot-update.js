"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./src/pages/index.tsx":
/*!*****************************!*\
  !*** ./src/pages/index.tsx ***!
  \*****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Home; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _generated_graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/generated/graphql */ \"./src/generated/graphql.ts\");\n\nvar _s = $RefreshSig$();\n\n\nfunction Home() {\n    _s();\n    const { loading, error, data } = (0,_generated_graphql__WEBPACK_IMPORTED_MODULE_1__.useBooksQuery)(data);\n    console.log(data);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                children: \"Books\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\MY PC\\\\OneDrive\\\\Desktop\\\\graphql-server-example\\\\frontend\\\\src\\\\pages\\\\index.tsx\",\n                lineNumber: 14,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"ul\", {\n                children: data.books.map((book)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                                children: book.title\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\MY PC\\\\OneDrive\\\\Desktop\\\\graphql-server-example\\\\frontend\\\\src\\\\pages\\\\index.tsx\",\n                                lineNumber: 18,\n                                columnNumber: 13\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                children: book.author\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\MY PC\\\\OneDrive\\\\Desktop\\\\graphql-server-example\\\\frontend\\\\src\\\\pages\\\\index.tsx\",\n                                lineNumber: 19,\n                                columnNumber: 13\n                            }, this)\n                        ]\n                    }, book.id, true, {\n                        fileName: \"C:\\\\Users\\\\MY PC\\\\OneDrive\\\\Desktop\\\\graphql-server-example\\\\frontend\\\\src\\\\pages\\\\index.tsx\",\n                        lineNumber: 17,\n                        columnNumber: 11\n                    }, this))\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\MY PC\\\\OneDrive\\\\Desktop\\\\graphql-server-example\\\\frontend\\\\src\\\\pages\\\\index.tsx\",\n                lineNumber: 15,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\MY PC\\\\OneDrive\\\\Desktop\\\\graphql-server-example\\\\frontend\\\\src\\\\pages\\\\index.tsx\",\n        lineNumber: 13,\n        columnNumber: 5\n    }, this);\n}\n_s(Home, \"dflDsNzn0DjObECN8QFUoRuXDjs=\", false, function() {\n    return [\n        _generated_graphql__WEBPACK_IMPORTED_MODULE_1__.useBooksQuery\n    ];\n});\n_c = Home;\nvar _c;\n$RefreshReg$(_c, \"Home\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvaW5kZXgudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtNQTtBQUY4QztBQUlyQyxTQUFTRTs7SUFDdEIsTUFBTSxFQUFFQyxPQUFPLEVBQUVDLEtBQUssRUFBRUMsSUFBSSxFQUFFLEdBQUdKLGlFQUFhQSxDQUFDSTtJQUUvQ0MsUUFBUUMsR0FBRyxDQUFDRjtJQUNaLHFCQUNFLDhEQUFDRzs7MEJBQ0MsOERBQUNDOzBCQUFHOzs7Ozs7MEJBQ0osOERBQUNDOzBCQUNFTCxLQUFLTSxLQUFLLENBQUNDLEdBQUcsQ0FBQyxDQUFDQyxxQkFDZiw4REFBQ0M7OzBDQUNDLDhEQUFDQzswQ0FBSUYsS0FBS0csS0FBSzs7Ozs7OzBDQUNmLDhEQUFDQzswQ0FBR0osS0FBS0ssTUFBTTs7Ozs7Ozt1QkFGUkwsS0FBS00sRUFBRTs7Ozs7Ozs7Ozs7Ozs7OztBQVExQjtHQWpCd0JqQjs7UUFDV0QsNkRBQWFBOzs7S0FEeEJDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9wYWdlcy9pbmRleC50c3g/MTlhMCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSW1hZ2UgZnJvbSBcIm5leHQvaW1hZ2VcIjtcbmltcG9ydCB7IEludGVyIH0gZnJvbSBcIm5leHQvZm9udC9nb29nbGVcIjtcbmltcG9ydCB7IHVzZVF1ZXJ5LCBncWwgfSBmcm9tIFwiQGFwb2xsby9jbGllbnRcIjtcbmltcG9ydCB7IHVzZUJvb2tzUXVlcnkgfSBmcm9tIFwiQC9nZW5lcmF0ZWQvZ3JhcGhxbFwiO1xuXG5jb25zdCBpbnRlciA9IEludGVyKHsgc3Vic2V0czogW1wibGF0aW5cIl0gfSk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEhvbWUoKSB7XG4gIGNvbnN0IHsgbG9hZGluZywgZXJyb3IsIGRhdGEgfSA9IHVzZUJvb2tzUXVlcnkoZGF0YSk7XG5cbiAgY29uc29sZS5sb2coZGF0YSk7XG4gIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICAgIDxoMT5Cb29rczwvaDE+XG4gICAgICA8dWw+XG4gICAgICAgIHtkYXRhLmJvb2tzLm1hcCgoYm9vaykgPT4gKFxuICAgICAgICAgIDxsaSBrZXk9e2Jvb2suaWR9PlxuICAgICAgICAgICAgPGgyPntib29rLnRpdGxlfTwvaDI+XG4gICAgICAgICAgICA8cD57Ym9vay5hdXRob3J9PC9wPlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgICkpfVxuICAgICAgPC91bD5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJpbnRlciIsInVzZUJvb2tzUXVlcnkiLCJIb21lIiwibG9hZGluZyIsImVycm9yIiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJkaXYiLCJoMSIsInVsIiwiYm9va3MiLCJtYXAiLCJib29rIiwibGkiLCJoMiIsInRpdGxlIiwicCIsImF1dGhvciIsImlkIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/pages/index.tsx\n"));

/***/ })

});