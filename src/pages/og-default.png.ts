import type { APIRoute } from 'astro';
import sharp from 'sharp';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

function escapeXml(s: string) {
	return s
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&apos;');
}

function renderSvg(title: string, description: string) {
	const t = escapeXml(title);
	const d = escapeXml(description);

	return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0b1020"/>
      <stop offset="1" stop-color="#090d18"/>
    </linearGradient>
    <radialGradient id="glow" cx="20%" cy="20%" r="70%">
      <stop offset="0" stop-color="#ffd38a" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#ffd38a" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <g font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" fill="#E9EDF7">
    <text x="84" y="170" font-size="56" font-weight="700">${t}</text>
    <text x="84" y="240" font-size="28" fill="rgba(233,237,247,0.78)">${d}</text>

    <g transform="translate(84, 475)">
      <rect x="0" y="-44" width="340" height="64" rx="32" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.14)"/>
      <text x="24" y="-4" font-size="22" fill="rgba(233,237,247,0.78)">AFNE AI — Bitácora</text>
    </g>
  </g>
</svg>`;
}

export const GET: APIRoute = async () => {
	const svg = renderSvg(SITE_TITLE, SITE_DESCRIPTION);
	const png = await sharp(Buffer.from(svg)).png().toBuffer();

	return new Response(png, {
		headers: {
			'content-type': 'image/png',
			'cache-control': 'public, max-age=31536000, immutable',
		},
	});
};
