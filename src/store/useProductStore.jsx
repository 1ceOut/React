// useProductStore.js
import { create } from 'zustand';
import axios from 'axios';

const useProductStore = create((set) => ({
    lcategories: [],
    scategories: [],
    fetchLcategories: async (productType) => {
        try {
            let url = '';
            let params = {};

            if (productType === '가공식품') {
                url = 'https://elastic.icebuckwheat.kro.kr/recipe/_search';
                params = {
                    size: 0,
                    aggs: {
                        unique_lcategories: {
                            terms: {
                                script: {
                                    source: "doc['lcategory'].value",
                                    lang: "painless"
                                },
                                size: 100
                            }
                        }
                    }
                };
            } else if (productType === '원자재성 식품') {
                url = 'https://elastic.icebuckwheat.kro.kr/food/_search';
                params = {
                    size: 0,
                    aggs: {
                        unique_lcategories: {
                            terms: {
                                field: "lcategory",
                                size: 10000
                            }
                        }
                    }
                };
            }

            const response = await axios.post(url, params);
            const buckets = response.data.aggregations.unique_lcategories.buckets;
            const uniqueLcategories = buckets.map(bucket => bucket.key);
            set({ lcategories: uniqueLcategories });
        } catch (error) {
            console.error('Error fetching lcategories', error);
        }
    },
    fetchScategories: async (productType, selectedLcategory) => {
        try {
            let url = '';
            let params = {};

            if (productType === '가공식품') {
                url = 'https://elastic.icebuckwheat.kro.kr/recipe/_search';
                params = { q: `lcategory:"${selectedLcategory}"`, size: 1000 };
            } else if (productType === '원자재성 식품') {
                url = 'https://elastic.icebuckwheat.kro.kr/food/_search';
                params = { q: `lcategory:"${selectedLcategory}"`, size: 4000 };
            }

            const response = await axios.get(url, { params });
            const hits = response.data.hits.hits;
            const uniqueScategories = [...new Set(hits.map(hit => hit._source.scategory))];
            set({ scategories: uniqueScategories });
        } catch (error) {
            console.error('Error fetching scategories', error);
        }
    }
}));

export default useProductStore;
