// src/api/product.js
import request from '@/utils/request'


/**
 * 商品管理相关API
 */
class ProductAPI {
    /**
     * 获取商品列表
     * param {Object} params - 查询参数
     * returns {Promise}
     */
    static getList(params: any) {
        return request({
            url: '/api/product',
            method: 'get',
            params
        })
    }

    /**
     * 获取商品详情
     * param {number} id - 商品ID
     * returns {Promise}
     */
    static getDetail(id: number) {
        return request({
            url: `/api/product/${id}`,
            method: 'get'
        })
    }

    /**
     * 创建商品
     * param {Object} data - 商品数据
     * returns {Promise}
     */
    static create(data: any) {
        return request({
            url: '/api/product',
            method: 'post',
            data
        })
    }

    /**
     * 更新商品
     * param {number} id - 商品ID
     * param {Object} data - 商品数据
     * returns {Promise}
     */
    static update(id: number, data: any) {
        return request({
            url: `/api/product/${id}`,
            method: 'put',
            data
        })
    }

    /**
     * 删除商品
     * param {number} id - 商品ID
     * returns {Promise}
     */
    static delete(id: number) {
        return request({
            url: `/api/product/${id}`,
            method: 'delete'
        })
    }

    /**
     * 批量删除商品
     * param {Array} ids - 商品ID数组
     * returns {Promise}
     */
    static batchDelete(ids: any) {
        return request({
            url: '/api/product/batch',
            method: 'delete',
            data: {ids}
        })
    }

    /**
     * 上架商品
     * param {number} id - 商品ID
     * returns {Promise}
     */
    static onShelf(id: number) {
        return request({
            url: `/api/product/${id}/on-shelf`,
            method: 'post'
        })
    }

    /**
     * 下架商品
     * param {number} id - 商品ID
     * returns {Promise}
     */
    static offShelf(id: number) {
        return request({
            url: `/api/product/${id}/off-shelf`,
            method: 'post'
        })
    }
}

export default ProductAPI
