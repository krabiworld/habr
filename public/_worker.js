import htmlTemplate from './index.html';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname !== '/' && !url.pathname.endsWith('.html') && url.pathname.includes('.')) {
      return env.ASSETS.fetch(request);
    }

    try {
      let metaTags = '';
      const path = url.pathname;

      const isDirectPost = path.startsWith('/post/');
      const isCompanyBlog = path.startsWith('/company/') && path.includes('/blog/');

      if (isDirectPost || isCompanyBlog) {
        const cleanPath = path.endsWith('/') ? path.slice(0, -1) : path;
        const postId = cleanPath.split('/').pop();

        if (!postId) {
          return
        }

        const apiResponse = await fetch(`https://habr.com/kek/v2/articles/${postId}`);

        if (apiResponse.ok) {
          const post = await apiResponse.json();
          metaTags = `
            <title>${post.titleHtml}</title>
            <meta property="og:title" content="${post.titleHtml}" />
            <meta property="og:description" content="${post.metadata.metaDescription}" />
            <meta property="og:image" content="${post.metadata.shareImageUrl}" />
            <meta property="og:url" content="${url.href}" />
            <meta name="twitter:card" content="summary_large_image" />
          `;
        }
      }

      const finalHtml = htmlTemplate.replace('</head>', `${metaTags}</head>`);

      return new Response(finalHtml, {
        headers: { 'content-type': 'text/html;charset=UTF-8' },
      });

    } catch (e) {
      return new Response(htmlTemplate, {
        headers: { 'content-type': 'text/html;charset=UTF-8' },
      });
    }
  },
};
