export const environment = {
  production: true,
  baseUrl: 'https://localhost:44392/api'
};
export enum ApiPaths {
  Categories = '/categories',
  Customers = '/customers',
  Orders = '/orders',
  Products = '/products',
  Sizes = '/sizes',
  Statuses = '/statuses'
  
};
export const CustomerTableHeaders = [ "Customer Name", "Customer Address", "Total Ordered Cost", "Orders Count", "Action"]
export const ProductTableHeaders = ["Product id", "Product Name", "Product Category", "Product Size", "Quantity","Price","Action"]
export const OrderTableHeaders =  ["Order Number", "Customer Name", "Customer Addres", "Total Cost", "Status"]