export function Heat({ level }: { level: 1 | 2 | 3 }) {
  const name = ['mild', 'medium', 'hot'][level - 1]
  return (
    <span className="heatwrap">
      <span className="heat" aria-hidden="true">
        {[1, 2, 3].map((n) => (
          <i key={n} data-on={n <= level || undefined} />
        ))}
      </span>
      <span className="heatlabel">default heat: {name}</span>
    </span>
  )
}
