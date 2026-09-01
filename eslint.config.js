import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist/**', 'node_modules/**', 'src/components/*.tsx', 'examples/**'] },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: [
      'src/*.ts',
      'src/components/{foundation,form,feedback,layout}/**/*.{ts,tsx}',
      'src/theme/**/*.{ts,tsx}',
      'src/types/**/*.ts',
      'tests/**/*.{ts,tsx}',
      'vitest.config.ts',
    ],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
);

