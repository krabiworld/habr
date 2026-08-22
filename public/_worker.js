import htmlTemplate from './index.html';

function escapeHtml(str) {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname !== '/' && !url.pathname.endsWith('.html') && url.pathname.includes('.')) {
      return env.ASSETS.fetch(request);
    }

    try {
      const path = url.pathname;
      const isDirectPost = path.startsWith('/post/');
      const isCompanyBlog = path.startsWith('/company/') && path.includes('/blog/');

      if (isDirectPost || isCompanyBlog) {
        const cleanPath = path.endsWith('/') ? path.slice(0, -1) : path;
        const postId = cleanPath.split('/').pop();

        if (postId) {
          const apiResponse = await fetch(`https://habr.com/kek/v2/articles/${postId}`);

          if (apiResponse.ok) {
            const post = await apiResponse.json();

            const title = escapeHtml(post.titleHtml);
            const description = escapeHtml(post.metadata.metaDescription);
            const image = escapeHtml(post.metadata.shareImageUrl);

            const metaTags = `
              <title>${title}</title>
              <meta property="og:title" content="${title}" />
              <meta property="og:description" content="${description}" />
              <meta property="og:image" content="${image}" />
              <meta property="og:url" content="${url.href}" />
            `;

            const response = new Response(htmlTemplate, {
              headers: { 'content-type': 'text/html;charset=UTF-8' },
            });

            return new HTMLRewriter()
              .on('title', { element(el) { el.remove(); } })
              .on('head', {
                element(el) {
                  el.append(metaTags, { html: true });
                },
              })
              .transform(response);
          }
        }
      }

      return new Response(htmlTemplate, {
        headers: { 'content-type': 'text/html;charset=UTF-8' },
      });

    } catch (e) {
      return new Response(htmlTemplate, {
        headers: { 'content-type': 'text/html;charset=UTF-8' },
      });
    }
  },
};
