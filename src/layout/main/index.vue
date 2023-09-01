<template>
	<router-view v-slot="{ Component }">
		<transition name="fade">
			<component :is="Component" v-if="flag" />
		</transition>
	</router-view>
</template>

<script setup lang="ts">
	import useLayoutSettingStore from '@/store/modules/setting';
	import { nextTick, ref, watch } from 'vue';
	// 控制当前组件是否销毁重建
	let flag = ref(true);
	let layoutSettingStore = useLayoutSettingStore();
	watch(
		() => layoutSettingStore.refresh,
		() => {
			flag.value = false;
			nextTick(() => {
				flag.value = true;
			});
		}
	);
</script>
<script lang="ts">
	export default {
		name: 'Main',
	};
</script>
<style scoped>
	.fade-enter-from {
		opacity: 0;
	}
	.fade-enter-active {
		transition: all 1s;
	}
	.fade-enter-to {
		opacity: 1;
	}
</style>
