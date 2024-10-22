/** @type {import("prettier").Config} */
export default {
	printWidth: 100,
	semi: false,
	singleQuote: true,
	jsxSingleQuote: true,
	tabWidth: 2,
	trailingComma: 'none' ,
	useTabs: true,
	plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
	overrides: [
		{
			files: ['*.json', '*.md', '*.toml', '*.yml', '*.astro'],
			options: {
				useTabs: false,
				parser: 'astro'
			}
		}
	],
	endOfLine: 'lf'
}
