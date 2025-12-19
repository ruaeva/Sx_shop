import request from '@/utils/request';

// API service for product operations

export interface ProductItem {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
    sales?: string;
    tag?: string;
    originalPrice?: number; // 原价
    discount?: number; // 折扣
    stock?: number; // 库存
    rating?: number; // 评分
    isFavorite?: boolean; // 是否收藏
    specifications?: Record<string, any>; // 规格参数
}

// 分页响应接口
export interface PaginatedResponse<T> {
    records: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

// 商品响应接口
export interface ProductResponse {
    records?: ProductItem[];
    data?: ProductItem[]; // 兼容不同结构
    total?: number;
    page?: number;
    pageSize?: number;
}

// 搜索参数接口
export interface ProductSearchParams {
    page?: number;
    pageSize?: number;
    keyword?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: 'price' | 'sales' | 'rating' | 'createTime';
    sortOrder?: 'asc' | 'desc';

    [key: string]: any;
}

// API响应通用接口
export interface ApiResponse<T> {
    code: number;
    message: string;
    data: T;
    success: boolean;
}

// 统一错误处理函数
const handleApiError = (error: any, operation: string) => {
    console.error(`API Error in ${operation}:`, error);
    // 可以在这里添加统一的错误处理逻辑，如显示错误提示等
    throw error;
};

// 商品API服务
export const productAPI = {


    // 获取所有商品（带分页）
    // getAllProducts: async (params: ProductSearchParams = {}) => {
    //     try {
    //         const defaultParams: ProductSearchParams = {
    //             page: params.page || 1,
    //             pageSize: params.pageSize || 10,
    //             keyword: params.keyword || '',
    //             category: params.category || '',
    //             minPrice: params.minPrice,
    //             maxPrice: params.maxPrice,
    //             sortBy: params.sortBy || 'createTime',
    //             sortOrder: params.sortOrder || 'desc',
    //             ...params
    //         };
    //         const response = await request<PaginatedResponse<ProductItem>>({
    //             url: '/api/product/list',
    //             method: 'get',
    //             params: defaultParams
    //         });
    //         return response;
    //     } catch (error) {
    //         return handleApiError(error, 'getAllProducts');
    //     }
    // },

    // 根据ID获取单个商品
    getProductById: async (id: number) => {
        try {
            const response = await request<ProductItem>({
                url: `/api/product/${id}`,
                method: 'get'
            });
            return response;
        } catch (error) {
            return handleApiError(error, 'getProductById');
        }
    },

    // 获取商品详情
    getProductDetail: async (id: number) => {
        try {
            const response = await request<ProductItem>({
                url: `/api/product/detail/${id}`,
                method: 'get'
            });
            return response;
        } catch (error) {
            return handleApiError(error, 'getProductDetail');
        }
    },

    // 获取商品列表（按分类）
    getProductsByCategory: async (category: string, params: ProductSearchParams = {}) => {
        try {
            const defaultParams: ProductSearchParams = {
                page: params.page || 1,
                pageSize: params.pageSize || 10,
                category,
                ...params
            };
            const response = await request<PaginatedResponse<ProductItem>>({
                url: '/api/product/list',
                method: 'get',
                params: defaultParams
            });
            return response;
        } catch (error) {
            return handleApiError(error, 'getProductsByCategory');
        }
    },

    // 搜索商品
    searchProducts: async (keyword: string, params: ProductSearchParams = {}) => {
        try {
            const defaultParams: ProductSearchParams = {
                page: params.page || 1,
                pageSize: params.pageSize || 10,
                keyword,
                ...params
            };
            const response = await request<PaginatedResponse<ProductItem>>({
                url: '/api/product/search',
                method: 'get',
                params: defaultParams
            });
            return response;
        } catch (error) {
            return handleApiError(error, 'searchProducts');
        }
    },
    getAllProducts: async (params: { page?: number; pageSize?: number; [key: string]: any } = {}) => {
        try {
            const defaultParams = {
                page: params.page || 1,
                pageSize: params.pageSize || 10,
                ...params
            };
            const response = await request<PaginatedResponse<ProductItem>>({
                url: '/api/product/all',
                method: 'get',
                params: defaultParams
            });
            return response;
        } catch (error) {
            return handleApiError(error, 'getAllProducts');
        }
    },
    // 获取推荐商品列表
    getRecommendList: async (params: { page?: number; pageSize?: number; [key: string]: any } = {}) => {
        try {
            const defaultParams = {
                page: params.page || 1,
                pageSize: params.pageSize || 10,
                ...params
            };
            const response = await request<PaginatedResponse<ProductItem>>({
                url: '/api/product/recommend',
                method: 'get',
                params: defaultParams
            });
            return response;
        } catch (error) {
            return handleApiError(error, 'getRecommendList');
        }
    },

    // 获取热门商品
    getHotProducts: async (params: { page?: number; pageSize?: number } = {}) => {
        try {
            const defaultParams = {
                page: params.page || 1,
                pageSize: params.pageSize || 10
            };
            const response = await request<PaginatedResponse<ProductItem>>({
                url: '/api/product/hot',
                method: 'get',
                params: defaultParams
            });
            return response;
        } catch (error) {
            return handleApiError(error, 'getHotProducts');
        }
    },

    // 获取新品商品
    getNewProducts: async (params: { page?: number; pageSize?: number } = {}) => {
        try {
            const defaultParams = {
                page: params.page || 1,
                pageSize: params.pageSize || 10
            };
            const response = await request<PaginatedResponse<ProductItem>>({
                url: '/api/product/new',
                method: 'get',
                params: defaultParams
            });
            return response;
        } catch (error) {
            return handleApiError(error, 'getNewProducts');
        }
    },

    // 获取商品评价
    getProductReviews: async (id: number, params: { page?: number; pageSize?: number } = {}) => {
        try {
            const defaultParams = {
                page: params.page || 1,
                pageSize: params.pageSize || 10
            };
            const response = await request({
                url: `/api/product/${id}/reviews`,
                method: 'get',
                params: defaultParams
            });
            return response;
        } catch (error) {
            return handleApiError(error, 'getProductReviews');
        }
    },

    // 添加商品到收藏
    addToFavorites: async (id: number) => {
        try {
            const response = await request({
                url: `/api/product/${id}/favorite`,
                method: 'post'
            });
            return response;
        } catch (error) {
            return handleApiError(error, 'addToFavorites');
        }
    },

    // 从收藏中移除商品
    removeFromFavorites: async (id: number) => {
        try {
            const response = await request({
                url: `/api/product/${id}/favorite`,
                method: 'delete'
            });
            return response;
        } catch (error) {
            return handleApiError(error, 'removeFromFavorites');
        }
    },

    // 获取商品规格信息
    getProductSpecifications: async (id: number) => {
        try {
            const response = await request({
                url: `/api/product/${id}/specifications`,
                method: 'get'
            });
            return response;
        } catch (error) {
            return handleApiError(error, 'getProductSpecifications');
        }
    }
};

export default productAPI