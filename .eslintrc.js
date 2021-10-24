const RULES = {
  OFF: 'off',
  WARN: 'wanr',
  ERROR: 'error',
};

module.exports = {
  extends: 'next/core-web-vitals',
  rules: {
    '@typescript-eslint/no-explicit-any': RULES.OFF,
  },
};
