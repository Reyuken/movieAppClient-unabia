<script>
import BannerComponent from '@/components/BannerComponent.vue';

export default {
    components: {
        BannerComponent,
    },
    data() {
        return {
            bannerProps: {
                title: "404 - Scene Not Found",
                logo: "/favicon/android-chrome-512x512.png",
                tagline: "This scene was cut, moved, or never existed in this timeline.",
                destination: { name: "Home" },
                buttonLabel: "Return Home"
            }
        }
    },
    methods: {
        goBack() {
            window.history.length > 1
                ? this.$router.go(-1)
                : this.$router.push({ name: "Home" });
        }
    }
}
</script>

<template>
    <div class="error-wrapper">

        <div class="glow-bg"></div>

        <div class="content">

            <BannerComponent :bannerProps="bannerProps" />

            <div class="hint">
                Looks like you’ve hit a broken reel 🎬
            </div>

            <button class="back-btn" @click="goBack">
                ← Go Back
            </button>

        </div>

    </div>
</template>

<style scoped>
.error-wrapper {
    min-height: 100vh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    background: radial-gradient(circle at top,
            #0b0b0f,
            #111827 60%,
            #1f2937 140%);

    color: #e2e8f0;
    overflow: hidden;
}

.glow-bg {
    position: absolute;
    width: 500px;
    height: 500px;
    background: rgba(96, 165, 250, 0.15);
    filter: blur(120px);
    top: -120px;
    left: -120px;
    border-radius: 50%;
    animation: float 6s ease-in-out infinite;
}

@keyframes float {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(30px);
    }
}

.content {
    position: relative;
    z-index: 2;
    text-align: center;
    max-width: 700px;
    padding: 2rem;
}

.hint {
    margin-top: 1.5rem;
    font-size: 0.95rem;
    color: #94a3b8;
}

.back-btn {
    margin-top: 1.5rem;
    padding: 0.6rem 1.2rem;
    border-radius: 999px;
    border: none;
    background: #3b82f6;
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s ease;
}

.back-btn:hover {
    background: #2563eb;
    transform: translateY(-1px);
}

:deep(button) {
    border-radius: 999px;
}

:deep(img) {
    filter: drop-shadow(0 0 10px rgba(96, 165, 250, 0.3));
}
</style>