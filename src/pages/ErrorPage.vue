<script>
import BannerComponent from '@/components/BannerComponent.vue';

export default {
    components: {
        BannerComponent,
    },
    data() {
        return {
            bannerProps: {
                title: "404 - Page Not Found",
                logo: "/favicon/android-chrome-512x512.png",
                tagline: "The page you are looking for doesn’t exist or has been moved.",
                destination: { name: "Home" },
                buttonLabel: "Back to Home"
            }
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
                Tip: Stay on track — go back and continue your workout 💪
            </div>

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
            #0f172a,
            #0b0b0b 60%,
            #1f2937 120%);

    color: #e2e8f0;
    overflow: hidden;
}

.glow-bg {
    position: absolute;
    width: 500px;
    height: 500px;
    background: rgba(56, 189, 248, 0.15);
    filter: blur(120px);
    top: -100px;
    left: -100px;
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
    opacity: 0.9;
}

:deep(button) {
    border-radius: 999px;
}

:deep(img) {
    filter: drop-shadow(0 0 10px rgba(56, 189, 248, 0.3));
}
</style>