export async function fetchFakeStoreProducts() {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error("didn't get the products");
      }
      const products = await response.json();
      return products;
    } catch (error) {
      console.error('Error', error);
      return [];
    }
  }