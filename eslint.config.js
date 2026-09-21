export default [
  { ignores: ['dist/', 'node_modules/', 'scripts/', 'public/', '*.config.js', '*.config.mjs'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        browser: true,
        es2022: true,
        React: 'writable',
      },
    },
    settings: {
      react: { version: '18.3' },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx'],
        },
      },
    },
    plugins: {
      react: (await import('eslint-plugin-react')).default ?? (await import('eslint-plugin-react')),
      'react-hooks': (await import('eslint-plugin-react-hooks')).default ?? (await import('eslint-plugin-react-hooks')),
      'react-refresh': (await import('eslint-plugin-react-refresh')).default ?? (await import('eslint-plugin-react-refresh')),
      'jsx-a11y': (await import('eslint-plugin-jsx-a11y')).default ?? (await import('eslint-plugin-jsx-a11y')),
      import: (await import('eslint-plugin-import')).default ?? (await import('eslint-plugin-import')),
    },
    rules: {
      // React
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/self-closing-comp': 'error',
      'react/jsx-no-useless-fragment': 'warn',
      'react/jsx-uses-vars': 'error',
      
      // React Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      
      // React Refresh
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      
      // JSX A11y
      'jsx-a11y/anchor-is-valid': 'warn',
      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/no-noninteractive-element-interactions': 'warn',
      'jsx-a11y/role-has-required-aria-props': 'warn',
      
      // Import
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/no-unresolved': 'error',
      'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/*.test.jsx', '**/*.test.js', '**/*.spec.jsx', '**/*.spec.js', 'vite.config.js'] }],
      
      // General
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'prefer-const': 'error',
      'no-var': 'error',
      'eqeqeq': ['error', 'always', { null: 'ignore' }],
      
      // React specific
      'react/jsx-boolean-value': 'warn',
      'react/jsx-curly-brace-presence': ['warn', 'never'],
    },
  },
];