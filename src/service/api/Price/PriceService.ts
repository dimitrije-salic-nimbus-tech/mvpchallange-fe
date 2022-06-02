import { get } from '../../HttpService';

const basePricesUrl = `/product-prices`;

const getProductPriceHistoryUrl = (id: string, offset: number): string =>
  `${basePricesUrl}/${id}/product?offset=${offset}&limit=8`;

export const getProductPriceHistoryRequest = async (id: string, offset: number): Promise<any> =>
  get<any>(getProductPriceHistoryUrl(id, offset)).then((response) => response.data);
