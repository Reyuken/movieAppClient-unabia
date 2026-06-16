<script>
import { reactive, onBeforeMount, ref, watch } from 'vue';
import api from '../api.js';
import UpdateProduct from '../components/UpdateProduct.vue';
import AddNewProduct from '@/components/AddNewProduct.vue';

export default {
    components: {
        UpdateProduct,
        AddNewProduct
    },
    setup() {
        const selectedProduct = ref(null);
        const showForm = ref(false);
        const showAddProductForm = ref(false);
        const products = reactive({ data: [] });
        onBeforeMount(async () => {
            let { data } = await api.get('/products/all');
            products.data = data;
        })

        function editProduct(product) {
            selectedProduct.value = product
            showForm.value = true
            console.log(selectedProduct.value._id)
        }
        function openAddProductForm() {
            showAddProductForm.value = true;
        }
        async function updateProduct(updatedData) {
            const id = selectedProduct.value._id;

            await api.patch(`/products/${id}/update`, updatedData);

            const index = products.data.findIndex(p => p._id === id);

            if (index !== -1) {
                products.data[index] = {
                    ...products.data[index],
                    ...updatedData
                };
            }

            showForm.value = false;
        }
        async function createProduct(newData) {
            const { data } = await api.post('/products/', newData);

            products.data.unshift(data);

            showAddProductForm.value = false;
        }
        async function disableProduct(product) {
            const id = product._id;
            const index = products.data.findIndex(p => p._id === id);

            if (index === -1) return;

            const oldValue = products.data[index].isActive;

            products.data[index].isActive = false;

            try {
                await api.patch(`/products/${id}/archive`);
            } catch (err) {

                products.data[index].isActive = oldValue;
                console.error(err);
            }
        }
        async function enableProduct(product) {
            const id = product._id;
            const index = products.data.findIndex(p => p._id === id);

            if (index === -1) return;

            const oldValue = products.data[index].isActive;

            products.data[index].isActive = true;

            try {
                await api.patch(`/products/${id}/activate`);
            } catch (err) {

                products.data[index].isActive = oldValue;
                console.error(err);
            }
        }

        return {
            selectedProduct,
            showForm,
            showAddProductForm,
            products,
            editProduct,
            updateProduct,
            disableProduct,
            activateProduct: enableProduct,
            openAddProductForm,
            createProduct
        }
    }
}
</script>

<template>
<div class="admin-page">

    <h1 class="title">Admin Dashboard</h1>

    <div class="top-bar">
        <button @click="openAddProductForm" class="btn-main">
            + Add New Product
        </button>

        <button class="btn-secondary">
            Show User Orders
        </button>
    </div>

    <div class="admin-grid">

        <div class="labels">
            <span>ID</span>
            <span>Name</span>
            <span>Description</span>
            <span>Price</span>
            <span>Status</span>
            <span>Actions</span>
        </div>

        <div class="row-item" v-for="product in products.data" :key="product._id">

            <div class="cell id">{{ product._id }}</div>

            <div class="cell name">{{ product.name }}</div>

            <div class="cell desc">{{ product.description }}</div>

            <div class="cell price">₱{{ product.price }}</div>

            <div class="cell status">
                <span v-if="product.isActive" class="active">Available</span>
                <span v-else class="inactive">Unavailable</span>
            </div>

            <div class="cell actions">

                <button class="btn-edit" @click="editProduct(product)">
                    Edit
                </button>

                <button
                    v-if="product.isActive"
                    class="btn-disable"
                    @click="disableProduct(product)"
                >
                    Disable
                </button>

                <button
                    v-else
                    class="btn-enable"
                    @click="activateProduct(product)"
                >
                    Activate
                </button>

            </div>

        </div>

    </div>

</div>

<AddNewProduct
    v-if="showAddProductForm"
    @create="createProduct"
    @close="showAddProductForm = false"
/>

<UpdateProduct
    v-if="showForm"
    :product="selectedProduct"
    @update="updateProduct"
    @close="showForm = false"
/>
</template>

<style scoped>
.admin-page {
    min-height: 100vh;
    padding: 3rem 1rem;
    background: radial-gradient(circle at top, #0f172a, #1e293b, #0ea5e9 140%);
    color: #e2e8f0;
}

.title {
    text-align: center;
    font-size: 2.2rem;
    font-weight: 700;
    margin-bottom: 2rem;
    color: #38bdf8;
    letter-spacing: 1px;
}

.top-bar {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
}

.btn-main,
.btn-secondary {
    padding: 0.6rem 1.2rem;
    border-radius: 999px;
    border: none;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s;
}

.btn-main {
    background: rgba(56, 189, 248, 0.25);
    color: white;
}

.btn-main:hover {
    transform: translateY(-2px);
    background: rgba(56, 189, 248, 0.35);
}

.btn-secondary {
    background: rgba(148, 163, 184, 0.2);
    color: white;
}

.btn-secondary:hover {
    transform: translateY(-2px);
}

.admin-grid {
    max-width: 1200px;
    margin: auto;
    background: rgba(15, 23, 42, 0.7);
    border: 1px solid rgba(56, 189, 248, 0.15);
    border-radius: 16px;
    padding: 1rem;
    backdrop-filter: blur(12px);
}

.labels,
.row-item {
    display: grid;
    grid-template-columns: 1.2fr 2fr 3fr 1fr 1fr 2fr;
    gap: 0.8rem;
    align-items: center;
    padding: 0.8rem;
}

.labels {
    color: #38bdf8;
    font-weight: 700;
    border-bottom: 1px solid rgba(255,255,255,0.1);
}

.row-item {
    border-bottom: 1px solid rgba(255,255,255,0.06);
    transition: 0.2s ease;
}

.row-item:hover {
    background: rgba(56, 189, 248, 0.08);
}

.cell {
    font-size: 0.9rem;
}

.id {
    font-size: 0.75rem;
    color: #64748b;
    word-break: break-all;
}

.name {
    color: #e2e8f0;
    font-weight: 600;
}

.desc {
    color: #94a3b8;
    font-size: 0.85rem;
}

.price {
    color: #fbbf24;
    font-weight: 700;
}

.status .active {
    color: #22c55e;
    font-weight: 600;
}

.status .inactive {
    color: #ef4444;
    font-weight: 600;
}

.actions {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
}

.btn-edit,
.btn-disable,
.btn-enable {
    padding: 0.4rem 0.7rem;
    border-radius: 8px;
    border: none;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s;
}

.btn-edit {
    background: rgba(59, 130, 246, 0.25);
    color: white;
}

.btn-disable {
    background: rgba(239, 68, 68, 0.2);
    color: #ef4444;
}

.btn-enable {
    background: rgba(34, 197, 94, 0.2);
    color: #22c55e;
}

.btn-edit:hover,
.btn-disable:hover,
.btn-enable:hover {
    transform: translateY(-2px);
}

@media (max-width: 768px) {
    .labels,
    .row-item {
        grid-template-columns: 1fr;
        text-align: left;
    }

    .actions {
        justify-content: flex-start;
    }
}
</style>