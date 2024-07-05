<template>
	<topNav />
	<router-view />
</template>

<script>
import topNav from "@/components/topNav.vue";
export default {
	components: {
        topNav
    },
};
</script>
