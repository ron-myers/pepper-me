import type { MDXComponents } from 'mdx/types'
import { Pre } from '@/components/mdx-code'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    pre: Pre,
    table: (props) => (
      <div className="tablewrap" tabIndex={0} role="region" aria-label="Table">
        <table {...props} />
      </div>
    ),
    ...components,
  }
}
