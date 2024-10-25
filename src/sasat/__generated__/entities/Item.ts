/* eslint-disable */
export type Item = {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly status: string;
  readonly createdAt: string;
  readonly price: number;
  readonly balance: number;
  readonly image: string;
  readonly maxiumPerPesron: number;
  readonly reset: string;
};
export type ItemCreatable = {
  readonly name: string;
  readonly description: string;
  readonly status: string;
  readonly price: number;
  readonly balance: number;
  readonly image: string;
  readonly maxiumPerPesron: number;
  readonly reset: string;
};
export type ItemUpdatable = {
  readonly id: number;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly status?: string | null;
  readonly price?: number | null;
  readonly balance?: number | null;
  readonly image?: string | null;
  readonly maxiumPerPesron?: number | null;
  readonly reset?: string | null;
};
export type ItemIdentifiable = { readonly id: number };
