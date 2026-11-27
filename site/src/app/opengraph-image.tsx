import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'
export const alt = 'Pepper: agents get the one-line ticket. Pepper gives them the kickoff meeting.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          background: '#f8c928', padding: 56, border: '14px solid #17140f', color: '#17140f',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 44, fontWeight: 900, letterSpacing: 2 }}>
          <div style={{ width: 36, height: 36, borderRadius: 18, background: '#d6322a', border: '5px solid #17140f' }} />
          PEPPER
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 84, fontWeight: 900, lineHeight: 1, textTransform: 'uppercase' }}>
          <span>Agents get the one-line ticket.</span>
          <span style={{ background: '#17140f', color: '#f8c928', padding: '4px 14px', marginTop: 10, alignSelf: 'flex-start' }}>
            Pepper gives them the kickoff.
          </span>
        </div>
        <div style={{ fontSize: 30, background: '#fffbee', border: '5px solid #17140f', padding: '14px 22px', alignSelf: 'flex-start' }}>
          /plugin install pepper-me@pepper-me
        </div>
      </div>
    ),
    size,
  )
}
