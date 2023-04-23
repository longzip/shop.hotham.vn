const fs = require("fs");
const globby = require("globby");
const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;
const gql = String.raw;

function addPage(page) {
  const path = page.replace("pages", "").replace(".js", "").replace(".mdx", "");
  const route = path === "/index" ? "" : path;

  return `  <url>
    <loc>${`${process.env.WEBSITE_URL}${route}/`}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>`;
}

async function fetchAPI(query, { variables } = {}) {
  const headers = { "Content-Type": "application/json" };

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      "Authorization"
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }

  const res = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

async function getAllProductsWithSlug() {
  try {
    const data = await fetchAPI(
      gql`
        query Products {
          products(first: 5000) {
            nodes {
              id
              slug
            }
          }
        }
      `
    );
    return data?.products.nodes;
  } catch (error) {
    return null;
  }
}
async function getAllProductCategoriesWithSlug() {
  try {
    const data = await fetchAPI(
      gql`
        query PRODUCT_CATEGORIES_SLUGS {
          productCategories {
            nodes {
              id
              slug
            }
          }
        }
      `
    );
    return data?.productCategories.nodes;
  } catch (error) {
    return null;
  }
}

async function generateSitemap() {
  // Ignore Next.js specific files (e.g., _app.js) and API routes.
  const pages = await globby([
    "pages/**/*{.js,.mdx}",
    "!pages/_*.js",
    "!pages/[slug].js",
    "!pages/cua-hang/[slug].js",
    "!pages/danh-muc-san-pham/[slug].js",
    "!pages/api",
  ]);
  let allProducts = await getAllProductsWithSlug();
  if (!allProducts) allProducts = await getAllProductsWithSlug();
  if (!allProducts) allProducts = await getAllProductsWithSlug();
  if (!allProducts) allProducts = await getAllProductsWithSlug();
  let productCategories = await getAllProductCategoriesWithSlug();
  if (!productCategories)
    productCategories = await getAllProductCategoriesWithSlug();
  if (!productCategories)
    productCategories = await getAllProductCategoriesWithSlug();
  if (!productCategories)
    productCategories = await getAllProductCategoriesWithSlug();

  const sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[
  ...pages,
  ...(allProducts.map(({ slug }) => `/cua-hang/${slug}`) || []),
  ,
  ...(productCategories.map(({ slug }) => `/danh-muc-san-pham/${slug}`) || []),
]
  .map(addPage)
  .join("\n")}
</urlset>`;

  fs.writeFileSync("public/sitemap.xml", sitemap);
}

generateSitemap();
