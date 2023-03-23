module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-vue',
    'stylelint-config-html/vue'
  ],
  plugins: ['stylelint-order'],
  fix: true,
  rules: {
    'order/properties-order': [
      /* Positioning */
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',

      /* Box Model */
      'display',
      'float',
      'width',
      'height',
      'max-width',
      'max-height',
      'overflow',
      'overflow-x',
      'overflow-y',
      'overflow-style',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',

      /* Typography */
      'font',
      'font-family',
      'color',
      'font-size',
      'font-weight',
      'line-height',
      'letter-spacing',
      'text-align',

      /* Visual */
      'background',
      'background-color',
      'background-image',
      'background-position',
      'background-size',
      'border',
      'border-width',
      'border-style',
      'border-top',
      'border-top-width',
      'border-top-style',
      'border-right',
      'border-right-width',
      'border-right-style',
      'border-bottom',
      'border-bottom-width',
      'border-bottom-style',
      'border-left',
      'border-left-width',
      'border-left-style',
      'border-radius',
      'opacity',

      /* Animation */
      'transition',

      /* Misc */
      'user-select'
    ],
    'length-zero-no-unit': [true, { ignore: ['custom-properties'] }],
    'comment-empty-line-before': [
      'always',
      { ignore: ['after-comment'], except: ['first-nested'] }
    ],
    'selector-class-pattern': '^(Mod[A-Z])?[a-z][a-zA-Z0-9]+$', // Allow .className and .ModClassName
    'custom-property-pattern': '(^[a-z][a-zA-Z0-9]+$|^([a-z][a-z0-9]*)(-[a-z0-9]+)*$)'
  }
}
