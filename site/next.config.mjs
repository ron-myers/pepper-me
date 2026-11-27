import createMDX from '@next/mdx'

const withMDX = createMDX({
  options: { remarkPlugins: ['remark-gfm'] },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  images: { unoptimized: true },
  trailingSlash: false,
}

export default withMDX(nextConfig)
