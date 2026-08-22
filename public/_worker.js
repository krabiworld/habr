import htmlTemplate from './index.html';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname !== '/' && !url.pathname.endsWith('.html') && url.pathname.includes('.')) {
      return env.ASSETS.fetch(request);
    }

    try {
      const path = url.pathname;

      if (path.startsWith('/post/') || path.startsWith('/company/')) {
        const cleanPath = path.endsWith('/') ? path.slice(0, -1) : path;
        const postId = cleanPath.split('/').pop();

        if (postId) {
          const apiResponse = await fetch(`https://habr.com/kek/v2/articles/${postId}`);

          if (apiResponse.ok) {
            const post = await apiResponse.json();

            const metaTags = `
              <title>${post.titleHtml}</title>
              <meta property="og:title" content="${post.titleHtml}" />
              <meta property="og:description" content="${post.metadata.metaDescription}" />
              <meta property="og:image" content="${post.metadata.shareImageUrl}" />
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
