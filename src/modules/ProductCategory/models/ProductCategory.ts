import { IProductCategoryResponse } from "../interfaces/request-interface";
import { IModel } from "@/modules/Base/interfaces/model-interface";

export interface IProductCategoryModel extends IModel {
  slug: string;
  parentId?: string;
  title: string;
  content: string;
}

const toProductCategory = <T extends IProductCategoryResponse>(data: T): IProductCategoryModel => ({
  id: data.slug,
  slug: data.slug,
  parentId: data.parent_id,
  title: data.title,
  content: data.content,
  status: data.status,
  statusText: data.status_text,
  statusObject: (statuses) =>
    statuses.find((status) => status.value == data.status),
  type: data.type,
  typeText: data.type_text,
  typeObject: (types) => types.find((type) => type.value == data.type),
  createdAt: data.created_at,
  createdAtText: data.created_at_text,
  updatedAt: data.updated_at,
  updatedAtText: data.updated_at_text,
  deletedAt: data.deleted_at,
  deletedAtText: data.deleted_at_text,
});

export default toProductCategory;
