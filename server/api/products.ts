export default defineEventHandler(async (event) => {
  const url = "https://www.sungod.co/products/9150/renegades?pdp=1";
  const response = await $fetch(url);

  return response;
});
